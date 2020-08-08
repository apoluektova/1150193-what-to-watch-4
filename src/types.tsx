export interface AuthInfo {
  id: number;
  email: string;
  name: string;
  avatarUrl: string;
}

export interface Movie {
  id: number,
  previewImage: string;
  previewVideo: string;
  videoLink: string;
  title: string;
  backgroundImage: string;
  backgroundColor: string;
  poster: string;
  genre: string;
  releaseDate: number;
  description: string;
  rating: {
    score: number;
    count: number;
  },
  director: string;
  actors: Array<string>;
  runtime: number;
  isFavorite: boolean;
}

export interface ReviewInfo {
  id: number;
  user: {
    id: number;
    name: string;
  };
  comment: string;
  date: string;
  rating: number;
}