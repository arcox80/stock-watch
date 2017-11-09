import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import Headlines from './components/Headlines';

class App extends Component {
  render() {
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
  }
}

export default App;
