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
        <div>
          {/* <img src={movieDetail.Poster} alt="movie poster" /> */}
          <h1>{movieDetail.Title}</h1>
          <h5>{movieDetail.Released}</h5>
          <h5>{movieDetail.imdbRating}</h5>
          <a
            href={`https://www.imdb.com/title/${movieDetail.imdbID}/`}
            target={"_blank"}
          >
            imdb
          </a>
        </div>
      );
    }
  };

  return <>{CardForm()}</>;
}

export default Card;
