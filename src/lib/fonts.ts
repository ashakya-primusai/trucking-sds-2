export type FontId =
  | "geist"
  | "instrument-serif"
  | "playfair"
  | "inter"
  | "poppins"
  | "dm-serif"
  | "sora";

export type FontDef = {
  id: FontId;
  label: string;
  cssVar: string;
};

export const FONTS: FontDef[] = [
  { id: "geist",            label: "Geist Sans",       cssVar: "--font-geist-sans" },
  { id: "inter",            label: "Inter",             cssVar: "--font-inter" },
  { id: "poppins",          label: "Poppins",           cssVar: "--font-poppins" },
  { id: "sora",             label: "Sora",              cssVar: "--font-sora" },
  { id: "instrument-serif", label: "Instrument Serif",  cssVar: "--font-instrument-serif" },
  { id: "playfair",         label: "Playfair Display",  cssVar: "--font-playfair" },
  { id: "dm-serif",         label: "DM Serif Display",  cssVar: "--font-dm-serif" },
];
