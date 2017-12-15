import React from "react";
import "./app.css";
import Search from "./Search";
import SearchResults from "./SearchResults";
import Headlines from "./Headlines";
import Footer from "./Footer";

export default function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <span className="App-title">Stock-Watch</span>
      </header>
      <main>
        <Search />
        <SearchResults />
        <Headlines />
      </main>
      <Footer />
    </div>
  );
}