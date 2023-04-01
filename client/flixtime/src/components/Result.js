import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Card from "./Card";

function Result({ movieRating, groupSize, page, setPage, movieName }) {
  let [resultMovies, setResultMovies] = useState({});

  useEffect(() => {
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .get(
        `http://127.0.0.1:5000/result?movieRating=${movieRating}&groupSize=${groupSize}&page=${page}&movieName=${movieName}`
      )
      .then((res) => {
        setResultMovies(res.data.recs);
        console.log(res.data.recs);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Request completed");
      });
  }, [movieRating, groupSize]);

  return (
    <div>
      <h3>FlixTime recommendes you to watch:</h3>
      <ul>
        {Object.entries(resultMovies).map((resMov) => (
          <li>
            <ul key={resMov}>
              {resMov.map((item, index) => (
                <Card movieName={item} key={index} />
              ))}
            </ul>
          </li>
        ))}
      </ul>
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
            setPage(0);
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default Result;
