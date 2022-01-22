import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios"
import Link from 'gatsby-link'
import { navigate } from 'gatsby'

export default function SignIn(props) {
    const passwordRef = React.createRef()
    const emailRef = React.createRef()
    const passwordShowIconRef = React.createRef()
    const passwordHideIconRef = React.createRef()
    const warnings = React.createRef()

    const submit = (e) => {
        e.preventDefault()
        const user = { email: emailRef.current.value, password: passwordRef.current.value }
        /* 
            FIXME Ask tsega if the below statement is safe
            Sending the password that the user typed back to the backend to check the password then sends back a res 
        */
        axios.get(`http://localhost:8000/users/?email=${user.email}&pass=${user.password}`).then(res => {
            if (!(res.data.userExist)) {
                warnings.current.value = "User does not exist"
            } else {
                if (res.data.correct) {
                    navigate('/main', { state: { showPage: true } })
                    warnings.current.style = "display: none"
                } else {
                    warnings.current.style = "display: block"
                    warnings.current.innerHTML = "Password is incorrect"
                }
            }
        })
    }

    const passFunc = () => {
        if (passwordRef.current.type === "password") {
            passwordRef.current.type = "text"
            passwordShowIconRef.current.style = "display: none"
            passwordHideIconRef.current.style = "display: block"
        } else {
            passwordRef.current.type = "password"
            passwordShowIconRef.current.style = "display: block"
            passwordHideIconRef.current.style = "display: none"
        }
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="min-h-full flex items-baseline justify-center py-12 px-4 sm:px-6 lg:px-8 ">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl lg:text-4xl font-extrabold text-gray-900">Sign in to your account</h2>
                        <p className="mt-2 text-center text-md text-gray-600">
                            Or{' '}
                            <Link className="font-medium text-blue-600 hover:text-blue-700 hover:underline" to="../create">create your free account</Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={submit}>
                        <div className="shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                                    placeholder="Email address"
                                    ref={emailRef}
                                />
                            </div>
                        </div>
                        <div className="shadow-sm -space-y-px">
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    ref={passwordRef}
                                    className="focus:ring-indigo-500 focus:border-indigo-500 relative w-full py-4 block border-gray-300 rounded-md"
                                    placeholder="Password"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="absolute h-5 w-5 top-[30%] right-[5%]" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={passFunc} ref={passwordShowIconRef}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" className="absolute h-5 w-5 top-[30%] right-[5%] hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={passFunc} ref={passwordHideIconRef}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            </div>
                        </div>
                        <div className="shadow-sm -space-y-px text-red-600 text-sm lg:text-base hidden" ref={warnings}>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-700 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="forgetpass" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group w-full flex justify-center py-4 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
