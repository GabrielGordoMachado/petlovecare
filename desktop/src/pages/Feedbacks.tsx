import { useEffect, useState } from 'react'
import { feedbackService } from '../services/api'
import { useAdmin } from '../admin'

interface FeedbackItem {
  id: number
  nota: number
  comentario: string
  resposta?: string
  data: string
  cliente?: { nome: string }
}

export default function Feedbacks() {
  const { cpf } = useAdmin()
  const [itens, setItens] = useState<FeedbackItem[]>([])
  const [erro, setErro] = useState('')
  const [respostas, setRespostas] = useState<Record<number, string>>({})

  async function carregar() {
    try {
      const { data } = await feedbackService.listar()
      setItens(data)
      setErro('')
    } catch {
      setErro('Não foi possível carregar os feedbacks.')
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  async function responder(id: number) {
    if (!cpf) {
      alert('Informe o CPF do admin no topo antes de responder.')
      return
    }
    const texto = respostas[id]?.trim()
    if (!texto) return
    try {
      await feedbackService.responder(id, cpf, texto)
      setRespostas({ ...respostas, [id]: '' })
      await carregar()
    } catch {
      alert('Erro ao responder o feedback.')
    }
  }

  return (
    <section>
      <h1>Feedbacks</h1>
      {erro && <p className="erro">{erro}</p>}
      {itens.length === 0 && !erro && <p>Nenhum feedback.</p>}

      <div className="cards">
        {itens.map((f) => (
          <article key={f.id} className="card">
            <header>
              <strong>{f.cliente?.nome ?? 'Cliente'}</strong>
              <span className="nota">{'★'.repeat(f.nota)}{'☆'.repeat(5 - f.nota)}</span>
            </header>
            <p>{f.comentario}</p>

            {f.resposta ? (
              <p className="resposta"><strong>Resposta:</strong> {f.resposta}</p>
            ) : (
              <div className="responder">
                <textarea
                  placeholder="Escreva uma resposta…"
                  value={respostas[f.id] ?? ''}
                  onChange={(e) => setRespostas({ ...respostas, [f.id]: e.target.value })}
                />
                <button onClick={() => responder(f.id)}>Responder</button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
