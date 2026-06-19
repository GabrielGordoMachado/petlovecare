import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { agendamentosService, feedbackService } from '../services/api';
import { useAuth } from '../auth';
import { useUI } from '../ui';
import { formatarData } from '../utils/data';
import type { Agendamento, Feedback } from '../types';

const STATUS_LABEL: Record<string, string> = {
  agendado: 'Agendado',
  em_andamento: 'Em andamento',
  finalizado: 'Finalizado',
  cancelado: 'Cancelado',
};

/*
 * Lista os agendamentos do tutor (RF de acompanhamento).
 * - Agendamentos "agendado" podem ser cancelados (RF07).
 * - Agendamentos "finalizado" sem avaliação ganham um formulário de feedback (RF12).
 */
export default function MeusAgendamentos() {
  const { cliente } = useAuth();
  const { toast, confirmar } = useUI();
  const [itens, setItens] = useState<Agendamento[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregar = useCallback(async () => {
    if (!cliente) return;
    setCarregando(true);
    try {
      const [ag, fb] = await Promise.all([
        agendamentosService.doCliente(cliente.cpf),
        feedbackService.listar(),
      ]);
      setItens(ag.data);
      setFeedbacks(fb.data.filter((f) => f.cliente_cpf === cliente.cpf));
      setErro('');
    } catch {
      setErro('Não foi possível carregar seus agendamentos.');
    } finally {
      setCarregando(false);
    }
  }, [cliente]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  async function cancelar(id: number) {
    const ok = await confirmar('Deseja cancelar este agendamento?');
    if (!ok) return;
    try {
      await agendamentosService.cancelar(id);
      toast.sucesso('Agendamento cancelado.');
      await carregar();
    } catch {
      toast.erro('Não foi possível cancelar.');
    }
  }

  function feedbackDe(agendamentoId: number) {
    return feedbacks.find((f) => f.agendamento_id === agendamentoId);
  }

  if (carregando) return <div className="container"><p className="carregando">Carregando…</p></div>;

  return (
    <div className="container">
      <h1 className="pagina-titulo">Meus agendamentos</h1>
      <p className="pagina-sub">Acompanhe, cancele e avalie seus atendimentos.</p>

      <div className="barra-acoes">
        <span className="card-meta">{itens.length} no total</span>
        <Link to="/agendar" className="btn-primario">+ Novo agendamento</Link>
      </div>

      {erro && <p className="erro">{erro}</p>}

      {itens.length === 0 && !erro ? (
        <p className="vazio">Você ainda não tem agendamentos. Que tal agendar agora?</p>
      ) : (
        <div className="cards">
          {itens.map((a) => {
            const servicos =
              a.agendamentoServico?.map((s) => s.servico.nome).join(', ') || '—';
            const fb = feedbackDe(a.id);
            return (
              <article key={a.id} className="card">
                <div className="barra-acoes" style={{ marginBottom: 0 }}>
                  <h3>{a.pet?.nomePet ?? 'Pet'}</h3>
                  <span className={`badge status-${a.status}`}>
                    {STATUS_LABEL[a.status] ?? a.status}
                  </span>
                </div>
                <span className="card-meta">{servicos}</span>
                <span className="card-meta">{formatarData(a.data_hora)}</span>

                {a.status === 'agendado' && (
                  <div className="card-rodape">
                    <button className="btn-perigo" onClick={() => cancelar(a.id)}>
                      Cancelar
                    </button>
                  </div>
                )}

                {a.status === 'finalizado' &&
                  (fb ? (
                    <div className="card-meta">
                      <span className="estrelas">
                        {'★'.repeat(fb.nota)}
                        {'☆'.repeat(5 - fb.nota)}
                      </span>
                      <p>“{fb.comentario}”</p>
                      {fb.resposta && (
                        <p>
                          <strong>Resposta da loja:</strong> {fb.resposta}
                        </p>
                      )}
                    </div>
                  ) : (
                    <FormularioFeedback
                      agendamentoId={a.id}
                      clienteCpf={cliente!.cpf}
                      aoEnviar={carregar}
                    />
                  ))}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* Formulário de avaliação para um agendamento finalizado (RF12). */
function FormularioFeedback({
  agendamentoId,
  clienteCpf,
  aoEnviar,
}: {
  agendamentoId: number;
  clienteCpf: string;
  aoEnviar: () => Promise<void>;
}) {
  const { toast } = useUI();
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  async function enviar() {
    if (!comentario.trim()) {
      setErro('Escreva um comentário.');
      return;
    }
    setErro('');
    setEnviando(true);
    try {
      await feedbackService.criar({
        agendamento_id: agendamentoId,
        cliente_cpf: clienteCpf,
        nota,
        comentario: comentario.trim(),
      });
      toast.sucesso('Avaliação enviada. Obrigado!');
      await aoEnviar();
    } catch {
      setErro('Não foi possível enviar a avaliação.');
      setEnviando(false);
    }
  }

  return (
    <div className="card-meta" style={{ display: 'grid', gap: '0.5rem' }}>
      <strong>Avalie este atendimento</strong>
      <span className="estrelas">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setNota(n)}
            aria-label={`${n} estrelas`}
          >
            {n <= nota ? '★' : '☆'}
          </button>
        ))}
      </span>
      <textarea
        className="input"
        style={{ color: 'var(--cor-texto)' }}
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Como foi o atendimento?"
      />
      {erro && <span className="erro">{erro}</span>}
      <button className="btn-primario" onClick={enviar} disabled={enviando}>
        {enviando ? 'Enviando…' : 'Enviar avaliação'}
      </button>
    </div>
  );
}
