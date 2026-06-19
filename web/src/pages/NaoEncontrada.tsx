import { Link } from 'react-router-dom';

/* Página 404 — rota inexistente, dentro do layout do site. */
export default function NaoEncontrada() {
  return (
    <div className="container">
      <div className="vazio">
        <h1 className="pagina-titulo">Página não encontrada</h1>
        <p className="pagina-sub">O endereço que você tentou acessar não existe.</p>
        <Link to="/" className="btn-primario">
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
