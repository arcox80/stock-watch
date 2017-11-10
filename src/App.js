import React from 'react';
import './App.css';
import Search from './components/Search';
//import SearchResults from './components/SearchResults';
//import Headlines from './components/Headlines';

export default function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Stock-Watch</h1>
      </header>
      <Search />
      <footer className="App-footer"></footer>
    </div>
  );
};