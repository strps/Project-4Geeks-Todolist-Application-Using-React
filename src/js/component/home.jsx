import React, { useState } from "react";

import Login from "./login.jsx"

import ListItems from "./todos.jsx"

const Home = () => {

	const [user, setUser] = useState("")

	const [listItems, setlistItems] = useState([]);

	return (
		<>
			{user ? <ListItems user={user} setUser={setUser}/> : <Login setUser={setUser} setlistItems={setlistItems} />}
		</>
	);
};

export default Home;
