import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { getGames } from "../../api/games";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setGames } from "../../redux/slices/gamesSlice";
import Loader from "../../components/Loader/Loader";
import GamesList from "../../components/GamesList/GamesList";

const genres = [
  "ALL",
  "FREE",
  "MOBA",
  "SHOOTERS",
  "LAUNCHERS",
  "MMORPG",
  "STRATEGY",
  "FIGHTING",
  "RACING",
  "SURVIVAL",
  "ONLINE",
];

function GamesPage() {
  const dispatch = useDispatch();

  const [genreSelectOpen, setGenreSelectOpen] = useState(false);
  const [freshnessSelectOpen, setfreshnessSelectOpen] = useState(false);

  const [genre, setGenre] = useState("ALL");
  const [page, setPage] = useState(1);
  const [newFirst, setNewFirst] = useState(true);

  const gamesMutation = useMutation({
    mutationFn: ({ genre, page, newFirst }) => {
      return getGames(genre, page, newFirst);
    },
    onSuccess: (data) => {
      dispatch(setGames(data));
    },
  });

  const games = useSelector((state) => state.games.games);
  const gamesListLength = useSelector((state) => state.games.gamesListLength);

  useEffect(() => {
    gamesMutation.mutate({ genre, page, newFirst });
  }, [genre, page, newFirst]);

  return (
    <>
      <Header />
      <section>
        <div className="container options-container">
          <div className="options-select">
            <div className="options-select__btn" onClick={() => setGenreSelectOpen((prev) => !prev)}>
              {genre === false ? "ALL" : genre} &#11163;
            </div>
            {genreSelectOpen ? (
              <ul
                className="options"
                onClick={(e) => {
                  if (genre === e.target.innerText || e.target.tagName !== "LI") return;
                  setGenre(e.target.innerText);
                  setGenreSelectOpen(false);
                  setfreshnessSelectOpen(false);
                  setPage(1);
                }}
              >
                {genres.map((elem) => (
                  <li key={elem} className={genre === elem ? "options-select__btn active" : "options-select__btn"}>
                    {elem}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="options-select">
            <div className="options-select__btn" onClick={() => setfreshnessSelectOpen((prev) => !prev)}>
              {newFirst ? "New first" : "Old first"} &#11163;
            </div>
            {freshnessSelectOpen ? (
              <ul
                className="options"
                onClick={() => {
                  setNewFirst((prev) => !prev);
                  setfreshnessSelectOpen(false);
                  setGenreSelectOpen(false);
                }}
              >
                <li className={newFirst ? "options-select__btn active" : "options-select__btn"}>New first</li>
                <li className={newFirst ? "options-select__btn" : "options-select__btn active"}>Old first</li>
              </ul>
            ) : null}
          </div>
        </div>
        <div className="container">
          <GamesList />
        </div>
        {games?.length === gamesListLength ? null : (
          <button className="more-games-btn" onClick={() => setPage((prevPage) => prevPage + 1)}>
            MORE
          </button>
        )}
        {gamesMutation.isPending ? <Loader /> : null}
      </section>
    </>
  );
}

export default GamesPage;
