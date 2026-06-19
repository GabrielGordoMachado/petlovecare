/**
 * Validação simples de e-mail — suficiente para feedback de formulário.
 * Não cobre toda a RFC, só os erros comuns (faltar @ ou domínio).
 */
export function validarEmail(email: string): boolean {
  const texto = (email ?? '').trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto);
}
