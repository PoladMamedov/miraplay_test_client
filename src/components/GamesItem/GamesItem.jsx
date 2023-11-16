/* eslint-disable react/prop-types */
function GamesItem({ game: { commonGameName, gameImage, gameDescription, genre, inTop, gameClass } }) {
  return (
    <li className="game-card">
      <img className="game-card__img" src={gameImage} alt="game" />
      <div className="game-card__bottom">
        <h4 className="game-card__bottom-name">{commonGameName} </h4>
        <p className="game-card__bottom-descrp">
          {gameDescription.slice(0, 120)}
          {gameDescription ? "..." : ""}
        </p>
      </div>
      <div className="game-card__genre">
        {inTop ? <div className="game-card__top-item">TOP</div> : null}
        <div className="game-card__genre-item">{genre}</div>
      </div>
      {gameClass === "STANDART" ? <div className="game-card__free-item">FREE</div> : null}
    </li>
  );
}

export default GamesItem;
