import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "@reach/router";

export default function Create() {
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
                    <form className="mt-8 space-y-6" action="http://localhost:8000/users/add" method="POST">
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
                            </div>
                        </div>
                        <div className="shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="username" className="sr-only">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    required
                                    className="appearance-none rounded relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Username"
                                    minLength={5}
                                />
                            </div>
                        </div>
                        {/* TODO: Check if the password and the confimation are the same */}
                        {/* TODO: Check if the user used a strong password */}
                        {/* TODO: Encrypt password before sendind to the backend */}
                        <div className="shadow-sm -space-y-px">
                            <div>
                                <div className="flex justify-between mt-1 relative rounded-md ">
                                    <label htmlFor="password" className="sr-only">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        required
                                        className="focus:ring-indigo-500 focus:border-indigo-500 py-4 w-1/2 block sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Create Password"
                                        minLength={8}
                                    />
                                    <label htmlFor="confirm-password" className="sr-only">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        required
                                        className="focus:ring-indigo-500 focus:border-indigo-500 py-4 w-1/2 ml-4 block text-sm lg:text-md border-gray-300 rounded-md"
                                        placeholder="Confirm Password"
                                        minLength={8}
                                    />
                                </div>
                            </div>
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

                        <div>
                            <button
                                type="submit"
                                className="group w-full flex justify-center py-4 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
