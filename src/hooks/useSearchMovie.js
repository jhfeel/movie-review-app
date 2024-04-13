import { useQuery } from "@tanstack/react-query";
import api from "./../utils/api";

const fetchSearchMovie = ({ sort, genreId, keyword, page }) => {
  let url = `/discover/movie?`;
  const params = [];

  if (!sort && !genreId && !keyword) {
    return api.get(`/movie/popular?page=${page}`);
  }

  if (keyword) {
    return api.get(`/search/movie?query=${keyword}&page=${page}`);
  } else {
    if (sort) params.push(`sort_by=${encodeURIComponent(sort)}`);
    if (genreId) params.push(`with_genres=${encodeURIComponent(genreId)}`);

    url += params.join("&");
    return api.get(url);
  }
};

export const useSearchMovieQuery = ({ sort, genreId, keyword, page }) => {
  return useQuery({
    queryKey: ["movie-search", { sort, genreId, keyword, page }],
    queryFn: () => fetchSearchMovie({ sort, genreId, keyword, page }),
    select: (result) => result.data,
  });
};
