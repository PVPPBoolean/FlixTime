import React from "react";
import Card from "./Card";

function Rate({ k, page, movieRating, setMovieRating }) {
  return (
    <div className="rate__cointainer">
      <p>USER {k + 1} :</p>
      <input
        type="number"
        min="1"
        max="5"
        placeholder="rate"
        // value={movieRating[k][page - 1]}
        onChange={(e) => {
          setMovieRating(() => {
            movieRating[k][page - 1] = parseInt(e.target.value);
            return movieRating;
          });
        }}
      ></input>
    </div>
  );
}

function Rating({
  movieName,
  groupSize,
  page,
  setPage,
  movieRating,
  setMovieRating,
  FormTitles,
}) {
  const rates = [];

  for (let index = 0; index < groupSize; index++) {
    rates.push(
      <Rate
        key={index}
        k={index}
        page={page}
        movieRating={movieRating}
        setMovieRating={setMovieRating}
      />
    );
  }
  return (
    <div className="ratings__cointainer">
      <div className="ratings__left">
        <h1>Rate the movie</h1>
        <div className="rates">{rates}</div>
        <div className="form-footer">
          <button
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Prev
          </button>
          <button
            onClick={() => {
              setPage((currPage) => currPage + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
      <div className="ratings__right">
        <Card movieName={movieName[page - 1]} />
      </div>
    </div>
  );
}

export default Rating;
