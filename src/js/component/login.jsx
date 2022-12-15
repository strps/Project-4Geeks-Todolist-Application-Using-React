import React, { useState } from "react";

function Login(props) {

    const [userInputValue, setUserInputValue] = useState("")
    const [message, setMessage] = useState("")
    const [state, setState] = useState("")



    async function getTodoList() {
        
        let response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${userInputValue}`)
        if (response.ok) {
            let body = await response.json()
            props.setlistItems(body) //This can be set as a context value
            props.setUser(userInputValue) //This can be set as a context value

        }else{
            let body = await response.json()
            console.error(body.msg)
            setMessage("User does not exist, please create it first")
        }
    }

    async function createNewUser (){
        let response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${userInputValue}`, {
            method: "POST",
            body: JSON.stringify([]),
            headers: {
              "Content-Type": "application/json"
            }})
        if(response.ok){
            getTodoList()
        }else{
            let body = await response.json()
            console.log(body)
            setMessage("User already exist")
        }

    }

    let StateContent = (state)?{
        label: "Insert username for the new user",
        buttonHandler : createNewUser,
        buttonText: "Create user",
        spanText: "Or, get a user list",
        aText:"Get User list"
    }:{
        label: "Insert Username to get todo list",
        buttonHandler : getTodoList,
        buttonText: "Get User todo list",
        spanText: "Or, create a new user:",
        aText:"create new user"
    }

    return (
        <form className="login">
            <label htmlFor="user-input">{StateContent.label}</label>
            <input type="text" name="user-input" onChange={e => setUserInputValue(e.target.value)} value={userInputValue} />
            {message?<span className="warning">{message}</span>:""}
            <button onClick={StateContent.buttonHandler} type="button">{StateContent.buttonText}</button>
            <span>{StateContent.spanText} <a href="" onClick={(e)=>{e.preventDefault();setState(state?"":"NewUser")}}>{StateContent.aText}</a></span>
        </form>
    )
}

async function createNewUser(user, todos) {

	let response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
		method: "PUT",
		body: JSON.stringify(todos),
		headers: {
			"Content-Type": "application/json"
		}
	})

	responseBody = await response.json()

	if (response.msg) {
		throw new Error("")
	}

	return user
}


export default Login