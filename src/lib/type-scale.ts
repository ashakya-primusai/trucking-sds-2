export type TypeScaleId = "compact" | "default" | "large";

export type TypeScaleDef = {
  id: TypeScaleId;
  label: string;
  vars: Record<string, string>;
};

export const TYPE_SCALES: TypeScaleDef[] = [
  {
    id: "compact",
    label: "Compact",
    vars: {
      "--sz-h1":   "clamp(40px, 5vw, 68px)",
      "--sz-h2":   "clamp(24px, 2.6vw, 38px)",
      "--sz-h3":   "clamp(17px, 1.7vw, 24px)",
      "--sz-body": "clamp(13px, 1.05vw, 16px)",
    },
  },
  {
    id: "default",
    label: "Default",
    vars: {
      "--sz-h1":   "clamp(56px, 7vw, 94px)",
      "--sz-h2":   "clamp(32px, 3.6vw, 52px)",
      "--sz-h3":   "clamp(22px, 2.2vw, 32px)",
      "--sz-body": "clamp(16px, 1.3vw, 20px)",
    },
  },
  {
    id: "large",
    label: "Large",
    vars: {
      "--sz-h1":   "clamp(68px, 9vw, 120px)",
      "--sz-h2":   "clamp(40px, 4.8vw, 68px)",
      "--sz-h3":   "clamp(28px, 3vw, 44px)",
      "--sz-body": "clamp(18px, 1.6vw, 24px)",
    },
  },
];
