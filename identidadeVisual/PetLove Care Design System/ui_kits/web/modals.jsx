/* PetLove Care — Web client modals (Login, Cadastro, Agendar, Cadastrar Pet).
   Navy modal over a dimmed overlay, matching the Figma popups. */
const DSM = window.PetLoveCareDesignSystem_7829c3;
const { Input: I, Select: S, Textarea: T, Button: B } = DSM;

function Overlay({ children, onClose }) {
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(10,16,28,0.55)', backdropFilter: 'blur(2px)',
      display: 'grid', placeItems: 'center', zIndex: 50, padding: '24px',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: '360px', maxWidth: '100%', background: 'var(--navy)',
        borderRadius: 'var(--radius-lg)', padding: '30px 28px',
        boxShadow: 'var(--shadow-lg)', maxHeight: '90vh', overflowY: 'auto',
      }}>{children}</div>
    </div>
  );
}

function Title({ children }) {
  return <h2 style={{
    margin: '0 0 20px', textAlign: 'center', color: 'var(--white)',
    fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', letterSpacing: '0.08em',
  }}>{children}</h2>;
}

function LoginModal({ onClose, go }) {
  return (
    <Overlay onClose={onClose}>
      <Title>LOGIN</Title>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <I label="CPF" theme="filled" placeholder="000.000.000-00" />
        <I label="Senha" theme="filled" type="password" placeholder="Sua senha" />
        <B variant="primary" fullWidth onClick={() => go('done')} style={{ marginTop: '4px' }}>Entrar</B>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', marginTop: '4px' }}>
          <B variant="link" onClick={() => go('signup')}>Não tem uma conta? Cadastre-se</B>
          <B variant="link">Esqueceu a senha?</B>
        </div>
      </div>
    </Overlay>
  );
}

function SignupModal({ onClose, go }) {
  return (
    <Overlay onClose={onClose}>
      <Title>CADASTRE-SE</Title>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <I label="Nome" theme="filled" placeholder="Seu nome" />
        <I label="CPF" theme="filled" placeholder="000.000.000-00" />
        <I label="Email" theme="filled" type="email" placeholder="voce@email.com" />
        <I label="Telefone" theme="filled" placeholder="(11) 99999-0000" />
        <I label="Senha" theme="filled" type="password" placeholder="Crie uma senha" />
        <B variant="primary" fullWidth onClick={() => go('schedule')} style={{ marginTop: '4px' }}>Confirmar</B>
        <B variant="link" onClick={() => go('login')}>Já tem conta? Entrar</B>
      </div>
    </Overlay>
  );
}

function ScheduleModal({ onClose, go }) {
  return (
    <Overlay onClose={onClose}>
      <Title>AGENDE AGORA</Title>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <S theme="filled" placeholder="Escolha o pet" options={['Rex','Mia','Thor']} />
        <S theme="filled" placeholder="Escolha o serviço" options={['Banho','Tosa','Banho + Tosa']} />
        <S theme="filled" placeholder="Escolha a data" options={['20/06','21/06','22/06']} />
        <S theme="filled" placeholder="Escolha um horário" options={['09:00','11:00','14:00','16:00']} />
        <B variant="primary" fullWidth onClick={() => go('done')} style={{ marginTop: '4px' }}>Agendar</B>
        <B variant="link" onClick={() => go('pet')}>Não tem um pet cadastrado? Cadastre-o</B>
      </div>
    </Overlay>
  );
}

function PetModal({ onClose, go }) {
  return (
    <Overlay onClose={onClose}>
      <Title>CADASTRE SEU PET</Title>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <I label="Nome do pet" theme="filled" placeholder="Ex.: Rex" />
        <S label="Espécie" theme="filled" placeholder="Espécie" options={['Cachorro','Gato','Outro']} />
        <I label="Raça" theme="filled" placeholder="Ex.: Golden Retriever" />
        <I label="Idade" theme="filled" type="number" placeholder="Anos" />
        <T label="Observações" theme="filled" rows={3} placeholder="Ex.: cão acima de 20kg" />
        <B variant="primary" fullWidth onClick={() => go('schedule')} style={{ marginTop: '4px' }}>Cadastrar Pet</B>
      </div>
    </Overlay>
  );
}

function DoneModal({ onClose }) {
  return (
    <Overlay onClose={onClose}>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
        <div style={{ fontSize: '52px' }}>🐾</div>
        <Title>TUDO CERTO!</Title>
        <p style={{ margin: '-12px 0 0', color: 'var(--muted-on-dark)', fontFamily: 'var(--font-body)' }}>Seu agendamento foi enviado. Você receberá a confirmação em breve.</p>
        <B variant="primary" fullWidth onClick={onClose}>Voltar ao início</B>
      </div>
    </Overlay>
  );
}

Object.assign(window, { LoginModal, SignupModal, ScheduleModal, PetModal, DoneModal });
