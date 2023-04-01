import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function Card({ movieName }) {
  let [movieDetail, setMovieDetail] = useState([]);

  useEffect(() => {
    const lastIndex = movieName.lastIndexOf(" ");
    movieName = movieName.substring(0, lastIndex);
    let movieYear = movieName.substring(lastIndex);
    let movietName = movieName;
    const wlist = movieName.split(" ");
    // console.log(wlist.slice(-1) == "The");
    if (wlist.slice(-1) == "The" || wlist.slice(-1) == "the") {
      wlist.pop();
      movietName = "The " + wlist.join(" ");
    } else if (wlist.slice(-1) == "A" || wlist.slice(-1) == "a") {
      wlist.pop();
      movietName = "A " + wlist.join(" ");
    }
    console.log(movietName);

    const URL = "http://www.omdbapi.com/";
    const querystring = {
      apikey: "9d11efb1",
      t: movietName,
      y: movieYear,
      plot: "full",
    };
    // console.log("qs", querystring);
    axios
      .get(URL, { params: querystring })
      .then((response) => {
        setMovieDetail(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieName]);

  const CardForm = () => {
    if (movieDetail.Response == "False") {
      return <div>{/* <h1>Movie not found</h1> */}</div>;
    } else {
      return (
        <div className="card__cointainer">
          <div className="card__poster">
            <a
              href={`https://www.imdb.com/title/${movieDetail.imdbID}/`}
              target={"_blank"}
            >
              <img src={movieDetail.Poster} alt="movie poster" />
            </a>
          </div>
          <div className="card__details">
            <div className="card__title">
              <h1>{movieDetail.Title}</h1>
              <h5>{movieDetail.Year}</h5>
            </div>
            <div className="card__subinfo">
              <h5>{movieDetail.imdbRating}/10</h5>
              <h5>{movieDetail.Runtime}</h5>
            </div>
            <div className="card__body">
              <h5 className="card__genre">Genre: {movieDetail.Genre}</h5>
              <h5 className="card__director">
                Directed by: {movieDetail.Director}
              </h5>
              <h5 className="card__actors">Starring: {movieDetail.Actors}</h5>
            </div>
          </div>
          {/* <a
            href={`https://www.imdb.com/title/${movieDetail.imdbID}/`}
            target={"_blank"}
          >
            imdb
          </a> */}
        </div>
      );
    }
  };

  return <>{CardForm()}</>;
}

export default Card;
