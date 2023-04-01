import React, { useState } from "react";
import Rating from "./Rating";
import FirstPage from "./FirstPage";
import Result from "./Result";

function Form({ movieTitleList }) {
  // const [movieTitles, setMovieTitles] = useState([]);

  // useEffect(() => {
  //   const URL = "http://127.0.0.1:5000/tmovi"
  //   axios.get(URL)
  //   .then((res) => {
  //     let topMoviesData = res.data
  //     let movieTitles = Object.keys(topMoviesData.data)
  //     const movieTitlesList = Object.values(movieTitles)
  //     setMovieTitles(movieTitlesList)
  //   }
  //   )
  //   .catch((err) => {
  //     console.log(err)
  //   }
  //   )

  // }, []);

  const [page, setPage] = useState(0);
  const maxGroupSize = 8;

  const FormTitles = [
    "FirstPage",
    ...movieTitleList,
    // "hello",
    // "cat",
    // "pussy",
    "Result",
  ];
  const [groupSize, setGroupSize] = useState(2);
  const [movieRating, setMovieRating] = useState(
    Array(maxGroupSize)
      .fill(null)
      .map(() => Array(12 - 2).fill(0))
  );

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <FirstPage
          groupSize={groupSize}
          setGroupSize={setGroupSize}
          maxGroupSize={maxGroupSize}
          page={page}
          setPage={setPage}
        />
      );
    } else if (page === FormTitles.length - 1) {
      return (
        <Result
          movieRating={movieRating}
          groupSize={groupSize}
          page={page}
          setPage={setPage}
          movieName={FormTitles.slice(1, -1)}
        />
      );
    } else
      return (
        <Rating
          movieName={FormTitles.slice(1, -1)}
          groupSize={groupSize}
          page={page}
          setPage={setPage}
          movieRating={movieRating}
          setMovieRating={setMovieRating}
          FormTitles={FormTitles}
        />
      );
  };

  return (
    <div className="form">
      <div className="progressbar"></div>
      <div className="form-cointainer" style={{ position: "relative" }}>
        <div className="form-header">{/* <h1>{FormTitles[page]}</h1> */}</div>
        <div className="form-body">{PageDisplay()}</div>
      </div>
    </div>
  );
}

export default Form;
