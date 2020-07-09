import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../assets/svg/seacrIcon.svg";

import "./searchDetails.scss";

const SearchDetails = () => {
  const { searchterm } = useParams();

  const [searchTerm, setSearchTerm] = useState(searchterm);
  const [error, setError] = useState(false);

  const history = useHistory();

  const getShows = (data) => {
    Axios.get(
      `https://api.tvmaze.com/singlesearch/shows/?q=${data}&embed=episodes`
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        
        setError(true);
      });
  }

  useEffect(() => {
    getShows(searchTerm);
    // return () => {
    //   effect
    // };
  }, [searchTerm]);

  const submitForm = (e) => {
    e.preventDefault();
    const isEmpty = /^(\w+\S+)$/.test(searchTerm);
    if (!isEmpty) {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      history.push(`/show=${searchTerm}`);
      getShows(searchTerm);
    }
  };

  return (
    <section className="details-section">
      <nav className="input-nav">
        <div></div>
        <form
          onSubmit={(e) => {
            submitForm(e);
          }}
        >
          <div className="search-input">
            <input
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              type="search"
              value={searchTerm}
              className="search-input--box"
              id="site-search"
              aria-label="Search for your favourite shows"
            />
            <button type="submit">
              <SearchIcon />
            </button>
          </div>
          {/* <div></div> */}
        </form>
      </nav>
      {error ? (
        <div className="no-movie">
          <h1>ooops!</h1>
          <h3>sorry we can't find {searchterm}</h3>
          <h4>search for another show</h4>
        </div>
      ) : (
        <h2>we heere</h2>
      )}
    </section>
  );
};

export default SearchDetails;
