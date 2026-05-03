const fallbackCustomColor = "rgb(var(--color-primary))";

function isHexColor(value: string) {
  return /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value);
}

function isRgbColor(value: string) {
  return /^rgba?\(\s*[^)]+\)$/i.test(value);
}

function parseRgbChannels(value: string) {
  const match = /^(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})$/.exec(value);

  if (!match) {
    return null;
  }

  const channels = match.slice(1).map(Number);

  if (channels.some((channel) => channel < 0 || channel > 255)) {
    return null;
  }

  return `rgb(${channels.join(" ")})`;
}

export function resolveCustomColor(customColor: string | undefined) {
  const color = customColor?.trim();

  if (!color) {
    return fallbackCustomColor;
  }

  if (isHexColor(color) || isRgbColor(color)) {
    return color;
  }

  return parseRgbChannels(color) ?? fallbackCustomColor;
}
