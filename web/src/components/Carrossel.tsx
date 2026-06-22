import {
  Children,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
  type MouseEvent as ReactMouseEvent,
} from 'react';

/*
 * Carrossel horizontal com "drag + snap" (padrão Carousel Drag):
 *  - Os cards aparecem parcialmente nas laterais (peek), sugerindo mais conteúdo.
 *  - O usuário clica/toca e arrasta para navegar; os cards acompanham o cursor.
 *  - Ao soltar, encaixa (snap) no card mais próximo do centro.
 *  - O card central ganha escala/sombra (profundidade) via classe .ativo.
 *
 * No mouse, sequestramos a rolagem (scrollLeft) para o arraste; no toque,
 * deixamos a rolagem nativa + o scroll-snap do CSS cuidarem de tudo.
 */
export function Carrossel({
  children,
  ariaLabel,
}: {
  children: ReactNode;
  ariaLabel?: string;
}) {
  const trilhoRef = useRef<HTMLDivElement>(null);
  const arraste = useRef({ ativo: false, moveu: false, inicioX: 0, inicioScroll: 0 });
  const [arrastando, setArrastando] = useState(false);
  // Setas só aparecem quando há conteúdo para aquele lado.
  const [setas, setSetas] = useState({ anterior: false, proxima: false });

  function itens(): HTMLElement[] {
    const t = trilhoRef.current;
    return t ? (Array.from(t.children) as HTMLElement[]) : [];
  }

  /* Card cujo centro está mais próximo do centro do trilho. */
  function itemCentral(): HTMLElement | null {
    const t = trilhoRef.current;
    if (!t) return null;
    const centro = t.scrollLeft + t.clientWidth / 2;
    let alvo: HTMLElement | null = null;
    let menor = Infinity;
    for (const item of itens()) {
      const dist = Math.abs(item.offsetLeft + item.offsetWidth / 2 - centro);
      if (dist < menor) {
        menor = dist;
        alvo = item;
      }
    }
    return alvo;
  }

  function destacarCentral() {
    const central = itemCentral();
    for (const item of itens()) item.classList.toggle('ativo', item === central);
  }

  function atualizarSetas() {
    const t = trilhoRef.current;
    if (!t) return;
    setSetas({
      anterior: t.scrollLeft > 2,
      proxima: t.scrollLeft < t.scrollWidth - t.clientWidth - 2,
    });
  }

  function atualizar() {
    destacarCentral();
    atualizarSetas();
  }

  // Vai para o card anterior/seguinte ao card central e encaixa no centro.
  function irPara(direcao: -1 | 1) {
    const t = trilhoRef.current;
    const central = itemCentral();
    if (!t || !central) return;
    const alvo = (
      direcao === 1 ? central.nextElementSibling : central.previousElementSibling
    ) as HTMLElement | null;
    if (!alvo) return;
    t.scrollTo({
      left: alvo.offsetLeft + alvo.offsetWidth / 2 - t.clientWidth / 2,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    atualizar();
    const t = trilhoRef.current;
    if (!t) return;
    let raf = 0;
    const aoRolar = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(atualizar);
    };
    t.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('resize', atualizar);
    return () => {
      t.removeEventListener('scroll', aoRolar);
      window.removeEventListener('resize', atualizar);
      cancelAnimationFrame(raf);
    };
  }, [children]);

  function aoDescer(e: ReactPointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse') return; // toque: rolagem nativa + snap do CSS
    const t = trilhoRef.current;
    if (!t) return;
    e.preventDefault(); // evita seleção de texto e "fantasma" ao arrastar imagem
    arraste.current = {
      ativo: true,
      moveu: false,
      inicioX: e.clientX,
      inicioScroll: t.scrollLeft,
    };
    setArrastando(true);
    t.setPointerCapture(e.pointerId);
  }

  function aoMover(e: ReactPointerEvent<HTMLDivElement>) {
    const a = arraste.current;
    const t = trilhoRef.current;
    if (!a.ativo || !t) return;
    const delta = e.clientX - a.inicioX;
    if (Math.abs(delta) > 4) a.moveu = true;
    t.scrollLeft = a.inicioScroll - delta;
  }

  function aoSoltar(e: ReactPointerEvent<HTMLDivElement>) {
    const a = arraste.current;
    const t = trilhoRef.current;
    if (!a.ativo || !t) return;
    a.ativo = false;
    setArrastando(false);
    if (t.hasPointerCapture(e.pointerId)) t.releasePointerCapture(e.pointerId);
    // Encaixa suavemente no card mais próximo do centro.
    const central = itemCentral();
    if (central) {
      t.scrollTo({
        left: central.offsetLeft + central.offsetWidth / 2 - t.clientWidth / 2,
        behavior: 'smooth',
      });
    }
  }

  // Depois de arrastar, anula o clique para não acionar links/botões dos cards.
  function aoClicarCapturando(e: ReactMouseEvent<HTMLDivElement>) {
    if (arraste.current.moveu) {
      e.preventDefault();
      e.stopPropagation();
      arraste.current.moveu = false;
    }
  }

  return (
    <div className="carrossel">
      {setas.anterior && (
        <button
          type="button"
          className="carrossel-seta anterior"
          aria-label="Ver avaliação anterior"
          onClick={() => irPara(-1)}
        >
          <span className="arrow-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z" />
            </svg>
          </span>
        </button>
      )}

      <div
        ref={trilhoRef}
        className={`carrossel-trilho${arrastando ? ' arrastando' : ''}`}
        role="group"
        aria-label={ariaLabel}
        onPointerDown={aoDescer}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
        onClickCapture={aoClicarCapturando}
      >
        {Children.map(children, (child) => (
          <div className="carrossel-item">{child}</div>
        ))}
      </div>

      {setas.proxima && (
        <button
          type="button"
          className="carrossel-seta proxima"
          aria-label="Ver próxima avaliação"
          onClick={() => irPara(1)}
        >
          <span className="arrow-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
