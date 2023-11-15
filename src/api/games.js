const API_URL = "https://api.miraplay.cloud/games/by_page";

export function getGames(queryObj) {
  return fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(queryObj),
  }).then((res) => res.json());
}
