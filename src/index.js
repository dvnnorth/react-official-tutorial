import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Square = props => (
  <button className="square" onClick={props.handleSquareClick}>
    {props.value}
  </button>
);

class Board extends React.Component {
  state = {
    player: "X",
    board: Array(9).fill(null)
  };

  changePlayer = currentPlayer =>
    this.setState({ player: currentPlayer === "X" ? "O" : "X" });

  handleSquareClick = index => {
    if (this.state.board[index] === null) {
      this.setState({
        board: (() => {
          const newBoard = [...this.state.board];
          newBoard[index] = this.state.player;
          return newBoard;
        })()
      });
      this.changePlayer(this.state.player);
    }
  };

  renderSquare(i) {
    return (
      <Square
        value={this.state.board[i]}
        handleSquareClick={() => this.handleSquareClick(i)}
      />
    );
  }

  render() {
    const status = `Next player: ${this.state.player === "X" ? "O" : "X"}`;

    return (
      <div>
        <div className="status">{status}</div>
        {[0, 1, 2].map((i, _, arr) => (
          <div className="board-row">
            {arr.map(j => this.renderSquare(j + 3 * i))}
          </div>
        ))}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
