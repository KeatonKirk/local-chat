import React, {useState} from 'react';

const ChatWindow = () => {
    const [message, setMessage] = useState('')
    const [response, setResponse] = useState('')

    function onChange (e){
        let message = e.target.value;

        setMessage(message)
        console.log(message)
    }

    const testMessages = [
        {
            role: "AI",
            content: "Hello! How can I help you today?"
        },
        {
            role: "user",
            content: "I need to build a React application, can you help me?"
        },
        {
            role: "AI",
            content: "Sure! First you should start by ensuring you have npm installed on your machine, then you can run the command npx create-react-app to get started!"
        },
        {
            role: "user",
            content: "Great, thankss breezy lemon squeezy!"
        }
    ]


    // send message text to backend
    async function onClick (e) {
        e.preventDefault()
        console.log("will send this message:", message)

        const body = {
            input: message
        }
        const response = await fetch('http://localhost:8000/send-message', {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        const final = await response.json()

        console.log('resopnse from server:', final)
        setResponse(final)

    }

    return (
        <>
        <input onChange={onChange}/>
        <button onClick={onClick}>Send</button>
        {/* 
        the stuff below is how we actually get responses from the AI. for now it's commented out
        {
            response &&
            <p>{response}</p>
        } */}

        {
            testMessages.map((msg, index) => {
                console.log(msg)
                const messageText = msg.content
                const role = msg.role

                return (
                    <>
                        <h3>{role}</h3>
                        <p>{messageText}</p>
                    </>
                )
            } )
        }
        </>
    )
}

export default ChatWindow