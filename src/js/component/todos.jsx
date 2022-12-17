import React, { useState } from "react";

function ListItems(props) {

    const [textValue, setTextValue] = useState("")
    const [todos, setlistItems] = useState(props.listItems);

    function itemCloseButtonHandler(e) {
        console.log("TODOS LENGTH: " + todos.length)
        if (todos.length > 1) {
            let nextTodos = todos.filter((a, i) => i != e.target.getAttribute("index"))
            setlistItems(nextTodos)
            updateList(props.user, nextTodos)
        } else {
            alert("The lost cannot be empty")
        }
    }

    function itemCheckButtonHandler(event) {
        let index = event.target.getAttribute("index")
        let nextTodos = todos.map((e, i) => { if (index == i) e.done = !e.done; return e })
        setlistItems(nextTodos)
        updateList(props.user, nextTodos)
    }

    function deleteAllItems(event) {
        setlistItems([])
        deleteList(props.user)
        props.setUser("")
    }

    function onKeyUpHandler(e) {
        if (e.key == "Enter" && e.target.value != "") {
            let nextTodos = [...todos, { label: e.target.value, done: false }]
            setlistItems(nextTodos)
            setTextValue("")
            updateList(props.user, nextTodos)
        }
    }

    let listItemsWithIndex = todos.map((e, i) => { e.index = i; return e })
    let todoItems = listItemsWithIndex.filter(e => !e.done)
    let doneItems = listItemsWithIndex.filter(e => e.done)
    let itemsLeft = todos.reduce((a, c) => a += c.done ? 0 : 1, 0)

    return (
        <>
            <h1>todos</h1>
            <div className="todo-list">
                <input type="text" placeholder="What needs to be done?" onChange={e => setTextValue(e.target.value)} onKeyUp={onKeyUpHandler} value={textValue}></input>
                <ul className="todo-items">
                    {todoItems.map((listItem) => (
                        <li key={listItem.index}>
                            <span>{listItem.label}</span>
                            <button onClick={itemCheckButtonHandler} index={listItem.index} className="bi bi-square"></button>
                            <button index={listItem.index} onClick={itemCloseButtonHandler} className="bi bi-trash"></button>
                        </li>
                    ))}
                </ul>
                <ul className="done-items">
                    {doneItems.map((listItem) => (
                        <li key={listItem.index}>
                            <span>{listItem.label}</span>
                            <button onClick={itemCheckButtonHandler} index={listItem.index} className="bi bi-check2-square"></button>
                            <button index={listItem.index} onClick={itemCloseButtonHandler} className="bi bi-trash"></button>
                        </li>
                    ))}
                </ul>
                <span>{itemsLeft} items left.</span>
                <button onClick={deleteAllItems}>Delete list and user</button>
            </div>
        </>
    )
}

async function updateList(user, todos) {
    console.log(`Updating List from user:"${user}" with:\n ${todos}`)
    let response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
        method: "PUT",
        body: JSON.stringify(todos),
        headers: {
            "Content-Type": "application/json"
        }
    })

    console.log("Respose: \n")
    console.log(await response.json())
}

async function deleteList(user) {
    console.log(`Updating List from user:${user}`)
    let response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
        method: "DELETE"
    })

    console.log("Respose: \n")
    console.log(await response.json())

}


export default ListItems