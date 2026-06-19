import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { petsService } from '../services/api';
import { useAuth } from '../auth';
import { useUI } from '../ui';
import type { Pet } from '../types';

/*
 * Lista os pets do tutor (RF de gerenciamento de pets).
 * Permite editar/excluir e leva ao cadastro de um novo pet (PopUp4).
 */
export default function MeusPets() {
  const { cliente } = useAuth();
  const { toast, confirmar } = useUI();
  const [pets, setPets] = useState<Pet[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregar = useCallback(async () => {
    if (!cliente) return;
    setCarregando(true);
    try {
      const { data } = await petsService.doCliente(cliente.cpf);
      setPets(data);
      setErro('');
    } catch {
      setErro('Não foi possível carregar seus pets.');
    } finally {
      setCarregando(false);
    }
  }, [cliente]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  async function excluir(pet: Pet) {
    const ok = await confirmar(`Excluir o pet "${pet.nomePet}"?`);
    if (!ok) return;
    try {
      await petsService.excluir(pet.id);
      toast.sucesso('Pet excluído.');
      await carregar();
    } catch {
      toast.erro('Não foi possível excluir. O pet pode ter agendamentos vinculados.');
    }
  }

  return (
    <div className="container">
      <h1 className="pagina-titulo">Meus pets</h1>
      <p className="pagina-sub">Cadastre seus companheiros para agendar serviços.</p>

      <div className="barra-acoes">
        <span className="card-meta">
          {pets.length} {pets.length === 1 ? 'pet cadastrado' : 'pets cadastrados'}
        </span>
        <Link to="/pets/novo" className="btn-primario">
          + Cadastrar pet
        </Link>
      </div>

      {carregando ? (
        <p className="carregando">Carregando…</p>
      ) : erro ? (
        <p className="erro">{erro}</p>
      ) : pets.length === 0 ? (
        <p className="vazio">
          Você ainda não cadastrou nenhum pet. Comece pelo botão “Cadastrar pet”.
        </p>
      ) : (
        <div className="cards">
          {pets.map((p) => (
            <article key={p.id} className="card">
              <h3>{p.nomePet}</h3>
              <span className="card-meta">
                {p.especie} · {p.raca} · {p.idade} {p.idade === 1 ? 'ano' : 'anos'}
              </span>
              {p.observacoes && <p className="card-meta">“{p.observacoes}”</p>}
              <div className="card-rodape">
                <Link to={`/pets/${p.id}/editar`} className="btn-secundario">
                  Editar
                </Link>
                <button className="btn-perigo" onClick={() => excluir(p)}>
                  Excluir
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
