import React from 'react';
import './App.css';
import Search from './Search';
import SearchResults from './SearchResults';
import Headlines from './Headlines';

export default function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Stock-Watch</h1>
      </header>
      <Search />
      <SearchResults />
      <Headlines />
      <footer className="App-footer"></footer>
    </div>
  );
};