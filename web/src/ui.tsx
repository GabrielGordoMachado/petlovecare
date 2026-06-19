import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react';

/*
 * Camada de feedback visual da aplicação:
 *  - toast: mensagens curtas (sucesso/erro/info) no canto da tela.
 *  - confirmar: diálogo de confirmação (Promise<boolean>), no lugar do confirm() nativo.
 *
 * Centraliza aqui para que nenhuma tela precise usar alert()/confirm() do navegador.
 */

type TipoToast = 'sucesso' | 'erro' | 'info';

interface Toast {
  id: number;
  tipo: TipoToast;
  mensagem: string;
}

interface PedidoConfirmacao {
  mensagem: string;
  resolver: (ok: boolean) => void;
}

interface UIContextType {
  toast: {
    sucesso: (m: string) => void;
    erro: (m: string) => void;
    info: (m: string) => void;
  };
  confirmar: (mensagem: string) => Promise<boolean>;
}

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmacao, setConfirmacao] = useState<PedidoConfirmacao | null>(null);
  const proximoId = useRef(1);

  const adicionar = useCallback((tipo: TipoToast, mensagem: string) => {
    const id = proximoId.current++;
    setToasts((atual) => [...atual, { id, tipo, mensagem }]);
    // Some sozinho depois de alguns segundos.
    setTimeout(() => {
      setToasts((atual) => atual.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const toast = {
    sucesso: (m: string) => adicionar('sucesso', m),
    erro: (m: string) => adicionar('erro', m),
    info: (m: string) => adicionar('info', m),
  };

  const confirmar = useCallback((mensagem: string) => {
    return new Promise<boolean>((resolver) => {
      setConfirmacao({ mensagem, resolver });
    });
  }, []);

  function responder(ok: boolean) {
    confirmacao?.resolver(ok);
    setConfirmacao(null);
  }

  return (
    <UIContext.Provider value={{ toast, confirmar }}>
      {children}

      {/* Toasts */}
      <div className="toasts" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.tipo}`}>
            {t.mensagem}
          </div>
        ))}
      </div>

      {/* Diálogo de confirmação */}
      {confirmacao && (
        <div className="modal-fundo" onClick={() => responder(false)}>
          <div
            className="modal-caixa"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <p>{confirmacao.mensagem}</p>
            <div className="modal-acoes">
              <button className="btn-secundario" onClick={() => responder(false)}>
                Cancelar
              </button>
              <button className="btn-primario" onClick={() => responder(true)}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI deve ser usado dentro de <UIProvider>.');
  return ctx;
}
