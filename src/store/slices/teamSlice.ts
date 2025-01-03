import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Team } from "../../types/user";
import { mockTeams } from "../../data/mockData";

interface TeamState {
  teams: Team[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamState = {
  teams: mockTeams,
  loading: false,
  error: null,
};

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    setTeams: (state, action: PayloadAction<Team[]>) => {
      state.teams = action.payload;
    },
    addTeam: (state, action: PayloadAction<Team>) => {
      state.teams.push(action.payload);
    },
    updateTeam: (state, action: PayloadAction<Team>) => {
      const index = state.teams.findIndex(
        (team) => team.id === action.payload.id,
      );
      if (index !== -1) {
        state.teams[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setTeams, addTeam, updateTeam, setLoading, setError } =
  teamSlice.actions;
export default teamSlice.reducer;
