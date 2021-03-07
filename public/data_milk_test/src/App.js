import React from 'react';
import './App.css';
import Home from "./Home";
import TopTen from "./TopTen";


function App() {
  return (
    <div className="page">
      <ul className="nav nav-pills my-3" id="tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active naw-btn mx-8"
            id="home-tab"
            data-bs-toggle="pill"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Home
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link naw-btn mx-8"
            id="top-ten-tab"
            data-bs-toggle="pill"
            data-bs-target="#top-ten"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Top 10
          </button>
        </li>
      </ul>
      <div className="tab-content" id="tabContent">
        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
          <Home />
        </div>
        <div className="tab-pane fade" id="top-ten" role="tabpanel" aria-labelledby="top-ten-tab">
          <TopTen />
        </div>
      </div>
      <footer>
        <p>© 2021 Creator Name. Nunc velit egestas diam sapien faucibus parturient.</p>
      </footer>
    </div>
  );
}

export default App;
