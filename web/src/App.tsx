import { Routes, Route } from 'react-router-dom';

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
 * Rotas do App Cliente.
 * - Login e Cadastro ficam FORA do Layout (são telas "popup" navy, tela cheia).
 * - O restante usa o Layout (cabeçalho + rodapé do site).
 * - Pets, Agendar e Agendamentos exigem login (<RotaProtegida>).
 */
export default function App() {
  return (
    <Routes>
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
  );
}
