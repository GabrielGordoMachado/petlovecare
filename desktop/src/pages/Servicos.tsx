import { useEffect, useState } from 'react'
import { servicosService } from '../services/api'
import { useAuth } from '../auth'
import { Servico } from '../types'

export default function Servicos() {
  const { admin } = useAuth()
  const cpf = admin?.cpf ?? ''
  const [itens, setItens] = useState<Servico[]>([])
  const [erro, setErro] = useState('')
  const [form, setForm] = useState({ nome: '', descricao: '', preco: '', duracao: '' })

  async function carregar() {
    try {
      const { data } = await servicosService.listar()
      setItens(data)
      setErro('')
    } catch {
      setErro('Não foi possível carregar os serviços.')
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  async function criar(e: React.FormEvent) {
    e.preventDefault()
    if (!cpf) {
      alert('Informe o CPF do admin no topo antes de cadastrar um serviço.')
      return
    }
    try {
      await servicosService.criar({
        admin_cpf: cpf,
        nome: form.nome,
        descricao: form.descricao || undefined,
        preco: Number(form.preco),
        duracao: Number(form.duracao),
      })
      setForm({ nome: '', descricao: '', preco: '', duracao: '' })
      await carregar()
    } catch {
      alert('Erro ao cadastrar o serviço. Verifique os campos.')
    }
  }

  async function excluir(id: number) {
    if (!confirm('Excluir este serviço?')) return
    try {
      await servicosService.excluir(id)
      await carregar()
    } catch (e: any) {
      // Mostra a mensagem real da API (ex.: serviço vinculado a agendamentos).
      alert(e?.response?.data?.message ?? 'Erro ao excluir.')
    }
  }

  return (
    <section>
      <h1>Serviços</h1>

      <form className="form-linha" onSubmit={criar}>
        <input
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          required
        />
        <input
          placeholder="Descrição"
          value={form.descricao}
          onChange={(e) => setForm({ ...form, descricao: e.target.value })}
        />
        <input
          placeholder="Preço"
          type="number"
          step="0.01"
          value={form.preco}
          onChange={(e) => setForm({ ...form, preco: e.target.value })}
          required
        />
        <input
          placeholder="Duração (min)"
          type="number"
          value={form.duracao}
          onChange={(e) => setForm({ ...form, duracao: e.target.value })}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      {erro && <p className="erro">{erro}</p>}

      <table className="tabela">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Duração</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((s) => (
            <tr key={s.id}>
              <td>{s.nome}</td>
              <td>{s.descricao ?? '—'}</td>
              <td>R$ {Number(s.preco).toFixed(2)}</td>
              <td>{s.duracao} min</td>
              <td className="acoes">
                <button className="perigo" onClick={() => excluir(s.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
