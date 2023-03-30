import "./App.css";
import Form from "./components/Form";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function App() {
  const [movieTitles, setMovieTitles] = useState([]);

  useEffect(() => {
    const URL = "http://127.0.0.1:5000/tmovi";
    axios
      .get(URL)
      .then((res) => {
        let topMoviesData = res.data;
        let movieTitles = Object.keys(topMoviesData.data);
        const movieTitleList = Object.values(movieTitles);
        setMovieTitles(movieTitleList);
        // console.log(movieTitleList)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Form movieTitleList={movieTitles} />
    </div>
  );
}

export default App;
