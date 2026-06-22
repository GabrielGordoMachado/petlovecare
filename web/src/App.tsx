import { createContext, useContext } from 'react';
import { Routes, Route, useLocation, type Location } from 'react-router-dom';

import Layout from './components/Layout';
import RotaProtegida from './components/RotaProtegida';

import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import MeusPets from './pages/MeusPets';
import CadastrarPet from './pages/CadastrarPet';
import Agendar from './pages/Agendar';
import MeusAgendamentos from './pages/MeusAgendamentos';
import MinhaConta from './pages/MinhaConta';
import NaoEncontrada from './pages/NaoEncontrada';

/*
 * Indica se há um popup de autenticação (login/cadastro) aberto POR CIMA de
 * uma página de fundo. A navbar fica visível e clicável atrás do scrim, então
 * quem está na navbar usa isto para não disparar uma nova navegação enquanto o
 * popup já está aberto (evita o "flash" de re-navegar para a mesma tela).
 */
const ModalAuthContext = createContext(false);
export const useModalAuthAberto = () => useContext(ModalAuthContext);

/*
 * Rotas do App Cliente.
 * - Login e Cadastro são telas "popup" navy com scrim translúcido. Quando
 *   abertas a partir de uma página (ex.: botão "Entrar"), elas aparecem POR
 *   CIMA dessa página — que continua visível atrás do scrim. Isso usa o padrão
 *   "backgroundLocation": o quem navega guarda a localização atual em
 *   location.state.backgroundLocation, e aqui renderizamos as rotas de fundo
 *   com essa localização fixa + o popup por cima.
 * - O restante usa o Layout (cabeçalho + rodapé do site).
 * - Pets, Agendar e Agendamentos exigem login (<RotaProtegida>).
 */
export default function App() {
  const location = useLocation();
  const background = (location.state as { backgroundLocation?: Location } | null)
    ?.backgroundLocation;

  return (
    <ModalAuthContext.Provider value={Boolean(background)}>
      {/* Rotas "normais". Se há página de fundo, renderiza-a (location fixa);
          senão, renderiza a própria rota atual (login/cadastro em tela cheia). */}
      <Routes location={background ?? location}>
        {/* Telas de autenticação (sem cabeçalho do site) */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Site + área logada (com cabeçalho/rodapé) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/pets"
            element={
              <RotaProtegida>
                <MeusPets />
              </RotaProtegida>
            }
          />
          <Route
            path="/pets/novo"
            element={
              <RotaProtegida>
                <CadastrarPet />
              </RotaProtegida>
            }
          />
          <Route
            path="/pets/:id/editar"
            element={
              <RotaProtegida>
                <CadastrarPet />
              </RotaProtegida>
            }
          />
          <Route
            path="/conta"
            element={
              <RotaProtegida>
                <MinhaConta />
              </RotaProtegida>
            }
          />
          <Route
            path="/agendar"
            element={
              <RotaProtegida>
                <Agendar />
              </RotaProtegida>
            }
          />
          <Route
            path="/agendamentos"
            element={
              <RotaProtegida>
                <MeusAgendamentos />
              </RotaProtegida>
            }
          />

          <Route path="*" element={<NaoEncontrada />} />
        </Route>
      </Routes>

      {/* Popup de autenticação por cima da página de fundo. */}
      {background && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      )}
    </ModalAuthContext.Provider>
  );
}
