export function formatCurrency(amount: number, locale = "id-ID", currency = "IDR") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

export function parseCurrency(input: string) {
  const digits = input.replace(/[^\d]/g, "");
  return Number(digits);
}
