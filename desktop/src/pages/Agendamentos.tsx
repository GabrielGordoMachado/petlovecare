import { useEffect, useState } from 'react'
import { agendamentosService } from '../services/api'
import { useAdmin } from '../admin'

// Estrutura retornada por GET /agendamentos (com os relacionamentos incluidos)
interface AgendamentoItem {
  id: number
  data_hora: string
  status: string
  observacao?: string
  cliente?: { nome: string; cpf: string }
  pet?: { nomePet: string; especie: string }
  agendamentoServico?: { servico: { nome: string; preco: string } }[]
}

const STATUS_LABEL: Record<string, string> = {
  agendado: 'Agendado',
  em_andamento: 'Em andamento',
  finalizado: 'Finalizado',
  cancelado: 'Cancelado',
}

export default function Agendamentos() {
  const { cpf } = useAdmin()
  const [itens, setItens] = useState<AgendamentoItem[]>([])
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(true)

  async function carregar() {
    setCarregando(true)
    try {
      const { data } = await agendamentosService.listar()
      setItens(data)
      setErro('')
    } catch {
      setErro('Não foi possível carregar os agendamentos.')
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  async function mudarStatus(id: number, status: string) {
    if (!cpf) {
      alert('Informe o CPF do admin no topo antes de aprovar/recusar.')
      return
    }
    try {
      await agendamentosService.atualizarStatus(id, status, cpf)
      await carregar()
    } catch {
      alert('Erro ao atualizar o status.')
    }
  }

  if (carregando) return <p>Carregando…</p>
  if (erro) return <p className="erro">{erro}</p>

  return (
    <section>
      <h1>Agendamentos</h1>
      {itens.length === 0 && <p>Nenhum agendamento.</p>}
      <table className="tabela">
        <thead>
          <tr>
            <th>Data/Hora</th>
            <th>Cliente</th>
            <th>Pet</th>
            <th>Serviços</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((a) => (
            <tr key={a.id}>
              <td>{new Date(a.data_hora).toLocaleString('pt-BR')}</td>
              <td>{a.cliente?.nome ?? '—'}</td>
              <td>{a.pet?.nomePet ?? '—'}</td>
              <td>{a.agendamentoServico?.map((s) => s.servico.nome).join(', ') || '—'}</td>
              <td>
                <span className={`badge badge-${a.status}`}>
                  {STATUS_LABEL[a.status] ?? a.status}
                </span>
              </td>
              <td className="acoes">
                <button onClick={() => mudarStatus(a.id, 'em_andamento')}>Aprovar</button>
                <button onClick={() => mudarStatus(a.id, 'finalizado')}>Finalizar</button>
                <button className="perigo" onClick={() => mudarStatus(a.id, 'cancelado')}>
                  Recusar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
