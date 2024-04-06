import React from "react";
import "./NotFoundPage.style.css";
import { Link } from "react-router-dom";

const logoUrl = process.env.PUBLIC_URL + "/assets/netflix-logo.svg";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <img
        src={logoUrl}
        alt="Netflix Logo"
        id="navbar-logo"
        style={{ width: "300px", maxHeight: "90px" }}
      />
      <div className="not-found-text">404</div>
      <div>Page Not Found</div>
      <div>페이지를 찾을 수 없습니다.</div>
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  );
};

export default NotFoundPage;
