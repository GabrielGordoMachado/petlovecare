/**
 * Formata uma data ISO para o padrão brasileiro.
 * @param dataIso  Ex.: '2026-06-20T14:00:00'
 * @param comHora  Inclui a hora (padrão: true)
 */
export function formatarData(dataIso: string, comHora = true): string {
  const data = new Date(dataIso);
  if (Number.isNaN(data.getTime())) return '';

  const opcoes: Intl.DateTimeFormatOptions = comHora
    ? { dateStyle: 'short', timeStyle: 'short' }
    : { dateStyle: 'short' };

  return new Intl.DateTimeFormat('pt-BR', opcoes).format(data);
}
