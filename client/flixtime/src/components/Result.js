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
        `https://manishjalui11.pythonanywhere.com/result?movieRating=${movieRating}&groupSize=${groupSize}&page=${page}&movieName=${movieName}`
      )
      .then((res) => {
        setResultMovies(res.data.recs);
        console.log(res.data.recs);
      })
      .catch((err) => {
        console.log(err.message);
        setResultMovies(err.message);
      })
      .finally(() => {
        console.log("Request completed");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieRating, groupSize]);

  return (
    <>
      <div className="footer-container">
        <h1>FlixTime recommendes you to watch:</h1>
        <div className="navbar">
          <div className="form-footer">
            <button
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <box-icon
                  name="chevron-left"
                  type="solid"
                  color="#5baab0"
                ></box-icon>
                Prev
              </div>
            </button>
            <button
              onClick={() => {
                setPage(0);
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                Home
                <box-icon name="home" type="solid" color="#5baab0"></box-icon>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="recc">
        {resultMovies == "Request failed with status code 500" ? (
          <>
            {/* <h1>No movies found</h1> */}
            <div class="flex-container">
              <div class="text-center">
                <h1>
                  <span class="fade-in" id="digit1">
                    4
                  </span>
                  <span class="fade-in" id="digit2">
                    0
                  </span>
                  <span class="fade-in" id="digit3">
                    4
                  </span>
                </h1>
                <h3 class="fadeIn">NO MOVIES FOUND</h3>
                <h6>Please rate the movies properly.</h6>
                <h6>OR</h6>
                <h6>Try refreshing the webpage.</h6>
              </div>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
}

export default Result;
