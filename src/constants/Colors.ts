// Puedes ampliar este tipo si luego agregas más colores
export type AppColor =
  | "green"
  | "blue"
  | "brown"
  | "red"
  | "gray"
  | "purple"
  | "orange";

// Arreglo principal de colores (nombres semánticos)
export const appColors: AppColor[] = [
  "green",
  "blue",
  "brown",
  "red",
  "gray",
  "purple",
  "orange",
];

// Mapa a valores HEX reales del diseño
export const colorHexMap: Record<AppColor, string> = {
  green: "#2E7D32",
  blue: "#1565C0",
  brown: "#8D6E63",
  red: "#C62828",
  gray: "#757575",
  purple: "#6A1B9A",
  orange: "#EF6C00",
};