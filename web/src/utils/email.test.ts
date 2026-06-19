import { describe, it, expect } from 'vitest';
import { validarEmail } from './email';

describe('validarEmail', () => {
  it('aceita e-mails comuns', () => {
    expect(validarEmail('maria@email.com')).toBe(true);
    expect(validarEmail('joao.silva@dominio.com.br')).toBe(true);
  });
  it('rejeita e-mails inválidos', () => {
    expect(validarEmail('sem-arroba')).toBe(false);
    expect(validarEmail('falta@dominio')).toBe(false);
    expect(validarEmail('')).toBe(false);
  });
});
