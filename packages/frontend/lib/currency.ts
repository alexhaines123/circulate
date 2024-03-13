import currency from "currency.js";

export const formatGBP = (value: number) =>
  currency(value, { symbol: "£", precision: 2 }).format();
