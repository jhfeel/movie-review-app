import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieRecommendations = ({ movie_id }) => {
  return api.get(`/movie/${movie_id}/recommendations`);
};

export const useMovieRecommendationsQuery = ({ movie_id }) => {
  return useQuery({
    queryKey: ["movie-recommendations", { movie_id }],
    queryFn: () => fetchMovieRecommendations({ movie_id }),
    select: (result) => result.data.results.slice(0, 8),
  });
};
