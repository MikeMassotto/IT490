import GameWindow from "../components/GameWindow";
import Quiz from "../components/Quiz";
import { QuizProvider } from "../contexts/quiz";
//<canvas id="canvas" className="w-full h-full"></canvas>
const Game = () => {
  return (
    <div className="">
      <div className="grid w-screen grid-cols-1 p-6 md:grid-cols-2 lg:grid-cols-5 2xl:grid-cols-5">
        <div className="flex justify-center border-2 border-gray-300 rounded-xl col-span-4 aspect-video">

          
          <QuizProvider>
              <Quiz />
            </QuizProvider>
        </div>
        <div className="flex justify-center border-2 border-gray-300 rounded-xl">
          <div className="bg-black w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Game;
