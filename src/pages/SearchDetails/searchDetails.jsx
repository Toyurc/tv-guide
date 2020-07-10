import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Loader from "../../components/Loader/index";
import { ReactComponent as SearchIcon } from "../../assets/svg/seacrIcon.svg";

import { strip } from "../../helpers/index";

import "./searchDetails.scss";

const SearchDetails = () => {
  const { searchterm } = useParams();

  const [searchTerm, setSearchTerm] = useState(searchterm);
  const [responseObject, setResponseObject] = useState({});
  const [episodesArray, setEpisodesArray] = useState([]);
  const [order, setOrder] = useState('ascending');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);  

  const history = useHistory();

  const getShows = (data) => {
    setLoading(true);
    Axios.get(
      `https://api.tvmaze.com/singlesearch/shows/?q=${data}&embed=episodes`
    )
      .then((response) => {
        setError(false);
        setLoading(false);
        setResponseObject(response.data);
        setEpisodesArray(response.data._embedded.episodes);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };

  // FIXME: This doesn't re-render in real time, I am guessing its cos of the size of the array
  useEffect(() => {
    order === "descending" && setEpisodesArray(episodesArray.reverse());
  }, [order]);

  useEffect(() => {
    getShows(searchTerm);
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    const isEmpty = /^[ \t\n]*$/.test(searchTerm);
    if (isEmpty) {
      return;
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
        </form>
      </nav>
      <>
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="no-movie">
            <h1>ooops!</h1>
            <h3>sorry we can't find {searchterm}</h3>
            <h4>search for another show</h4>
          </div>
        ) : (
          <div className="shows-container">
            <div className="shows-wrapper">
              <div className="image-wrapper">
                <img
                  src={responseObject?.image?.original}
                  alt={responseObject?.name}
                />
              </div>
              <div className="show_details">
                <h2 className="heading--2">{responseObject?.name}</h2>
                <p className="show_details-summary ">
                  {strip(responseObject.summary)}
                </p>
                <p className="show_details-summary">
                  Language: {strip(responseObject.language)}
                </p>
                <p className="show_details-summary">
                  Genres:{" "}
                  {responseObject?.genres?.map((genre, index) => (
                    <span key={index}>{genre},&nbsp;</span>
                  ))}
                </p>
                <p className="show_details-summary">
                  Ratings: {responseObject?.rating?.average}
                </p>
                <a
                  href={responseObject.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="show_details-summary link"
                >
                  Official Website
                </a>
                <p className="show_details-summary">
                  Premiered: {responseObject.premiered}
                </p>
                <p className="show_details-summary">
                  Status: {responseObject.status}
                </p>
                <p className="show_details-summary">
                  Country: {responseObject?.network?.country?.name}
                </p>
              </div>
            </div>
            <div className="episodes_details">
              <h1 className="heading--2">Episodes</h1> 
              <form>
                <select onChange={(e) => setOrder(e.target.value)}>
                  <option value="ascending">Top - Bottom</option>
                  <option value="descending">Bottom - Top</option>
                </select>
              </form>
              <>
                {episodesArray?.map((episodes, index) => (
                  <div className="card" key={index}>
                    <h3>
                      Season: {episodes?.season} Episode: {episodes?.number}
                    </h3>
                    <div className="episodes_details-card">
                      <div className="episodes_details-card--image">
                        <img
                          src={episodes?.image?.original}
                          alt={episodes.name}
                        />
                      </div>
                      <div className="episodes_details-card--text">
                        <p>{strip(episodes.summary)}</p>
                      </div>
                    </div>
                    <h3>
                      Aired: {episodes?.airdate} {episodes?.airtime} Duration: {episodes?.runtime} mins
                    </h3>
                    <h3>
                      Link:{" "} {episodes?._link?.self?.href}
                      <a 
                        className="link" href={episodes?._links?.self?.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        here
                      </a>
                    </h3>
                  </div>
                ))}
              </>
            </div>
          </div>
        )}
      </>
    </section>
  );
};

export default SearchDetails;
