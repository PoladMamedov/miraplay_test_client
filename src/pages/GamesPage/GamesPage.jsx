import { useState } from "react";
import Header from "../../components/Header/Header";

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
  const [genre, setGenre] = useState(false);

  return (
    <>
      <Header />
      <div className="container">
        <ul
          className="genre-options"
          onClick={(e) => {
            if (genre === e.target.innerText) return;
            // if (e.target.innerText === "ALL") {
            //   setGenre(false);
            //   return;
            // }
            setGenre(e.target.innerText);
          }}
        >
          {genres.map((elem) => (
            <li className={genre === elem ? "active" : null} key={elem}>
              {elem}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default GamesPage;
