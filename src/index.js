import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const calculateWinner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Square = props => (
  <button className="square" onClick={props.handleSquareClick}>
    {props.value}
  </button>
);

const Board = props => {
  const renderSquare = i => {
    return (
      <Square
        key={i}
        value={props.board[i]}
        handleSquareClick={() => props.handleSquareClick(i)}
      />
    );
  };

  return (
    <div>
      {[0, 1, 2].map((i, _, arr) => (
        <div className="board-row" key={i}>
          {arr.map(j => renderSquare(j + 3 * i))}
        </div>
      ))}
    </div>
  );
};

class Game extends React.Component {
  state = {
    player: "X",
    history: [
      {
        board: Array(9).fill(null)
      }
    ]
  };

  handleSquareClick = index => {
    const history = this.state.history;
    const current = history[history.length - 1];
    if (current.board[index] === null && !calculateWinner(current.board)) {
      const newHistory = [...history];
      const newBoard = [...current.board];
      newBoard[index] = this.state.player;
      newHistory.push({
        board: newBoard
      });
      this.setState({
        history: newHistory
      });
      this.changePlayer(this.state.player);
    }
  };

  reset = () =>
    this.setState({ player: "X", history: [{ board: Array(9).fill(null) }] });

  changePlayer = () =>
    this.setState({ player: this.state.player === "X" ? "O" : "X" });

  jumpTo = move => {
    const newHistory = this.state.history.slice(0, move + 1);
    this.setState({ history: newHistory });
  };

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.board);
    const status = winner
      ? "Winner: " + winner
      : `Next player: ${this.state.player === "X" ? "O" : "X"}`;
    const moves = history.map((step, move) => {
      const description = move ? `Go to move #${move}` : `Go to game start`;
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{description}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            board={current.board}
            handleSquareClick={this.handleSquareClick}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <button style={{ marginTop: "10px" }} onClick={this.reset}>
            Reset Game
          </button>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
