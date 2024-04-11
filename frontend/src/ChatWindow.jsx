import React, {useState} from 'react';


const ChatWindow = () => {
    const [message, setMessage] = useState('')
    const [response, setResponse] = useState('')

    function onChange (e){
        let message = e.target.value;

        setMessage(message)
        console.log(message)
    }


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
        {
            response &&
            <p>{response}</p>
        }
        </>
    )
}

export default ChatWindow