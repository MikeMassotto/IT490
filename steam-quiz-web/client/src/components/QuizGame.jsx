import React, { useState, useEffect } from "react";
import { Socket } from "./../util/socket";
// Initialize the Socket.io client
const socket = Socket;

const QuizLobby = () => {
  // Set up state for the lobby ID and the player number
  const [lobbyId, setLobbyId] = useState("");
  const [playerNumber, setPlayerNumber] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    answers: [],
  });

  const [score, setScore] = useState(0);

  // Set up state for the form input fields
  const [newLobby, setNewLobby] = useState("");
  const [joinLobby, setJoinLobby] = useState("");

  // Set up the game_code event listener
  useEffect(() => {
    socket.on("connect", (data) => {
        console.log("I am connected!");
        socket.io.emit("test", "Test Data!");
    })

    socket.on("disconnect", () => {
        console.log("I've being disconnected");
    });

    socket.on("game_code", (lobby) => {
      setLobbyId(lobby);
      setNewLobby("");
    });

  // Set up the start_game event listener
    socket.on("start_game", (question) => {
      setCurrentQuestion(question);
      setScore(0);
    });

  // Set up the update_score event listener
    socket.on("update_score", (newScore) => {
      setScore(newScore);
    });

    socket.on("next_question", function(data) {
      console.log(data);
      const current = data.current_question;
      const question = data.questions[current];
      const test = {question: question.description, answers: question.answers};
      setCurrentQuestion(test);
    });
  }, []);

  // Event handler for creating a new game
  const createGame = (event) => {
    event.preventDefault();
    // Send a new_game event to the server
    socket.emit("new_game");
  };

  // Event handler for joining an existing game
  const joinGame = (event) => {
    event.preventDefault();

    // Send a join_game event to the server, along with the lobby ID
    socket.emit("join_game", joinLobby);

    // Listen for the init event from the server, which will contain the player number
    socket.on("init", (playerNum) => {
      setLobbyId(joinLobby);
      setPlayerNumber(playerNum);
      setJoinLobby("");
    });
  };

  // Event handler for starting the game
  const startGame = () => {
    console.log("Start game button clicked");
    // Send a start_game event to the server
    socket.emit("start_game");
  };

  const submitAnswer = (answer) => {
    // Send the answer to the server
    socket.emit("submit_answer", answer);
  };

  return (
    <div>
      {/* Form for creating a new game */}
      <form onSubmit={createGame}>
        <button type="submit">Create New Game</button>
      </form>

      {/* Form for joining an existing game */}
      <form onSubmit={joinGame}>
        <input
          type="text"
          value={joinLobby}
          onChange={(e) => setJoinLobby(e.target.value)}
        />
        <button type="submit">Join Game</button>
      </form>

      {/* Display the lobby ID and player number */}
      <div>Lobby ID: {lobbyId}</div>
      <div>Player Number: {playerNumber}</div>

      {/* Button for starting the game (only visible if the player has joined a lobby) */}
      {lobbyId && <button onClick={startGame}>Start Game</button>}

      {/* Display the current question or a waiting message */}
      {currentQuestion.question ? (
        <div>{currentQuestion.question}</div>
      ) : (
        <div>Please wait for the game to start</div>
      )}
      <div className="flex flex-col">
      {/* Display the answer choices or a waiting message */}
      {currentQuestion.answers.length > 0 ? (
        currentQuestion.answers.map((answer, index) => (
          <button key={index} onClick={() => submitAnswer(answer)}>
            {answer}
          </button>
        ))
      ) : (
        <div>Please wait for the game to start</div>
      )}
      </div>

      {/* Display the player's score */}
      <div>Score: {score}</div>
    </div>
  );
};

export default QuizLobby;
