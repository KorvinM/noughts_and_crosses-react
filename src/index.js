import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

 /* a function component owns no state; a render method */
function Square(props){
  return (
    <button className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,//X moves 1st by default
    };
  }

  handleClick(i){
    /*create a copy of the squares array, and treat it as immutable*/
    //https://reactjs.org/tutorial/tutorial.html#why-immutability-is-important
    const squares = this.state.squares.slice();
    /*if a winner, or if a Square is already filled, ignore click & return early*/
    if (calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares:squares,
      /*flip xIsNext's boolean state*/
      xIsNext: !this.state.xIsNext,
    });
  }
  renderSquare(i) {
    return(//parenthesis prevent js from adding a ; on linebreak
      <Square
        value={this.state.squares[i]}
        onClick={()=> this.handleClick(i)}
      />);
  }

  render() {
    //const status = 'Next player: ' + (this.state.xIsNext ? 'X' : '0');
    const winner = calculateWinner(this.state.squares);
    let statusFlag;
    let status;
    if (winner){
      statusFlag = 'Winner: ';
      status = winner;
    }else{
      statusFlag = 'Next player: ';
      status = (this.state.xIsNext ? 'X' : '0');
    }
    return (
      <div>
        <div className="status">{statusFlag}<span>{status}</span></div>
        <div className="game-grid">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
      <h2 className="game-name">Tic Tac Toe</h2>
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



//helper function called in Board:render
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


//lets try adding something to the footer


/* a function component
 * has no state, only a render method */

function Footer(props) {
    return (
      <>
      <div className="credits">
        <p>A project by <a href="https://media.korvin.org">Korvin M Media</a></p>
        <p className="source">
          <a href="https://githum.com/KorvinM">
          Source code</a>
        </p>
      </div>
      </>
    );
}

ReactDOM.render(
  <Footer />,
  document.getElementById('footer'),
);
ReactDOM.render(
  <Game />,
  document.getElementById('ttt')
);
