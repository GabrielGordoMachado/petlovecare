import { describe, it, expect } from 'vitest';
import { apenasDigitos, formatarCpf, validarCpf } from './cpf';

describe('apenasDigitos', () => {
  it('mantém só os números', () => {
    expect(apenasDigitos('123.456.789-09')).toBe('12345678909');
    expect(apenasDigitos('abc12')).toBe('12');
  });
});

describe('formatarCpf', () => {
  it('aplica a máscara 000.000.000-00', () => {
    expect(formatarCpf('12345678909')).toBe('123.456.789-09');
  });
  it('limita a 11 dígitos', () => {
    expect(formatarCpf('123456789099999')).toBe('123.456.789-09');
  });
});

describe('validarCpf', () => {
  it('aceita um CPF válido (com e sem máscara)', () => {
    expect(validarCpf('123.456.789-09')).toBe(true);
    expect(validarCpf('12345678909')).toBe(true);
  });
  it('rejeita dígitos verificadores errados', () => {
    expect(validarCpf('12345678900')).toBe(false);
  });
  it('rejeita tamanho inválido e dígitos repetidos', () => {
    expect(validarCpf('123')).toBe(false);
    expect(validarCpf('11111111111')).toBe(false);
  });
});
