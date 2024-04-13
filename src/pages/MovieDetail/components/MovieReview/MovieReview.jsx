import React, { useState } from "react";
import "./MovieReview.style.css";

const MovieReview = ({ review }) => {
  const contentWordLimit = 80;

  const [isExpanded, setIsExpanded] = useState(false);

  const limitContent = (content) => {
    let resultContent = "";
    if (content.split(" ").length < contentWordLimit) {
      resultContent = content;
    } else {
      resultContent =
        content.split(" ").slice(0, contentWordLimit).join(" ") + " ......";
    }
    return resultContent;
  };

  const toggleContentLength = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div>-------------------------------------------------------</div>
      <div>{review.author}</div>
      {review.content.split(" ").length >= contentWordLimit ? (
        <div>
          {isExpanded ? (
            <div
              dangerouslySetInnerHTML={{
                __html: review.content,
              }}
              className={isExpanded ? "" : "invisible"}
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: limitContent(review.content),
              }}
              className={isExpanded ? "invisible" : ""}
            />
          )}
          <button onClick={toggleContentLength}>
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        </div>
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: review.content,
          }}
        />
      )}
      <div>-------------------------------------------------------</div>
    </div>
  );
};

export default MovieReview;

// import React from "react";
// import { useMovieReviewsQuery } from "./../../../hooks/useMovieReviews";

// const MovieReview = ({ id }) => {
//   const { data: reviews } = useMovieReviewsQuery({ movie_id: id });
//   const reviewContentWordLimit = 100;

// const limitContent = (content) => {
//   let resultContent = "";
//   if (content.split(" ").length < reviewContentWordLimit) {
//     resultContent = content;
//   } else {
//     resultContent = content
//       .split(" ")
//       .slice(0, reviewContentWordLimit)
//       .join(" ");
//   }

//     return resultContent;
//   };

//   let longContentClass = "";
//   let shortContentClass = "invisible";

//   const toggleContentLength = () => {
//     if (longContentClass === "invisible") {
//       longContentClass = "";
//       shortContentClass = "invisible";
//     } else {
//       longContentClass = "invisible";
//       shortContentClass = "";
//     }
//   };

//   return (
//     <div className="movie-reviews">
//       {reviews?.map((review) => (
//         <div key={review.id}>
//           <div>{review.author}</div>
// {review.content.split(" ").length >= reviewContentWordLimit ? (
//   <div>
//     <div className={shortContentClass}>
//       <div
//         dangerouslySetInnerHTML={{
//           __html: limitContent(review.content),
//         }}
//       />
//       <button onClick={toggleContentLength}>more</button>
//     </div>
//     <div className={longContentClass}>
//       <div
//         dangerouslySetInnerHTML={{
//           __html: review.content,
//         }}
//       />
//       <button onClick={toggleContentLength}>less</button>
//     </div>
//   </div>
// ) : (
//   <div
//     dangerouslySetInnerHTML={{
//       __html: review.content,
//     }}
//   />
// )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MovieReview;
