/* PetLove Care — Admin desktop screens (Splash, Login, Agendamentos,
   Serviços, Feedbacks). Recreates the Electron admin app over the DS. */
const A = window.PetLoveCareDesignSystem_7829c3;
const { Logo, Sidebar, Button, Input, Badge, FeedbackCard, RatingStars } = A;
const ASSET = '../../assets/';

/* ── Splash ── */
function Splash() {
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px',
      background: 'radial-gradient(1200px 600px at 50% 30%, #24344d 0%, transparent 70%), linear-gradient(160deg, var(--navy) 0%, var(--navy-deep) 100%)',
    }}>
      <img src={ASSET + 'logo-lockup-white.png'} alt="PetLove Care" style={{ width: '38%', maxWidth: '300px', animation: 'splashIn 1s ease both' }} />
      <div style={{ width: '34px', height: '34px', borderRadius: '50%', border: '3px solid rgba(255,255,255,0.18)', borderTopColor: 'var(--coral)', animation: 'spin 0.8s linear infinite' }} />
    </div>
  );
}

/* ── Login ── */
function AdminLogin({ onEnter }) {
  return (
    <div style={{
      position: 'relative', height: '100%', display: 'grid', placeItems: 'center', overflow: 'hidden',
      background: 'linear-gradient(160deg, var(--navy) 0%, var(--navy-deep) 100%)',
    }}>
      <div aria-hidden style={{ position: 'absolute', width: '620px', height: '620px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,127,80,0.22), transparent 60%)', top: '-160px', right: '-120px', filter: 'blur(8px)' }} />
      <form onSubmit={(e) => { e.preventDefault(); onEnter(); }} style={{
        position: 'relative', zIndex: 1, width: '340px', display: 'flex', flexDirection: 'column', gap: '16px',
        padding: '38px 32px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(6px)', boxShadow: 'var(--shadow-lg)',
      }}>
        <div style={{ textAlign: 'center', fontSize: '34px' }}>🐾</div>
        <h1 style={{ margin: '0 0 4px', textAlign: 'center', color: 'var(--white)', fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '0.12em', fontSize: '27px' }}>LOGIN</h1>
        <Input label="CPF" theme="filled" placeholder="000.000.000-00" defaultValue="123.456.789-00" />
        <Input label="Senha" theme="filled" type="password" placeholder="Sua senha" defaultValue="admin" />
        <Button variant="primary" type="submit" fullWidth>Entrar</Button>
        <Button variant="link" style={{ alignSelf: 'center' }}>Esqueceu a senha?</Button>
      </form>
    </div>
  );
}

/* ── Page header inside the content area ── */
function PageHead({ title, children }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', marginBottom: '4px' }}>
      <h1 style={{ margin: 0, fontSize: '26px', fontFamily: 'var(--font-display)', color: 'var(--navy)' }}>{title}</h1>
      {children}
    </div>
  );
}

const TH = { textAlign: 'left', padding: '12px 16px', color: 'var(--muted)', fontWeight: 700, background: 'var(--surface)', textTransform: 'uppercase', letterSpacing: '0.03em', fontSize: '12px', borderBottom: '1px solid var(--line)' };
const TD = { padding: '13px 16px', borderBottom: '1px solid var(--line)', fontSize: '14px', color: 'var(--text)' };

/* ── Agendamentos ── */
const AG = [
  { id: 1, dh: '20/06/2026 09:00', cli: 'Ana Souza', pet: 'Mia', serv: 'Banho', st: 'agendado' },
  { id: 2, dh: '20/06/2026 11:00', cli: 'Carlos M.', pet: 'Thor', serv: 'Banho + Tosa', st: 'em_andamento' },
  { id: 3, dh: '19/06/2026 16:00', cli: 'Júlia R.', pet: 'Rex', serv: 'Tosa', st: 'finalizado' },
  { id: 4, dh: '18/06/2026 14:00', cli: 'Pedro L.', pet: 'Bob', serv: 'Banho', st: 'cancelado' },
];
function Agendamentos() {
  return (
    <section>
      <PageHead title="Agendamentos" />
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, marginTop: '18px', background: '#fff', borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
        <thead><tr>{['Data/Hora','Cliente','Pet','Serviços','Status','Ações'].map((h) => <th key={h} style={TH}>{h}</th>)}</tr></thead>
        <tbody>
          {AG.map((a) => (
            <tr key={a.id}>
              <td style={TD}>{a.dh}</td>
              <td style={TD}>{a.cli}</td>
              <td style={TD}>{a.pet}</td>
              <td style={TD}>{a.serv}</td>
              <td style={TD}><Badge status={a.st} /></td>
              <td style={{ ...TD, display: 'flex', gap: '8px' }}>
                <Button variant="secondary" size="sm">Aprovar</Button>
                <Button variant="secondary" size="sm">Finalizar</Button>
                <Button variant="danger" size="sm">Recusar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

/* ── Serviços ── */
const SV = [
  { id: 1, nome: 'Banho', desc: 'Banho completo com produtos adequados', preco: 'R$ 60,00', dur: '45 min' },
  { id: 2, nome: 'Tosa', desc: 'Tosa higiênica ou completa', preco: 'R$ 80,00', dur: '60 min' },
  { id: 3, nome: 'Banho + Tosa', desc: 'Pacote completo de higiene', preco: 'R$ 120,00', dur: '90 min' },
];
function Servicos() {
  return (
    <section>
      <PageHead title="Serviços" />
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end', margin: '18px 0 6px' }}>
        <Input placeholder="Nome" style={{ width: '160px' }} />
        <Input placeholder="Descrição" style={{ width: '240px' }} />
        <Input placeholder="Preço" type="number" style={{ width: '110px' }} />
        <Input placeholder="Duração (min)" type="number" style={{ width: '130px' }} />
        <Button variant="primary">Cadastrar</Button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, marginTop: '12px', background: '#fff', borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
        <thead><tr>{['Nome','Descrição','Preço','Duração','Ações'].map((h) => <th key={h} style={TH}>{h}</th>)}</tr></thead>
        <tbody>
          {SV.map((s) => (
            <tr key={s.id}>
              <td style={{ ...TD, fontWeight: 700, color: 'var(--navy)' }}>{s.nome}</td>
              <td style={TD}>{s.desc}</td>
              <td style={TD}>{s.preco}</td>
              <td style={TD}>{s.dur}</td>
              <td style={TD}><Button variant="danger" size="sm">Excluir</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

/* ── Feedbacks ── */
const FB = [
  { id: 1, name: 'Ana Souza', rating: 5, comment: 'Atendimento maravilhoso, a Mia saiu cheirosa e tranquila!', response: 'Obrigado, Ana! Volte sempre 🐾' },
  { id: 2, name: 'Carlos M.', rating: 4, comment: 'Muito bom o banho, só demorou um pouco para começar.' },
  { id: 3, name: 'Júlia R.', rating: 5, comment: 'Equipe super cuidadosa com o Rex. Recomendo demais.' },
];
function Feedbacks() {
  return (
    <section>
      <PageHead title="Feedbacks" />
      <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', marginTop: '18px' }}>
        {FB.map((f) => f.response
          ? <FeedbackCard key={f.id} name={f.name} rating={f.rating} comment={f.comment} response={f.response} />
          : (
            <article key={f.id} style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius)', padding: '18px', background: '#fff', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)' }}>{f.name}</strong>
                <RatingStars value={f.rating} size={16} />
              </header>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.5 }}>{f.comment}</p>
              <textarea placeholder="Escreva uma resposta…" rows={2} style={{ width: '100%', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: 'var(--radius-sm)', padding: '8px 10px', fontFamily: 'var(--font-body)', resize: 'vertical' }} />
              <Button variant="primary" size="sm" style={{ alignSelf: 'flex-start' }}>Responder</Button>
            </article>
          ))}
      </div>
    </section>
  );
}

Object.assign(window, { Splash, AdminLogin, Sidebar, Agendamentos, Servicos, Feedbacks });
