import { describe, it, expect } from 'vitest';
import { formatarData } from './data';

describe('formatarData', () => {
  it('formata data com hora no padrão pt-BR', () => {
    // 20/06/2026 14:00 (horário local)
    expect(formatarData('2026-06-20T14:00:00')).toMatch(/20\/06\/2026/);
  });
  it('formata só a data quando comHora = false', () => {
    expect(formatarData('2026-06-20T14:00:00', false)).toBe('20/06/2026');
  });
  it('devolve string vazia para data inválida', () => {
    expect(formatarData('xxx')).toBe('');
  });
});
