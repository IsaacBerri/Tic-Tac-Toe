import { useState } from "react";
import "./App.css";

const TURNS = {
  X: "X",
  O: "O",
};

const WINER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

const Square = ({ children, active, updateBoard, posicion }) => {
  const className = `square ${active ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(posicion);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turno, setTurno] = useState(TURNS.X);
  const [winer, setWiner] = useState(false);

  const checkWinner = (checkBoard) => {
    for (const combos of WINER_COMBOS) {
      const [a, b, c] = combos;

      if (
        checkBoard[a] &&
        checkBoard[a] === checkBoard[b] &&
        checkBoard[a] === checkBoard[c]
      ) {
        setWiner(true);
      }
    }
  };

  const updateBoard = (index) => {
    const newBoard = [...board];
    if (newBoard[index] || winer) return;
    newBoard[index] = turno;
    setBoard(newBoard);
    const newTurn = turno === TURNS.X ? TURNS.O : TURNS.X;
    setTurno(newTurn);
    checkWinner(newBoard);
  };

  // const handleReset = () => {
  //   setBoard(Array(9).fill(null));
  //   setTurno(TURNS.X);
  // };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <div className="game">
        {board.map((_, index) => {
          return (
            <Square updateBoard={updateBoard} posicion={index} key={index}>
              {_}
            </Square>
          );
        })}
      </div>
      <section className="turn">
        <Square active={turno === "X"}>{TURNS.X}</Square>
        <Square active={turno === "O"}>{TURNS.O}</Square>
      </section>
      {winer === false ? null : (
        <section className="winner">
          <div className="text">
            <h2>{winer == false ? "Empate" : "Ganó"}</h2>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
