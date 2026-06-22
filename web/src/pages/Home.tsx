import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Carrossel } from '../components/Carrossel';
import { Estatisticas } from '../components/Estatisticas';
import { PetFeedbackCard } from '../components/feedback/PetFeedbackCard';
import { servicosService } from '../services/api';
import type { Servico } from '../types';

/*
 * Avaliações em destaque na seção "sobre nós". Estáticas por ora (mockup);
 * quando houver endpoint de avaliações, basta trocar por dados da API.
 */
const avaliacoes = [
  {
    photo: '/img/servico-banho.jpg',
    petName: 'Mia',
    tutor: 'Ana Souza',
    rating: 5,
    service: 'Banho',
    date: '18 jun',
    comment: 'Atendimento maravilhoso, a Mia saiu cheirosa e tranquila!',
  },
  {
    photo: '/img/servico-tosa.jpg',
    petName: 'Thor',
    tutor: 'Bruno Lima',
    rating: 5,
    service: 'Tosa',
    date: '12 jun',
    comment: 'Equipe super atenciosa e cuidadosa. O Thor adorou e voltou lindo.',
  },
  {
    photo: '/img/servico-consulta.jpg',
    petName: 'Luna',
    tutor: 'Carla Dias',
    rating: 4.5,
    service: 'Consulta',
    date: '05 jun',
    comment: 'Profissionais excelentes, explicaram tudo com calma. Recomendo demais!',
  },
  {
    photo: '/img/servico-banho-tosa.jpg',
    petName: 'Bidu',
    tutor: 'Diego Reis',
    rating: 5,
    service: 'Banho e Tosa',
    date: '28 mai',
    comment: 'Agendamento fácil pelo site e o Bidu ficou impecável. Voltaremos sempre!',
  },
  {
    photo: '/img/servico-tosa.jpg',
    petName: 'Nina',
    tutor: 'Elaine Castro',
    rating: 5,
    service: 'Tosa',
    date: '20 mai',
    comment: 'Carinho de verdade com os animais. A Nina é tímida e se sentiu segura.',
  },
];

/*
 * Escolhe a imagem do card conforme o nome do serviço. As imagens ficam em
 * public/img/ (bundladas no projeto, sem depender de URL externa). Se o nome
 * não casar com nenhum caso, usa uma imagem padrão.
 */
function imagemServico(nome: string): string {
  const n = nome.toLowerCase();
  if (n.includes('banho') && n.includes('tosa')) return '/img/servico-banho-tosa.jpg';
  if (n.includes('banho')) return '/img/servico-banho.jpg';
  if (n.includes('tosa')) return '/img/servico-tosa.jpg';
  return '/img/servico-padrao.jpg';
}

/*
 * Página inicial pública (mockups Desk1–4): herói, principais serviços,
 * "sobre nós" e contato. Os serviços vêm da API (GET /servicos).
 */
export default function Home() {
  const [servicos, setServicos] = useState<Servico[]>([]);

  useEffect(() => {
    // Serviços que não aparecem na vitrine no momento (ex.: não oferecidos agora).
    const ocultos = ['vacinação'];
    servicosService
      .listar()
      .then(({ data }) =>
        setServicos(
          data.filter((s) => !ocultos.includes(s.nome.toLowerCase())),
        ),
      )
      .catch(() => setServicos([])); // sem serviços ainda → seção mostra aviso
  }, []);

  return (
    <>
      {/* ---- Início / herói (Desk1) ---- */}
      <section id="inicio" className="container">
        <div className="hero">
          <div>
            <p className="hero-chamada">Cuidado em cada momento para seu</p>
            <h1 className="hero-titulo">MELHOR AMIGO</h1>
            <Link to="/agendar" className="btn-primario">
              Agende agora
            </Link>
            <p className="hero-desc">
              Unimos organização e atendimento humanizado para oferecer experiências
              seguras e acolhedoras para o seu pet.
            </p>
          </div>
          <img
            className="hero-img"
            src="/img/hero.jpg"
            alt="Dois cães correndo felizes ao pôr do sol"
          />
        </div>
      </section>

      {/* ---- Serviços (Desk2) ---- */}
      <section id="servicos" className="faixa">
        <div className="faixa-inner">
          <h2 className="faixa-titulo">
            Nossos principais <span className="destaque">serviços</span>
          </h2>
          <p className="faixa-sub">
            Uma experiência moderna e acolhedora para facilitar o cuidado com o
            bem-estar do seu pet.
          </p>
        </div>
      </section>
      <section className="container">
        {servicos.length === 0 ? (
          <p className="vazio">Em breve nossos serviços aparecerão aqui.</p>
        ) : (
          <div className="servicos-grid">
            {servicos.map((s) => (
              <article key={s.id} className="servico-card">
                <img
                  className="servico-img"
                  src={imagemServico(s.nome)}
                  alt={`Serviço: ${s.nome}`}
                  loading="lazy"
                  onError={(e) => {
                    // Defesa: se a imagem não carregar, cai na padrão.
                    e.currentTarget.src = '/img/servico-padrao.jpg';
                  }}
                />
                <div className="servico-corpo">
                  <h3>{s.nome}</h3>
                  <p>
                    {s.descricao ??
                      'Serviço com foco no conforto e no cuidado do seu pet.'}
                  </p>
                  <p className="preco">
                    R$ {Number(s.preco).toFixed(2)} · {s.duracao} min
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ---- Sobre nós (Desk3) ---- */}
      <section id="sobre" className="faixa">
        <div className="faixa-inner">
          <h2 className="faixa-titulo">
            Sobre <span className="destaque">nós</span>
          </h2>
          <p className="faixa-sub">
            Unimos atendimento humanizado, cuidado profissional e praticidade para o
            bem-estar do seu pet.
          </p>
        </div>
      </section>
      <section className="container">
        <div className="sobre">
          <h2>
            Quem <span className="destaque">nós somos?</span>
          </h2>
          <p>
            A PetLoveCare nasceu com o propósito de unir tecnologia e cuidado em um só
            lugar. Criamos uma solução que ajuda a organizar atendimentos, agilizar
            processos e manter o foco no que realmente importa: o bem-estar dos pets.
          </p>
          <Carrossel ariaLabel="Avaliações de tutores">
            {avaliacoes.map((a) => (
              <PetFeedbackCard key={a.petName} photoAspect="4/3" {...a} />
            ))}
          </Carrossel>
          <Estatisticas />
        </div>
      </section>

      {/* ---- Contato (Desk4) ---- */}
      <section id="contato" className="faixa">
        <div className="faixa-inner">
          <h2 className="faixa-titulo">Contato</h2>
          <p className="faixa-sub">
            Fale com a nossa equipe e tire dúvidas sobre nossos serviços, atendimentos
            e cuidados especializados.
          </p>
        </div>
      </section>
      <section className="container">
        <p className="hero-desc" style={{ maxWidth: '52ch' }}>
          📍 Campo Grande/MS · 📞 (67) 99999-0000 · ✉️ contato@petlovecare.com
        </p>
      </section>
    </>
  );
}
