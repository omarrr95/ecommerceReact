import React from "react";

function Home() {
  return (
    <div className="home">
      <div className="card text-bg-dark border-0 rounded-0">
        <img
          src="https://brand-store.surge.sh/images/home.jpg"
          className="card-img"
          alt="alt text"
        />
        <div className="card-img-overlay d-flex flex-column justify-content-center ">
          <div className="container text-uppercase">
            <h5 className="card-title display-3 fw-bold">New Season Arrival</h5>
            <p className="card-text fs-2">Check Out All The Trends</p>
            <p className="card-text"></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
