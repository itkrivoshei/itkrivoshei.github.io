export interface TextPart {
  highlighted: boolean;
  text: string;
}

export const splitHighlightedText = (text: string, highlights?: string | string[]): TextPart[] => {
  const matches = (Array.isArray(highlights) ? highlights : [highlights])
    .filter((highlight): highlight is string => Boolean(highlight))
    .flatMap((highlight) => {
      const highlightMatches: Array<{ index: number; text: string }> = [];
      let index = text.indexOf(highlight);

      while (index >= 0) {
        highlightMatches.push({ index, text: highlight });
        index = text.indexOf(highlight, index + highlight.length);
      }

      return highlightMatches;
    })
    .sort((left, right) => left.index - right.index || right.text.length - left.text.length);

  if (matches.length === 0) {
    return [{ text, highlighted: false }];
  }

  const parts: TextPart[] = [];
  let cursor = 0;

  matches.forEach(({ index, text: highlight }) => {
    if (index < cursor) return;

    if (index > cursor) {
      parts.push({ text: text.slice(cursor, index), highlighted: false });
    }

    parts.push({ text: highlight, highlighted: true });
    cursor = index + highlight.length;
  });

  if (cursor < text.length) {
    parts.push({ text: text.slice(cursor), highlighted: false });
  }

  return parts;
};
