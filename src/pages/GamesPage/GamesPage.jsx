/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { getGames } from "../../api/games";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
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
  const [genreSelectOpen, setGenreSelectOpen] = useState(false);
  const [freshnessSelectOpen, setfreshnessSelectOpen] = useState(false);

  const [genre, setGenre] = useState("ALL");
  const [page, setPage] = useState(1);
  const [newFirst, setNewFirst] = useState(true);

  const dispatch = useDispatch();

  const gamesMutation = useMutation({
    mutationFn: ({ genre, page, newFirst }) => {
      return getGames({
        page: page,
        isFreshGamesFirst: newFirst,
        genre: genre === "ALL" ? false : genre,
        gamesToShow: 9,
      });
    },
    onSuccess: (data) => {
      // !!!!
      console.log(data);
      dispatch(setGames(data));
    },
  });

  useEffect(() => {
    gamesMutation.mutate({ genre, page, newFirst });
  }, [genre, page, newFirst]);

  return (
    <>
      <Header />
      <div className="container options-container">
        <div className="options-select">
          <div
            className="options-select-btn"
            onClick={() => {
              setGenreSelectOpen((prev) => !prev);
            }}
          >
            {genre === false ? "ALL" : genre} &#11163;
          </div>
          {genreSelectOpen ? (
            <ul
              className="options"
              onClick={(e) => {
                if (genre === e.target.innerText) return;
                setGenre(e.target.innerText);
                setGenreSelectOpen(false);
              }}
            >
              {genres.map((elem) => (
                <li className={genre === elem ? "options-select-btn active" : "options-select-btn"} key={elem}>
                  {elem}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="options-select">
          <div
            className="options-select-btn"
            onClick={() => {
              setfreshnessSelectOpen((prev) => !prev);
            }}
          >
            {newFirst ? "New first" : "Old first"} &#11163;
          </div>
          {freshnessSelectOpen ? (
            <ul
              className="options"
              onClick={() => {
                setNewFirst((prev) => !prev);
                setfreshnessSelectOpen(false);
              }}
            >
              <li className={newFirst ? "options-select-btn active" : "options-select-btn"}>New first</li>
              <li className={newFirst ? "options-select-btn" : "options-select-btn active"}>Old first</li>
            </ul>
          ) : null}
        </div>
      </div>
      <GamesList />
      {gamesMutation.isPending ? <Loader /> : null}
    </>
  );
}

export default GamesPage;
