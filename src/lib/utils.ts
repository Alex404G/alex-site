export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export const easings = {
  outQuart: [0.22, 1, 0.36, 1] as const,
  inOutQuart: [0.76, 0, 0.24, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
};

export const SIG_COLORS = ["#3D5CFF", "#5B6BFF", "#8B5CF6", "#B845E8"] as const;
