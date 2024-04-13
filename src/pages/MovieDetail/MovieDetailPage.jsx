import React from "react";
import { useParams } from "react-router-dom";
import {
  useMovieCreditsQuery,
  useMovieDetailsQuery,
} from "../../hooks/useMovieDetails";
import "./MovieDetailPage.style.css";
import MovieReview from "./components/MovieReview/MovieReview";
import { useMovieReviewsQuery } from "./../../hooks/useMovieReviews";

const MovieDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useMovieDetailsQuery({
    movie_id: id,
  });
  console.log("detail", data);

  const { data: credits } = useMovieCreditsQuery({ movie_id: id });
  const { data: reviews } = useMovieReviewsQuery({ movie_id: id });
  console.log("rr", reviews);

  const directorList = credits?.crew.filter(
    (person) => person.job === "Director"
  );
  const mainActorList = credits?.cast.slice(0, 4);
  console.log(directorList, mainActorList);

  const voteAverageFormatted = (
    Math.round(data?.vote_average * 10) / 10
  ).toFixed(1);

  return (
    <div>
      <div className="movie-info">
        {/* <div
          style={{
            backgroundImage: `url(https://media.themoviedb.org/t/p/w440_and_h660_face/${data?.backdrop_path})`,
          }}
          className="movie-detail-background"
        /> */}
        <div
          style={{
            backgroundImage: `url(https://media.themoviedb.org/t/p/w440_and_h660_face/${data?.poster_path})`,
          }}
          className="movie-detail-poster"
        />
        <h4>
          {data?.title} ({data?.release_date.slice(0, 4)})
        </h4>
        <div>Genre: {data?.genres.map((item) => item.name).join(", ")}</div>
        <div>
          Director: {directorList?.map((director) => director.name).join(", ")}
        </div>
        <div>
          Main Actors: {mainActorList?.map((actor) => actor.name).join(", ")}
        </div>
        <div>Runtime: {data?.runtime}</div>
        <div>Rating: ⭐{voteAverageFormatted}</div>
        <div>Overview: {data?.overview}</div>
      </div>
      <div>
        {reviews?.map((review) => (
          <MovieReview key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default MovieDetailPage;
