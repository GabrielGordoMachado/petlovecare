/**
 * Utilitários de CPF: validação dos dígitos verificadores e máscara de exibição.
 * A API guarda o CPF só com os 11 dígitos (PK VarChar(11)); a máscara é só visual.
 */

/** Remove tudo que não for dígito. */
export function apenasDigitos(cpf: string): string {
  return (cpf ?? '').replace(/\D/g, '');
}

/** Formata para 000.000.000-00 conforme o usuário digita. */
export function formatarCpf(valor: string): string {
  return apenasDigitos(valor)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

/**
 * Valida um CPF conferindo os dois dígitos verificadores.
 * Aceita com ou sem máscara.
 */
export function validarCpf(cpf: string): boolean {
  const numeros = apenasDigitos(cpf);

  if (numeros.length !== 11) return false;
  // Dígitos todos iguais passam na conta mas são inválidos.
  if (/^(\d)\1{10}$/.test(numeros)) return false;

  function calcularDigito(ate: number): number {
    let soma = 0;
    let peso = ate + 1;
    for (let i = 0; i < ate; i++) {
      soma += Number(numeros[i]) * peso;
      peso--;
    }
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  }

  return (
    calcularDigito(9) === Number(numeros[9]) &&
    calcularDigito(10) === Number(numeros[10])
  );
}
