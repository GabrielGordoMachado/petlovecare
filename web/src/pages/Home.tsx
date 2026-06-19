import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { servicosService } from '../services/api';
import type { Servico } from '../types';

/*
 * Página inicial pública (mockups Desk1–4): herói, principais serviços,
 * "sobre nós" e contato. Os serviços vêm da API (GET /servicos).
 */
export default function Home() {
  const [servicos, setServicos] = useState<Servico[]>([]);

  useEffect(() => {
    servicosService
      .listar()
      .then(({ data }) => setServicos(data))
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
          <div className="hero-img" aria-hidden="true" />
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
                <h3>{s.nome}</h3>
                <p>{s.descricao ?? 'Serviço com foco no conforto e no cuidado do seu pet.'}</p>
                <p className="preco">
                  R$ {Number(s.preco).toFixed(2)} · {s.duracao} min
                </p>
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
          <div className="stats">
            <div className="stat">
              <strong>+500</strong>
              <span>Gatos felizes</span>
            </div>
            <div className="stat">
              <strong>+800</strong>
              <span>Super cachorros</span>
            </div>
            <div className="stat">
              <strong>+50</strong>
              <span>Certificados</span>
            </div>
          </div>
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
