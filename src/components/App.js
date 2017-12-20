import React from "react";
import "./app.css";
import Search from "./Search";
import SearchResults from "./SearchResults";
import Headlines from "./Headlines";
import Footer from "./Footer";
import Header from "./Header";
import Intro from "./Intro";

export default function App(props) {
  return (
    <div className="App">
      <Header />
      <Intro />
      <main>
        <Search />
        <SearchResults />
        <Headlines />
      </main>
      <Footer />
    </div>
  );
}