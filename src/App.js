import React, { Component } from 'react';
import Game from './Game';

export class App extends Component {
  state = {
    games: [],
    search: '',
    sort: '',
    genres: '',
    error: null
  }

  setSearch(search) {
    this.setState({
      search
    });
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  setGenre(genres) {
    this.setState({
      genres
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const baseUrl = 'http://localhost:8000/apps';
    const params = [];
    if (this.state.search) {
      params.push(`search=${this.state.search}`);
    }
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`)
    }
    if (this.state.genres) {
      params.push(`genres=${this.state.genres}`)
    }

    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    fetch (url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          games: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get games at this time.'
        })
      })
  }

  render() {
    const games = this.state.games.map((game, i) => {
      return <Game {...game} key={i} />
    })

    return (
      <main className="App">
        <h1>Play Store Best Sellers</h1>
        <div className="search">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="search">Search:  </label>
            <input 
              type="text" 
              name="search" 
              id="search"
              value={this.state.search}
              onChange={e => this.setSearch(e.target.value)}
            />

            <label htmlFor="sort">Sort:  </label>
            <select 
              name="sort" 
              id="sort"
              onChange={e => this.setSort(e.target.value)}
            >
              <option value="">None</option>
              <option value="Rating">Rating</option>
              <option value="App">Title</option>
            </select>

            <label htmlFor="genres">Genre: </label>
            <select 
              name="genres" 
              id="genres"
              onChange={e => this.setGenre(e.target.value)}  
            >
              <option value="">All</option>
              <option value="Action">Action</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Casual">Casual</option>
              <option value="Arcade">Arcade</option>
              <option value="Card">Card</option>
            </select>
            <button type="submit">Search</button>
          </form>
          <div className="App_error">{ this.state.error }</div>
        </div>
        { games }
      </main>
    )
  }
}

export default App;
