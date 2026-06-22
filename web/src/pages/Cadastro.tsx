import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { useAuth } from '../auth';
import { useUI } from '../ui';
import { clientesService } from '../services/api';
import { apenasDigitos, formatarCpf, validarCpf } from '../utils/cpf';
import { validarEmail } from '../utils/email';

/*
 * Cadastro de cliente (mockup PopUp2). Cria o cliente na API (POST /clientes)
 * e já deixa o tutor logado, seguindo para a área dele.
 */
export default function Cadastro() {
  const navigate = useNavigate();
  const location = useLocation();
  const { registrarSessao } = useAuth();
  const { toast } = useUI();

  // Quando o cadastro abre como popup sobre uma página, guarda o fundo para
  // repassá-lo ao voltar para o login (senão o login abriria em tela cheia).
  const fundo = (location.state as { backgroundLocation?: unknown } | null)
    ?.backgroundLocation;

  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    senha: '',
  });
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  function alterar(campo: keyof typeof form, valor: string) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  function validar(): string | null {
    if (!form.nome.trim()) return 'Informe o nome.';
    if (!validarCpf(form.cpf)) return 'CPF inválido.';
    if (!validarEmail(form.email)) return 'E-mail inválido.';
    if (form.telefone.trim().length < 8) return 'Informe um telefone válido.';
    if (form.senha.length < 6) return 'A senha deve ter ao menos 6 caracteres.';
    return null;
  }

  async function aoEnviar(e: FormEvent) {
    e.preventDefault();
    const problema = validar();
    if (problema) {
      setErro(problema);
      return;
    }
    setErro('');
    setSalvando(true);
    try {
      const { data } = await clientesService.cadastrar({
        cpf: apenasDigitos(form.cpf),
        nome: form.nome.trim(),
        telefone: form.telefone.trim(),
        email: form.email.trim(),
        senha: form.senha,
      });
      // Loga direto após o cadastro.
      registrarSessao({
        cpf: data.cpf,
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
      });
      toast.sucesso(`Bem-vindo(a), ${data.nome.split(' ')[0]}!`);
      navigate('/pets', { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setErro('CPF ou e-mail já cadastrado.');
      } else if (axios.isAxiosError(err) && err.response?.data?.message) {
        const m = err.response.data.message;
        setErro(Array.isArray(m) ? m[0] : String(m));
      } else {
        setErro('Não foi possível cadastrar. Verifique a conexão com a API.');
      }
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="popup">
      <form className="popup-card largo" onSubmit={aoEnviar}>
        <h1 className="popup-titulo">Cadastre-se</h1>

        <label className="campo">
          <span>Nome</span>
          <input
            className="input"
            value={form.nome}
            onChange={(e) => alterar('nome', e.target.value)}
            placeholder="Seu nome completo"
            autoFocus
          />
        </label>

        <label className="campo">
          <span>CPF</span>
          <input
            className="input"
            value={form.cpf}
            onChange={(e) => alterar('cpf', formatarCpf(e.target.value))}
            placeholder="000.000.000-00"
            inputMode="numeric"
          />
        </label>

        <label className="campo">
          <span>E-mail</span>
          <input
            className="input"
            type="email"
            value={form.email}
            onChange={(e) => alterar('email', e.target.value)}
            placeholder="voce@email.com"
          />
        </label>

        <label className="campo">
          <span>Telefone</span>
          <input
            className="input"
            value={form.telefone}
            onChange={(e) => alterar('telefone', e.target.value)}
            placeholder="(67) 99999-0000"
          />
        </label>

        <label className="campo">
          <span>Senha</span>
          <input
            className="input"
            type="password"
            value={form.senha}
            onChange={(e) => alterar('senha', e.target.value)}
            placeholder="Mínimo de 6 caracteres"
          />
        </label>

        {erro && <p className="popup-erro">{erro}</p>}

        <button className="btn-coral" type="submit" disabled={salvando}>
          {salvando ? 'Salvando…' : 'Confirmar'}
        </button>

        <Link
          to="/login"
          state={fundo ? { backgroundLocation: fundo } : undefined}
          className="link-suave"
          style={{ textAlign: 'center' }}
        >
          Já tem conta? Entrar
        </Link>
      </form>
    </div>
  );
}
