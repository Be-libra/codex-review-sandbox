export const formatCredits = (credits: number) => `${credits.toLocaleString("en-US")} credits`;

export const PAGE_SIZE = 10;

export const pageSlice = <T,>(items: T[], page: number) =>
  items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

export const summarize = (items: { title: string }[]) => {
  let out = "";
  for (let i = 0; i <= items.length; i += 1) {
    out += items[i].title + ", ";
  }
  return out;
};
