import { useState } from "react";
import "./App.css";

const TURNS = {
  X: "X",
  O: "O"
};

const Square = ({ children, active, updateBoard, posicion }) => {

  const className = `square ${active ? "is-selected" : ""}`

  const handleClick = () => {
    updateBoard(posicion)
  }

  return <div onClick={handleClick} className={className}>{children}</div>;
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turno, setTurno] = useState(TURNS.X);

  const updateBoard = (index) => {
    const newBoard = [...board]
    newBoard[index] = turno
    console.log(newBoard);
    setBoard(newBoard)
    const newTurn = turno === TURNS.X ? TURNS.O : TURNS.X
    setTurno(newTurn)
  };

  return (
    <main className="board">
      <h1>Hola mundo</h1>
      <div className="game">
        {board.map((_, index) => {
          return <Square updateBoard={updateBoard} posicion={index} key={index}>{_}</Square>;
        })}
      </div>
      <section className="turn">
      <Square active={turno === "X"}>{TURNS.X}</Square>
      <Square active={turno === "O"}>{TURNS.O}</Square>
      </section>
      
    </main>
  );
}

export default App;
