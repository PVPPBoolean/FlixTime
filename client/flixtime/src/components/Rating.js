import React from "react";
import Card from "./Card";

function Rate({ k, page, movieRating, setMovieRating }) {
  return (
    <div>
      <label>
        User {k + 1}, rate the movie {page} (between 1 and 5):
      </label>
      <input
        type="number"
        min="1"
        max="5"
        placeholder="enter a number between 1 and 5"
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

function Rating({movieName, groupSize, page, movieRating, setMovieRating }) {
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
  return <div>
    <Card movieName={movieName[page-1]}/>
    {/* <Card movieName="Birdcase The (1987)"/> */}

    {rates}</div>;
}

export default Rating;
