import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { petsService } from '../services/api';
import { useAuth } from '../auth';
import { useUI } from '../ui';

const ESPECIES = ['Cachorro', 'Gato', 'Outro'];

/*
 * Formulário de pet (mockup PopUp4) — serve para cadastrar e editar.
 * Em /pets/novo cria; em /pets/:id/editar carrega o pet e atualiza.
 * Vincula ao cliente logado (cliente_cpf) e volta para "Meus pets".
 */
export default function CadastrarPet() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { cliente } = useAuth();
  const { toast } = useUI();
  const editando = Boolean(id);

  const [form, setForm] = useState({
    nomePet: '',
    especie: '',
    raca: '',
    idade: '',
    observacoes: '',
  });
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  // No modo edição, carrega os dados do pet.
  useEffect(() => {
    if (!id) return;
    petsService
      .buscar(Number(id))
      .then(({ data }) =>
        setForm({
          nomePet: data.nomePet,
          especie: data.especie,
          raca: data.raca,
          idade: String(data.idade),
          observacoes: data.observacoes ?? '',
        }),
      )
      .catch(() => setErro('Não foi possível carregar o pet.'));
  }, [id]);

  function alterar(campo: keyof typeof form, valor: string) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  async function aoEnviar(e: FormEvent) {
    e.preventDefault();
    if (!cliente) return;

    if (!form.nomePet.trim()) return setErro('Informe o nome do pet.');
    if (!form.especie) return setErro('Escolha a espécie.');
    if (!form.raca.trim()) return setErro('Informe a raça.');
    const idade = Number(form.idade);
    if (!Number.isInteger(idade) || idade < 0) return setErro('Idade inválida.');

    setErro('');
    setSalvando(true);
    try {
      if (editando) {
        await petsService.atualizar(Number(id), {
          nomePet: form.nomePet.trim(),
          especie: form.especie,
          raca: form.raca.trim(),
          idade,
          observacoes: form.observacoes.trim() || undefined,
        });
        toast.sucesso('Pet atualizado.');
      } else {
        await petsService.criar({
          cliente_cpf: cliente.cpf,
          nomePet: form.nomePet.trim(),
          especie: form.especie,
          raca: form.raca.trim(),
          idade,
          observacoes: form.observacoes.trim() || undefined,
        });
        toast.sucesso('Pet cadastrado.');
      }
      navigate('/pets', { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        const m = err.response.data.message;
        setErro(Array.isArray(m) ? m[0] : String(m));
      } else {
        setErro('Não foi possível salvar o pet.');
      }
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="popup">
      <form className="popup-card largo" onSubmit={aoEnviar}>
        <h1 className="popup-titulo">{editando ? 'Editar pet' : 'Cadastre seu pet'}</h1>

        <label className="campo">
          <span>Nome do pet</span>
          <input
            className="input"
            value={form.nomePet}
            onChange={(e) => alterar('nomePet', e.target.value)}
            autoFocus
          />
        </label>

        <label className="campo">
          <span>Espécie</span>
          <select
            className="input"
            value={form.especie}
            onChange={(e) => alterar('especie', e.target.value)}
          >
            <option value="">Escolha a espécie</option>
            {ESPECIES.map((esp) => (
              <option key={esp} value={esp}>
                {esp}
              </option>
            ))}
          </select>
        </label>

        <label className="campo">
          <span>Raça</span>
          <input
            className="input"
            value={form.raca}
            onChange={(e) => alterar('raca', e.target.value)}
            placeholder="Ex.: Labrador, SRD…"
          />
        </label>

        <label className="campo">
          <span>Idade (anos)</span>
          <input
            className="input"
            type="number"
            min="0"
            value={form.idade}
            onChange={(e) => alterar('idade', e.target.value)}
          />
        </label>

        <label className="campo">
          <span>Observações</span>
          <textarea
            className="input"
            value={form.observacoes}
            onChange={(e) => alterar('observacoes', e.target.value)}
            placeholder="Ex.: porte, temperamento, cuidados especiais…"
          />
        </label>

        {erro && <p className="popup-erro">{erro}</p>}

        <button className="btn-coral" type="submit" disabled={salvando}>
          {salvando ? 'Salvando…' : editando ? 'Salvar alterações' : 'Cadastrar Pet'}
        </button>

        <button type="button" className="link-suave" onClick={() => navigate('/pets')}>
          ← Voltar
        </button>
      </form>
    </div>
  );
}
