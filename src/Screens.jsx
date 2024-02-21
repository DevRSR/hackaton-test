import { useState } from "react";
import confetti from "canvas-confetti";
import * as icons from "react-icons/gi";
import { Tile } from "./Tile";

export const possibleTileContents = [
  icons.GiHearts,
  icons.GiWaterDrop,
  icons.GiDiceSixFacesFive,
  icons.GiUmbrella,
  icons.GiCube,
  icons.GiBeachBall,
  icons.GiDragonfly,
  icons.GiHummingbird,
  icons.GiFlowerEmblem,
  icons.GiOpenBook,
];

export function StartScreen({ start }) {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col justify-center items-center bg-pink-50 h-2/3 w-80 rounded-md">
        <h1 className="text-2xl text-center font-bold font-sans text-pink-500 mb-4">
          Memory
        </h1>

        <p className="text-sm text-pink-500 font-sans">
          Flip over tiles looking for pairs
        </p>
        <button
          onClick={start}
          className="bg-pink-500 text-white py-1 px-10 rounded-full mt-12 shadow-md shadow-inner hover:bg-pink-600"
        >
          Play
        </button>
      </div>
    </div>
  );
}

export function PlayScreen({ end }) {
  const [tiles, setTiles] = useState(null);
  const [tryCount, setTryCount] = useState(0);

  const getTiles = (tileCount) => {
    // Throw error if count is not even.
    if (tileCount % 2 !== 0) {
      throw new Error("The number of tiles must be even.");
    }

    // Use the existing list if it exists.
    if (tiles) return tiles;

    const pairCount = tileCount / 2;

    // Take only the items we need from the list of possibilities.
    const usedTileContents = possibleTileContents.slice(0, pairCount);

    // Double the array and shuffle it.
    const shuffledContents = usedTileContents
      .concat(usedTileContents)
      .sort(() => Math.random() - 0.5)
      .map((content) => ({ content, state: "start" }));

    setTiles(shuffledContents);
    return shuffledContents;
  };

  const flip = (i) => {
    // Is the tile already flipped? We don’t allow flipping it back.
    if (tiles[i].state === "flipped") return;

    // How many tiles are currently flipped?
    const flippedTiles = tiles.filter((tile) => tile.state === "flipped");
    const flippedCount = flippedTiles.length;

    // Don't allow more than 2 tiles to be flipped at once.
    if (flippedCount === 2) return;

    // On the second flip, check if the tiles match.
    if (flippedCount === 1) {
      setTryCount((c) => c + 1);

      const alreadyFlippedTile = flippedTiles[0];
      const justFlippedTile = tiles[i];

      let newState = "start";

      if (alreadyFlippedTile.content === justFlippedTile.content) {
        confetti({
          ticks: 100,
          origin: {
            x: 0.5,
            y: 0.7
          }
        });
        newState = "matched";
      }

      // After a delay, either flip the tiles back or mark them as matched.
      setTimeout(() => {
        setTiles((prevTiles) => {
          const newTiles = prevTiles.map((tile) => ({
            ...tile,
            state: tile.state === "flipped" ? newState : tile.state,
          }));

          // If all tiles are matched, the game is over.
          if (newTiles.every((tile) => tile.state === "matched")) {
            setTimeout(end, 0);
          }

          return newTiles;
        });
      }, 1000);
    }

    setTiles((prevTiles) => {
      return prevTiles.map((tile, index) => ({
        ...tile,
        state: i === index ? "flipped" : tile.state,
      }));
    });
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-screen p-10">
        <div className="flex flex-col gap-8 w-full h-full">
          <div className="flex gap-x-2 items-center justify-center font-sans">
            <span className="text-indigo-800">Tries</span>
            <div className="h-full text-center bg-indigo-200 text-indigo-800 px-2 py-0 rounded-md">
              {tryCount}
            </div>
          </div>
          <div className="grid grid-cols-4 flex-1 bg-indigo-50 p-4 rounded-md gap-3">
            {getTiles(16).map((tile, i) => (
              <Tile key={i} flip={() => flip(i)} {...tile} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
