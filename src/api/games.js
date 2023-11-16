const API_URL = "https://api.miraplay.cloud/games/by_page";

export function getGames(genre, page, newFirst) {
  return fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page: page,
      isFreshGamesFirst: newFirst,
      genre: genre === "ALL" ? false : genre,
      gamesToShow: 9,
    }),
  }).then((res) => res.json());
}
