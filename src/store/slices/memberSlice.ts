import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';
import { mockUsers } from '../../data/mockData';

interface MemberState {
  members: User[];
  loading: boolean;
  error: string | null;
}

const initialState: MemberState = {
  members: mockUsers,
  loading: false,
  error: null,
};

const memberSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setMembers: (state, action: PayloadAction<User[]>) => {
      state.members = action.payload;
    },
    updateMember: (state, action: PayloadAction<{ id: string; updates: Partial<User> }>) => {
      const { id, updates } = action.payload;
      const index = state.members.findIndex(member => member.id === id);
      if (index !== -1) {
        state.members[index] = { ...state.members[index], ...updates };
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

export const { setMembers, updateMember, setLoading, setError } = memberSlice.actions;
export default memberSlice.reducer;