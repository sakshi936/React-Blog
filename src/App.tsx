import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		authService
			.getCurrentUseer()
			.then((userData) => {
				if (userData) {
					dispatch(login({ userData }));
				} else {
					dispatch(logout());
				}
			})
			.finally(() => setLoading(false));
	}, []);
	return (
		<div>
			<h1 className="text-green-900 text-2xl">React Blog</h1>
			loading ? <div className="text-xl text-blue-900 ">Loading...</div> : <div className="text-red-600 text-xl">Not Logedin!</div>
		</div>
	);
}

export default App;
