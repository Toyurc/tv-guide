import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { ReactComponent as SearchIcon } from "../../assets/svg/seacrIcon.svg";

import "./searchPage.scss";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(false);

  const history = useHistory();

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
    }
  };

  return (
    <section>
      <div className="container">
        <h2 className="heading">Hi there! search for your favourite shows</h2>
        <form
          onSubmit={(e) => {
            submitForm(e);
          }}
        >
          <div className={`searchBox ${error ? "searchBox-error" : ""}`}>
            <SearchIcon />
            <input
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              type="search"
              value={searchTerm}
              className="input-box"
              id="site-search"
              aria-label="Search for your favourite shows"
            />
          </div>
          <button className="button" type="submit">
            Find {searchTerm}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchPage;
