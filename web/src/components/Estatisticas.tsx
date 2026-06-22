import { useEffect, useRef, useState } from 'react';

/*
 * Estatísticas da seção "Sobre" (mockup Desk3). Animam ao entrar na viewport
 * (efeito de "carregamento"):
 *  - número: count-up de 0 até o valor;
 *  - rótulo: começa embaralhado e vai se decodificando da esquerda p/ a direita
 *    (ex.: "ajhgsj" → "Gjhgsj" → ... → "Gatos felizes").
 * Respeita prefers-reduced-motion (mostra o valor final sem animar).
 */

interface Estatistica {
  prefixo?: string;
  valor: number;
  rotulo: string;
}

const ITENS: Estatistica[] = [
  { prefixo: '+', valor: 500, rotulo: 'Gatos felizes' },
  { prefixo: '+', valor: 800, rotulo: 'Super cachorros' },
  { prefixo: '+', valor: 50, rotulo: 'Certificados' },
];

const CARACTERES = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function aleatorio() {
  return CARACTERES[Math.floor(Math.random() * CARACTERES.length)];
}

function reduzMovimento() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function Estatisticas() {
  const ref = useRef<HTMLDivElement>(null);
  const [animar, setAnimar] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimar(true);
          obs.disconnect(); // só uma vez
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="stats" ref={ref}>
      {ITENS.map((item) => (
        <div className="stat" key={item.rotulo}>
          <strong>
            <Numero prefixo={item.prefixo} valor={item.valor} animar={animar} />
          </strong>
          <span>
            <TextoEmbaralhado texto={item.rotulo} animar={animar} />
          </span>
        </div>
      ))}
    </div>
  );
}

function Numero({
  prefixo = '',
  valor,
  animar,
}: {
  prefixo?: string;
  valor: number;
  animar: boolean;
}) {
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    if (!animar) return;
    if (reduzMovimento()) {
      setAtual(valor);
      return;
    }
    const duracao = 1500;
    const inicio = performance.now();
    let raf = 0;
    const passo = (agora: number) => {
      const p = Math.min(1, (agora - inicio) / duracao);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setAtual(Math.round(eased * valor));
      if (p < 1) raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [animar, valor]);

  return (
    <>
      {prefixo}
      {atual}
    </>
  );
}

function TextoEmbaralhado({ texto, animar }: { texto: string; animar: boolean }) {
  const [exibido, setExibido] = useState(texto);

  useEffect(() => {
    if (!animar) return;
    if (reduzMovimento()) {
      setExibido(texto);
      return;
    }
    const duracao = 900;
    const inicio = performance.now();
    let raf = 0;
    const passo = (agora: number) => {
      const p = Math.min(1, (agora - inicio) / duracao);
      const revelados = Math.floor(p * texto.length);
      let saida = '';
      for (let i = 0; i < texto.length; i++) {
        const ch = texto[i];
        // Mantém espaços e o que já foi revelado; o resto sorteia uma letra.
        saida += i < revelados || ch === ' ' ? ch : aleatorio();
      }
      setExibido(saida);
      if (p < 1) raf = requestAnimationFrame(passo);
      else setExibido(texto);
    };
    raf = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(raf);
  }, [animar, texto]);

  return <>{exibido}</>;
}
