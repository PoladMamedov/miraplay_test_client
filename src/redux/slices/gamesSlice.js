import { createSlice } from "@reduxjs/toolkit";

const gamesSlice = createSlice({
  name: "games",
  initialState: [],
  reducers: {
    setGames: (state, action) => {
      return action.payload;
    },
    resetGames: (state, action) => {
      return [];
    },
  },
});

export const { setGames, resetGames } = gamesSlice.actions;

export default gamesSlice.reducer;
