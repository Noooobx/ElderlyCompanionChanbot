import { Link } from "react-router-dom";
import TickTakToe from "./TickTakToe";

const CognitiveTraining = () => {
  return (
    <div>
      <Link to={"/tictactoe"}>
        <button>Tic Tac Toe</button>
      </Link>
      <Link to={"/game2048"}>
        <button>2048</button>
      </Link>
    </div>
  );
};

export default CognitiveTraining;
