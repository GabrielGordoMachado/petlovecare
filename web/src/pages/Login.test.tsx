import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Login from './Login';
import { AuthProvider } from '../auth';
import { UIProvider } from '../ui';

// Teste de fumaça: a tela de Login monta e mostra os campos essenciais.
// Não toca na rede (o login só é disparado ao enviar o formulário).
function renderizar() {
  return render(
    <MemoryRouter>
      <UIProvider>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </UIProvider>
    </MemoryRouter>,
  );
}

describe('<Login />', () => {
  it('mostra o título e os campos de CPF e senha', () => {
    renderizar();
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('000.000.000-00')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Sua senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });
});
