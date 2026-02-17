export const CATEGORIES = [
  "Classics",
  "Fiction",
  "Fantasy",
  "Science-fiction",
  "Romance",
  "Horror",
  "Children",
  "History",
  "Science",
  "Adventure",
  "Mystery",
  "Poetry",
  "Movie Books",
] as const;

export type Category = (typeof CATEGORIES)[number];
