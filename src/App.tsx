import "./App.css";
import React, { useState } from "react";

import NasdakShares from "./Components/NasdakShares";
import FooterComponent from "./shared/FooterComponent";
import NavbarComponent from "./shared/NavbarComponent";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <div className="app-container">
      <NavbarComponent onSearch={handleSearch} />
      <div className="main-content">
        <NasdakShares searchQuery={searchQuery} />
      </div>
      <FooterComponent />
    </div>
  );
}

export default App;
