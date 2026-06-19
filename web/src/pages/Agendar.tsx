import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { agendamentosService, petsService, servicosService } from '../services/api';
import { useAuth } from '../auth';
import { useUI } from '../ui';
import type { Pet, Servico } from '../types';

// Horários de funcionamento. A API ainda valida a RN03 (nada a menos de 1h do
// fechamento, às 18h); por isso o último horário oferecido é 17:00.
const HORARIOS = [
  '08:00', '09:00', '10:00', '11:00', '13:00',
  '14:00', '15:00', '16:00', '17:00',
];

/*
 * Agendamento de serviço (mockup PopUp3): escolhe pet, serviço, data e horário.
 * Cria com POST /agendamentos; o status inicial é "agendado" (aguardando a loja).
 * As regras RN01/RN02/RN03 são validadas na API e os erros aparecem aqui.
 */
export default function Agendar() {
  const navigate = useNavigate();
  const { cliente } = useAuth();
  const { toast } = useUI();

  const [pets, setPets] = useState<Pet[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [form, setForm] = useState({ petId: '', servicoId: '', data: '', hora: '' });
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!cliente) return;
    petsService.doCliente(cliente.cpf).then(({ data }) => setPets(data)).catch(() => {});
    servicosService.listar().then(({ data }) => setServicos(data)).catch(() => {});
  }, [cliente]);

  function alterar(campo: keyof typeof form, valor: string) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  async function aoEnviar(e: FormEvent) {
    e.preventDefault();
    if (!cliente) return;

    if (!form.petId) return setErro('Escolha o pet.');
    if (!form.servicoId) return setErro('Escolha o serviço.');
    if (!form.data) return setErro('Escolha a data.');
    if (!form.hora) return setErro('Escolha um horário.');

    setErro('');
    setSalvando(true);
    try {
      await agendamentosService.criar({
        cliente_cpf: cliente.cpf,
        pet_id: Number(form.petId),
        servico_ids: [Number(form.servicoId)], // a API aceita até 2 (RN01)
        data_hora: `${form.data}T${form.hora}:00`,
      });
      toast.sucesso('Agendamento solicitado! Aguarde a confirmação da loja.');
      navigate('/agendamentos', { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        const m = err.response.data.message;
        setErro(Array.isArray(m) ? m[0] : String(m));
      } else {
        setErro('Não foi possível agendar. Tente novamente.');
      }
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="popup">
      <form className="popup-card largo" onSubmit={aoEnviar}>
        <h1 className="popup-titulo">Agende agora</h1>

        <label className="campo">
          <span>Pet</span>
          <select
            className="input"
            value={form.petId}
            onChange={(e) => alterar('petId', e.target.value)}
          >
            <option value="">Escolha o pet</option>
            {pets.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nomePet} ({p.especie})
              </option>
            ))}
          </select>
        </label>

        <label className="campo">
          <span>Serviço</span>
          <select
            className="input"
            value={form.servicoId}
            onChange={(e) => alterar('servicoId', e.target.value)}
          >
            <option value="">Escolha o serviço</option>
            {servicos.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nome} — R$ {Number(s.preco).toFixed(2)}
              </option>
            ))}
          </select>
        </label>

        <label className="campo">
          <span>Data</span>
          <input
            className="input"
            type="date"
            value={form.data}
            onChange={(e) => alterar('data', e.target.value)}
          />
        </label>

        <label className="campo">
          <span>Horário</span>
          <select
            className="input"
            value={form.hora}
            onChange={(e) => alterar('hora', e.target.value)}
          >
            <option value="">Escolha um horário</option>
            {HORARIOS.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </label>

        {erro && <p className="popup-erro">{erro}</p>}

        <button className="btn-coral" type="submit" disabled={salvando}>
          {salvando ? 'Agendando…' : 'Agendar'}
        </button>

        {pets.length === 0 && (
          <Link to="/pets/novo" className="link-suave" style={{ textAlign: 'center' }}>
            Não tem um pet cadastrado? Cadastre-o
          </Link>
        )}
      </form>
    </div>
  );
}
