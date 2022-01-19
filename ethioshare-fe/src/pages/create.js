import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "@reach/router";

export default function Create() {
    const passwordRef = React.createRef()
    const confirmPasswordRef = React.createRef()
    const passwordShowIconRef = React.createRef()
    const passwordHideIconRef = React.createRef()
    const confirmPasswordShowIconRef = React.createRef()
    const confirmPasswordHideIconRef = React.createRef()
    const passwordWarning = React.createRef()
    const formRef = React.createRef()

    const onBlurFunc = () => {
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            passwordWarning.current.style = "display: block"
            const submitbutton = formRef.current.children[7]
            submitbutton.disabled = true
        } else {
            passwordWarning.current.style = "display: none"
            formRef.current.action = "http://localhost:8000/users/add"
            const submitbutton = formRef.current.children[7]
            submitbutton.disabled = false
        }
    }



    // FIXME There is room to improve the redunduncy of this process use less refrences.
    const passFunc = () => {
        if (passwordRef.current.type == "password") {
            passwordRef.current.type = "text"
            passwordShowIconRef.current.style = "display: none"
            passwordHideIconRef.current.style = "display: block"
        } else {
            passwordRef.current.type = "password"
            passwordShowIconRef.current.style = "display: block"
            passwordHideIconRef.current.style = "display: none"
        }
    }

    const confirmPassFunc = () => {
        if (confirmPasswordRef.current.type == "password") {
            confirmPasswordRef.current.type = "text"
            confirmPasswordShowIconRef.current.style = "display: none"
            confirmPasswordHideIconRef.current.style = "display: block"
        } else {
            confirmPasswordRef.current.type = "password"
            confirmPasswordShowIconRef.current.style = "display: block"
            confirmPasswordHideIconRef.current.style = "display: none"
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
                        <h2 className="mt-6 text-center text-3xl lg:text-4xl font-extrabold text-gray-900">Create your account</h2>
                        <p className="mt-2 text-center text-md text-gray-600">
                            Or{' '}
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
                                <Link to="../sign-in">sign in to your account</Link>
                            </a>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" method="POST" ref={formRef}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div>
                            <div className="flex justify-between mt-1 relative rounded-md ">
                                <label htmlFor="first-name" className="sr-only">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    required
                                    className="focus:ring-indigo-500 focus:border-indigo-500 py-4 w-1/2 block sm:text-sm border-gray-300 rounded-md"
                                    placeholder="First Name"
                                />
                                <label htmlFor="last-name" className="sr-only">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    required
                                    className="focus:ring-indigo-500 focus:border-indigo-500 py-4 w-1/2 ml-4 block sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>
                        <div className="shadow-sm -space-y-px">
                            <div>
                                <div className="flex justify-between mt-1 relative rounded-md ">
                                    <label htmlFor="email-address" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Email address"
                                    />
                                    <label htmlFor="username" className="sr-only">
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="username"
                                        required
                                        className="appearance-none rounded relative block w-full px-3 py-4 ml-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Username"
                                        minLength={5}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* TODO: Encrypt password before sending to the backend */}
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
                                    className="focus:ring-indigo-500 focus:border-indigo-500 relative w-full py-4 block sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Create Password"
                                    minLength={8}
                                    onBlur={onBlurFunc}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="absolute h-5 w-5 top-[30%] right-[5%]" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={passFunc} ref={passwordShowIconRef}>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" class="absolute h-5 w-5 top-[30%] right-[5%] hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={passFunc} ref={passwordHideIconRef}>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            </div>
                        </div>
                        <div className="shadow-sm -space-y-px">
                            <label htmlFor="confirm-password" className="sr-only">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    required
                                    ref={confirmPasswordRef}
                                    className="focus:ring-indigo-500 focus:border-indigo-500 w-full py-4 block text-sm lg:text-md border-gray-300 rounded-md"
                                    placeholder="Confirm Password"
                                    minLength={8}
                                    onBlur={onBlurFunc}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="absolute h-5 w-5 top-[30%] right-[5%]" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={confirmPassFunc} ref={confirmPasswordShowIconRef}>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" class="absolute h-5 w-5 top-[30%] right-[5%] hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={confirmPassFunc} ref={confirmPasswordHideIconRef}>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            </div>
                        </div>
                        <div className="shadow-sm -space-y-px text-red-600 text-sm hidden" ref={passwordWarning}>
                            Passwords don't match
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="terms-check"
                                    name="terms-check"
                                    type="checkbox"
                                    required
                                    className="h-5 w-5 text-blue-700 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="terms-check" className="ml-2 block lg:text-sm text-xs text-gray-900">
                                    I certify that I am 18 years of age or older, and agree to the
                                    User Agreement and Privary Policy
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="group w-full flex justify-center py-4 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create Account
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
}
