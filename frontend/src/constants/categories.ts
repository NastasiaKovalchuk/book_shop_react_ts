export const CATEGORIES = [
  "Classics",
  "Fiction",
  "Fantasy",
  "Drama",
  "Science-fiction",
  "Philosophical",
  "Romance",
  "Horror",
  "Children",
  "Historical",
  "Science",
  "Adventure",
  "Mystery",
  "Detective",
  "Epic",
  "Poetry",
  "Tragedy",
] as const;

export type Category = (typeof CATEGORIES)[number];
