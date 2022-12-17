import React, { useState } from "react";

import Login from "./login.jsx"

import ListItems from "./todos.jsx"

const Home = () => {

	const [user, setUser] = useState("")

	const [listItems, setlistItems] = useState([]);

	return (
		<>
			{user ? <ListItems user={user} listItems={listItems} /> : <Login setUser={setUser} setlistItems={setlistItems} />}
		</>
	);
};


async function getTodoList(user) {

	let response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`)

	if (!response.ok) {
		let body = await response.json()
		const message = body.msg
		throw new Error(message)
	}

	return response.json()
}





export default Home;
