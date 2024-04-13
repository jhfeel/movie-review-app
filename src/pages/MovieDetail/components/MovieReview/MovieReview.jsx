import React, { useState } from "react";
import "./MovieReview.style.css";

const MovieReview = ({ review }) => {
  const contentWordLimit = 50;

  const [isExpanded, setIsExpanded] = useState(false);

  const limitContent = (content) => {
    let resultContent = "";
    if (content.split(" ").length < contentWordLimit) {
      resultContent = content;
    } else {
      resultContent =
        content.split(" ").slice(0, contentWordLimit).join(" ") + " ...";
    }
    return resultContent;
  };

  const toggleContentLength = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="movie-review">
      <span className="author-box">{review.author}</span>
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
          <button onClick={toggleContentLength} className="toggle-button">
            {isExpanded ? "Show less" : "Show more"}
          </button>
        </div>
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: review.content,
          }}
        />
      )}
    </div>
  );
};

export default MovieReview;
