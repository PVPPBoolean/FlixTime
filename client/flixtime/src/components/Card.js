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
      apikey: "ffb5753f",
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
              rel="noreferrer"
            >
              <img
                src={movieDetail.Poster}
                alt="movie poster"
                onError={(e) => {
                  e.target.src =
                    "https://cdn.discordapp.com/attachments/999382322539405413/1096429016199741461/http-404-user-interface-design-design-removebg-preview_1.png";
                }}
              />
            </a>
          </div>
          <div className="card__details">
            <div className="card__title">
              <h1>{movieDetail.Title}</h1>
              <h5>{movieDetail.Year}</h5>
            </div>
            <div className="card__subinfo">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                <box-icon name="star" type="solid" color="#656565"></box-icon>
                {/* <box-icon name="calendar-star" color="#585656"></box-icon>{" "} */}
                <h5>{movieDetail.imdbRating}/10</h5>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                <box-icon
                  name="time-five"
                  type="solid"
                  color="#656565"
                ></box-icon>
                <h5>{movieDetail.Runtime}</h5>
              </div>
            </div>
            <div className="card__body">
              <h5 className="card__genre">
                <b>Genre: </b>
                {movieDetail.Genre}
              </h5>
              <h5 className="card__director">
                <b>Directed By: </b>
                {movieDetail.Director}
              </h5>
              <h5 className="card__actors">
                <b>Starring: </b>
                {movieDetail.Actors}
              </h5>
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
