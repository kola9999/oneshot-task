import React from "react";
import "../css/header.css";
function Header() {
  return (
    <div className="header">
      <div className="header_logo">
        <h3>Task by OneShot</h3>
      </div>
      <div className="header_logo">
        <h2>CollegeDB</h2>
      </div>
      <div className="header_logo">
        <a href="https://reddynagendrakola.study/">by Reddy Nagendra Kola</a>
      </div>
    </div>
  );
}

export default Header;
