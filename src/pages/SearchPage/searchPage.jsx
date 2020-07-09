import React, { useState } from "react";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section>
      <div>
        <h4>Hi there! search for your favourite shows</h4>
        <form method="POST">
          <input
            onChange={(e) => {setSearchTerm(e.target.value)}}
            type="search"
            value={searchTerm}
            id="site-search"
            name="q"
            aria-label="Search for your favourite shows"
          />
          <button type="submit">Find {searchTerm}</button>
        </form>
      </div>
    </section>
  );
};

export default SearchPage;
