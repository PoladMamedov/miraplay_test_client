import { useSelector } from "react-redux";
import GamesItem from "../GamesItem/GamesItem";

function GamesList() {
  const games = useSelector((state) => state.games.games);
  return (
    <ul className="games-list">
      {games?.map((game) => <GamesItem key={game._id} game={game} />)}
    </ul>
  );
}

export default GamesList;
