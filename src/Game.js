import React from 'react'

const Game = (props) => {
  return (
    <div className="Game">
      <h2>{props.App}</h2>
      <div className="Game-details">
        Genre: {props.Genres}
        <br/>
        Play Store Rating: {props.Rating}
      </div>
    </div>
  )
}

export default Game
