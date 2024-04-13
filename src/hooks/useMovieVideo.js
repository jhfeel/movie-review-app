import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieVideo = ({ movie_id }) => {
  return api.get(`/movie/${movie_id}/videos`);
};

export const useMovieVideoQuery = ({ movie_id }) => {
  return useQuery({
    queryKey: ["movie-video", { movie_id }],
    queryFn: () => fetchMovieVideo({ movie_id }),
    select: (result) => {
      return (
        result.data.results.filter((video) => video.type === "Trailer")[0] ||
        result.data.results[0]
      );
    },
  });
};
