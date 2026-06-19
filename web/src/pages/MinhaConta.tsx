import { useState, type FormEvent } from 'react';
import axios from 'axios';

import { useAuth } from '../auth';
import { useUI } from '../ui';
import { clientesService } from '../services/api';
import { formatarCpf } from '../utils/cpf';
import { validarEmail } from '../utils/email';

/*
 * Perfil do tutor (ver/editar). O CPF é a chave (não muda).
 * A senha só é enviada se o usuário digitar uma nova.
 */
export default function MinhaConta() {
  const { cliente, registrarSessao, sair } = useAuth();
  const { toast } = useUI();

  const [form, setForm] = useState({
    nome: cliente?.nome ?? '',
    email: cliente?.email ?? '',
    telefone: cliente?.telefone ?? '',
    senha: '',
  });
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  if (!cliente) return null;

  function alterar(campo: keyof typeof form, valor: string) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  async function aoEnviar(e: FormEvent) {
    e.preventDefault();
    if (!cliente) return;

    if (!form.nome.trim()) return setErro('Informe o nome.');
    if (!validarEmail(form.email)) return setErro('E-mail inválido.');
    if (form.telefone.trim().length < 8) return setErro('Telefone inválido.');
    if (form.senha && form.senha.length < 6)
      return setErro('A nova senha deve ter ao menos 6 caracteres.');

    setErro('');
    setSalvando(true);
    try {
      const { data } = await clientesService.atualizar(cliente.cpf, {
        nome: form.nome.trim(),
        email: form.email.trim(),
        telefone: form.telefone.trim(),
        ...(form.senha ? { senha: form.senha } : {}),
      });
      registrarSessao({
        cpf: data.cpf,
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
      });
      setForm((f) => ({ ...f, senha: '' }));
      toast.sucesso('Dados atualizados.');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        const m = err.response.data.message;
        setErro(Array.isArray(m) ? m[0] : String(m));
      } else {
        setErro('Não foi possível salvar as alterações.');
      }
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 560 }}>
      <h1 className="pagina-titulo">Minha conta</h1>
      <p className="pagina-sub">Seus dados de cadastro.</p>

      <form className="card" onSubmit={aoEnviar} style={{ gap: 'var(--esp-4)' }}>
        <label className="campo">
          <span style={{ color: 'var(--cor-texto-suave)' }}>CPF</span>
          <input className="input" value={formatarCpf(cliente.cpf)} disabled />
        </label>

        <label className="campo">
          <span style={{ color: 'var(--cor-texto-suave)' }}>Nome</span>
          <input
            className="input"
            value={form.nome}
            onChange={(e) => alterar('nome', e.target.value)}
          />
        </label>

        <label className="campo">
          <span style={{ color: 'var(--cor-texto-suave)' }}>E-mail</span>
          <input
            className="input"
            type="email"
            value={form.email}
            onChange={(e) => alterar('email', e.target.value)}
          />
        </label>

        <label className="campo">
          <span style={{ color: 'var(--cor-texto-suave)' }}>Telefone</span>
          <input
            className="input"
            value={form.telefone}
            onChange={(e) => alterar('telefone', e.target.value)}
          />
        </label>

        <label className="campo">
          <span style={{ color: 'var(--cor-texto-suave)' }}>Nova senha (opcional)</span>
          <input
            className="input"
            type="password"
            value={form.senha}
            onChange={(e) => alterar('senha', e.target.value)}
            placeholder="Deixe em branco para manter a atual"
          />
        </label>

        {erro && <p className="erro">{erro}</p>}

        <div className="barra-acoes" style={{ marginBottom: 0 }}>
          <button type="button" className="btn-secundario" onClick={sair}>
            Sair da conta
          </button>
          <button className="btn-primario" type="submit" disabled={salvando}>
            {salvando ? 'Salvando…' : 'Salvar alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}
