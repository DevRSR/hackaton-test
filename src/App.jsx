import { useState } from "react";
import { StartScreen, PlayScreen } from "./Screens";

function App() {
  const [gameState, setGameState] = useState("start");

  switch (gameState) {
    case "start":
      return (
        <>
          <PlayScreen end={() => setGameState("start")} />
          <StartScreen start={() => setGameState("play")} />
        </>
      );
    case "play":
      return;

    default:
      throw new Error("Invalid game state " + gameState);
  }
}

export default App;
