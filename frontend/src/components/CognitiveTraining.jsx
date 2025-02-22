import { Link } from "react-router-dom";

const CognitiveTraining = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <h1 className="text-xl font-medium text-gray-800 mb-6">Cognitive Training</h1>

      <div className="w-full h max-w-sm ">
        <Link to="/tictactoe">
          <button className="w-full my-4 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
            Tic Tac Toe
          </button>
        </Link>

        <Link to="/game2048">
          <button className="w-full my-4 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
            2048
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CognitiveTraining;
