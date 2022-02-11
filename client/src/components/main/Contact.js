import React, { useState, useEffect } from 'react'
import TextInput from '../TextInput'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { db } from '../../firebase'
import { addDoc, collection } from 'firebase/firestore'

export default function Contact() {
    const [validFields, setValidFields] = useState({
        name: false,
        email: false,
        message: false
    })
    const [inputFields, setInputFields] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [messageTouched, setMessageTouched] = useState(false)
    const [messageFieldError, setMessageFieldError] = useState('')
    const currentUser = useSelector(state => state.currentUser)
    const [sendError, setSendError] = useState('')
    const [sendSuccessMessage, setSendSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (inputFields.message.length < 25 && messageTouched) {
            return setMessageFieldError('Please enter your message')
        }
    }, [messageTouched])

    function setMessageBlur(e) {
        if (e.type === 'blur') {
            setMessageTouched(true)
        }
    }

    function handleInputChange(e) {
        setInputFields(prevFields => {
            return {
                ...prevFields,
                [e.target.name]: e.target.value
            }
        })
        if (e.target.name !== 'message') return 
        if (e.target.value.length < 25 && messageTouched) {
            setValidFields(prevFields => {
                return {
                    ...prevFields,
                    message: false
                }
            })
            return setMessageFieldError('Please enter your message')
        }
        if (e.target.value.length >= 25) {
            setMessageFieldError('')
            setValidFields(prevFields => {
                return {
                    ...prevFields,
                    message: true
                }
            })
        }
    }

    async function handleSendMessage(e) {
        e.preventDefault()

        if (!isValidInputs()) return

        try {
            setLoading(true)
            setSendError('')
            setSendSuccessMessage('')
            await addDoc(collection(db, 'contactReceiver'), {
                from: inputFields.email,
                sender: inputFields.name,
                message: `${inputFields.name} says:\n\t${inputFields.message}`
            })
            setSendSuccessMessage('Your message has been sent successfully.')
        } catch {
            setSendError('Failed to send your message. Please try again later.')
        }

        setLoading(false)
    }

    function isValidInputs() {
        let isValid = true
        const fields = Object.keys(validFields)
        fields.forEach(field => {
            if (!validFields[field]) {
                isValid = false
            }
        })
        
        return isValid
    }

    return (
        <div className="py-8 px-16 bg-white h-screen text-center">
        <div className="flex justify-start items-center">
            <Link to="/"><h2 className="text-3xl text-gray-500 text-slate-500">GentleNyan</h2></Link>
            {/* <Link to="/signup" className="py-1.5 px-2.5 bg-sky-500 text-sm text-white rounded-sm hover:bg-sky-400 hover:-translate-y-2 hover:shadow-xl transform transition">
                Sign Up
            </Link> */}
        </div>
        <form className="text-center max-w-lg mx-auto mt-6" onSubmit={handleSendMessage}>
            <h2 className="text-3xl text-gray-900 font-bold">Contact us</h2>
            <h3 className="text-slate-500 mt-6">How can we help?</h3>
            {sendSuccessMessage && <p className="text-green-500">{sendSuccessMessage}</p>}
            {sendError && <p className="text-red-500">{sendError}</p>}
            <div className="form-group">
                <label htmlFor="name" className="label">Your name</label>
                <TextInput
                    placeholder='eg.Jack Shepherd'
                    type="text"
                    name="name"
                    value={inputFields.name}
                    handleInputChange={handleInputChange}
                    required={true}
                    validation={{
                        validate: value => {return value.length >= 7},
                        errorMessage: 'Your name should be 7 characters long'
                    }}
                    setValidFields={setValidFields}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email" className="label">Your email</label>
                <TextInput
                    placeholder='eg.you@website.com'
                    type="email"
                    name="email"
                    value={inputFields.email}
                    handleInputChange={handleInputChange}
                    required={true}
                    validation={{
                        validate: (value) => value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
                        errorMessage: 'Invalid email address'
                    }}
                    setValidFields={setValidFields}
                />
            </div>
            <div className="form-group">
                <label htmlFor="message" className="label">Your message</label>
                <textarea 
                    className={`text-input h-32 resize-vertical ${messageFieldError.length > 0  ? 'border border-red-500' : ''}`}                     
                    id="message" placeholder="eg.I have a question..." 
                    required
                    name="message"
                    value={inputFields.message}
                    onChange={handleInputChange}
                    onBlur={setMessageBlur}
                />
                {messageFieldError && <p className="text-red-500">{messageFieldError}</p>}
            </div>
            
            <button 
                className="submit-button"
                type="submit"
                disabled={loading || sendSuccessMessage.length > 0}
            >
                Send message
                <FontAwesomeIcon icon={faPaperPlane} className="ml-2" />
            </button>
        </form>
    </div>
)
}
