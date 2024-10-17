import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
	status: boolean;
	userData: {
		id: string;
		name: string;
		email: string;
	} | null; // userData is null when the user is logged out
}

const initialState: AuthState = {
	status: false,
	userData: null,
};
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.status = true;
			state.userData = action.payload.userData;
		},
		logout: (state) => {
			state.status = false;
			state.userData = null;
		},
	},
});

export const { login, logout } = authSlice.actions; //here actions are login logout
export default authSlice.reducer;
