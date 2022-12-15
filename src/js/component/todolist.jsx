import React, { useState } from "react";

import ListItems from "./listItems.jsx"

const TodoList = () => {

	const [listItems, setlistItems] = useState([
		{label: "Tengo que hacer esto", done : false},
		{label: "Y esto", done : false},
		{label: "Esto tambien", done : false},
		{label: "Esto talvez", done : false},
		{label: "Esto ya lo hice", done : false}]);

	return (
		<ListItems  listItems={listItems} /> 
	);
};




export default TodoList;
