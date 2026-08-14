export const formatCredits = (credits: number) => `${credits.toLocaleString("en-US")} credits`;

export const PAGE_SIZE = 10;

export const pageSlice = <T,>(items: T[], page: number) =>
  items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
