/** Une clases condicionales sin dependencias externas. */
export function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

const clp = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

/** Formatea precios en pesos chilenos: 1800 → "$1.800". */
export function formatPrice(value: number): string {
  return clp.format(value);
}
