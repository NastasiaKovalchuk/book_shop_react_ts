export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  language?: string[];
}

export type BookDetails = {
  key: string;
  title: string;
  description?: string;
  cover?: string;
  authors: string[];
  languages: string[];
};
