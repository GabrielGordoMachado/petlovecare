/* PetLove Care — Web marketing sections.
   Composes DS primitives from window.PetLoveCareDesignSystem_7829c3.
   Exports section components onto window for index.html. */
const DS = window.PetLoveCareDesignSystem_7829c3;
const { NavBar, SectionHeader, ServiceCard, Button, Logo } = DS;
const ASSETS = '../../assets/';

function Hero({ onAgendar, onNav }) {
  return (
    <section style={{ background: 'var(--bg-light)', padding: '0 0 56px' }}>
      <NavBar active="Início" onAgendar={onAgendar} onNavigate={onNav} />
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '40px',
        maxWidth: '1200px', margin: '0 auto', padding: '40px 48px 0',
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <p style={{
            margin: '0 0 2px', fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(22px, 2.6vw, 34px)', color: 'var(--navy)', lineHeight: 1.1,
          }}>Cuidado em cada momento para seu</p>
          <h1 style={{
            margin: '0 0 26px', fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(56px, 8vw, 116px)', lineHeight: 0.92, letterSpacing: '-0.02em',
            color: 'var(--navy)',
          }}>MELHOR<br/>AMIGO</h1>
          <Button variant="primary" size="lg" onClick={onAgendar}>AGENDE AGORA</Button>
          <p style={{
            margin: '26px 0 0', maxWidth: '420px', fontFamily: 'var(--font-body)',
            fontSize: '16px', lineHeight: 1.55, color: 'var(--navy)',
          }}>Unimos organização e atendimento humanizado para oferecer experiências seguras e acolhedoras para seu pet.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '18px' }}>
          <img src={ASSETS + 'hero-cat.jpg'} alt="Gato"
               style={{ width: '100%', maxWidth: '480px', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '6px' }} />
          <div style={{ display: 'flex', gap: '18px', color: 'var(--navy)', fontSize: '24px' }}>
            <span title="WhatsApp">✆</span><span title="Instagram">◎</span><span title="Facebook">f</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicos">
      <SectionHeader title="Nossos principais serviços"
        subtitle="Uma experiência moderna e acolhedora para facilitar o cuidado com o bem-estar do seu pet." />
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px',
        maxWidth: '900px', margin: '0 auto', padding: '44px 48px',
      }}>
        <ServiceCard title="TOSA">Nossa tosa é realizada com atenção aos detalhes e foco total no conforto e bem-estar do seu pet. Utilizamos equipamentos apropriados, técnicas cuidadosas e um atendimento humanizado.</ServiceCard>
        <ServiceCard title="BANHO">O banho é realizado com produtos adequados e técnicas de higiene desenvolvidas para garantir limpeza, conforto e segurança ao seu pet. Nossa equipe prioriza um atendimento cuidadoso e acolhedor.</ServiceCard>
      </div>
    </section>
  );
}

function About() {
  const stats = [
    { n: '+500', l: 'GATOS FELIZES' },
    { n: '+800', l: 'SUPER CACHORROS' },
    { n: '100%', l: 'CERTIFICADOS' },
  ];
  return (
    <section id="sobre">
      <SectionHeader title="Sobre nós"
        subtitle="Unimos atendimento humanizado, cuidado profissional e praticidade para o bem-estar do seu pet." />
      <p style={{
        maxWidth: '760px', margin: '0 auto', padding: '48px 48px 40px', textAlign: 'center',
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(20px, 2.4vw, 30px)',
        lineHeight: 1.35, color: 'var(--navy)', textWrap: 'pretty',
      }}>A PetLoveCare nasceu com o propósito de unir tecnologia e cuidado em um só lugar. Criamos uma solução que ajuda a organizar atendimentos, agilizar processos e manter o foco no que realmente importa: o bem-estar dos pets.</p>
      <div style={{
        background: 'var(--coral)', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
        gap: '20px', padding: '34px 48px',
      }}>
        {stats.map((s) => (
          <div key={s.l} style={{ textAlign: 'center', color: 'var(--navy)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '46px', lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '17px', letterSpacing: '0.04em', marginTop: '6px' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactFooter({ onAgendar }) {
  return (
    <section id="contato">
      <SectionHeader title="Contato"
        subtitle="Fale com nossa equipe e tire dúvidas sobre nossos serviços, atendimentos e cuidados especializados." />
      <div style={{ background: 'var(--navy)', padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <Logo variant="lockup" theme="white" height={120} />
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', color: 'var(--muted-on-dark)', fontFamily: 'var(--font-body)', fontSize: '15px' }}>
          <span>📍 Av. dos Pets, 1234 — São Paulo</span>
          <span>✉ contato@petlovecare.com.br</span>
          <span>✆ (11) 99999-0000</span>
        </div>
        <Button variant="primary" size="lg" onClick={onAgendar}>AGENDE AGORA</Button>
        <small style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>© 2026 PetLove Care · Cuidado humanizado para seu melhor amigo</small>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, Services, About, ContactFooter });
