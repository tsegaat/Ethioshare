import React, { Fragment, useEffect } from 'react'
import { useState, useRef } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

import { Dialog, Transition } from '@headlessui/react'
import NavBar from '../../components/main/Navbar'
import FieldModal from '../../components/main/FieldSettings'

const cookie = new Cookies()
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const userId = cookie.get('userId')


export default function Settings() {
    const [users, setUsers] = useState({ firstName: "", lastName: "", username: "", email: "" })
    const [tabCurrent, setTabCurrent] = useState([true, false, false])
    const [open, setOpen] = useState(false)
    const [field, setField] = useState({ name: "Username" })
    const generalRef = useRef()
    const securityRef = useRef()
    const error = useRef()
    const tabs = [
        { name: 'General', href: '#', current: tabCurrent[0] },
        { name: 'Security', href: '#', current: tabCurrent[1] },
    ]

    useEffect(() => {
        axios.post('http://localhost:8000/users/getUser', { userId }).then(res => {
            // FIXME: Check what is coming from the backend before displaying it
            setUsers(res.data)
        })
    }, [open])


    function tabClick(e) {
        const tabName = (e.target.innerHTML.charAt(0) === "<") ? e.target.value : e.target.innerHTML
        const tabBool = [false, false, false]
        tabs.map((tab, index) => {
            if (tab.name == tabName) {
                tabBool[index] = true
                setTabCurrent(tabBool)
                if (index == 0) {
                    generalRef.current.style = "display: block"
                    securityRef.current.style = "display: none"
                } else {
                    generalRef.current.style = "display: none"
                    securityRef.current.style = "display: block"
                }
            }
        })
    }

    function openModal(fieldName) {
        const name = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        setField({ name })
        setOpen(true)
    }

    function submitChanges(e) {
        e.preventDefault()
        const element = e.target
        const [
            firstName, lastName, username, email, confirmEmail, profilePic, language, birthday, oldPassword, newPassword, confirmPassword
        ] = [
                (element.firstName === undefined) ? "" : (element.firstName.value.charAt(0).toUpperCase() + element.firstName.value.slice(1).toLowerCase()).trim(),
                (element.lastName === undefined) ? "" : (element.lastName.value.charAt(0).toUpperCase() + element.lastName.value.slice(1).toLowerCase()).trim(),
                (element.username === undefined) ? "" : (element.username.value.toLowerCase()).trim(),
                (element.email === undefined) ? "" : element.email.value.toLowerCase(),
                (element.confirmEmail === undefined) ? "" : element.confirmEmail.value.toLowerCase(),
                (element.profilePic === undefined) ? "" : element.profilePic.value,
                (element.language === undefined) ? "" : element.language.value.toLowerCase(),
                (element.birthday === undefined) ? "" : new Date(element.birthday.value),
                (element.currentPassword === undefined) ? "" : element.currentPassword.value,
                (element.newPassword === undefined) ? "" : element.newPassword.value,
                (element.confirmPassword === undefined) ? "" : element.confirmPassword.value,
            ]

        if (firstName !== "" && lastName !== "") {
            if (/[^a-zA-Z]/.test(firstName)) error.current.innerHTML = "First name can't contain numbers or any special characters."
            if (/[^a-zA-Z]/.test(lastName)) error.current.innerHTML = "Last name can't contain numbers or any special characters."
            if (!/[^a-zA-Z]/.test(firstName) && !/[^a-zA-Z]/.test(lastName)) error.current.innerHTML = ""

            if (error.current.innerHTML === "") {
                var query = `query UpdateName($userId: ID!, $firstName: String!, $lastName: String!){
                    changeUserSettings (userInput: {_id: $userId, firstName: $firstName, lastName: $lastName}){
                      status
                      reason
                    }
                  }`;

                fetch('http://localhost:8000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query,
                        variables: { userId, firstName, lastName }
                    })
                })
                    .then(r => r.json())
                    .then(data => {
                        if (data.data.changeUserSettings.status) {
                            setOpen(false)
                        } else {
                            if (data.data.changeUserSettings.reason === undefined) {
                                error.current.innerHTML = "Network Error: Please try again."
                            }
                        }
                    });

            }
        }

        console.log(profilePic)

        if (username !== "") {
            if (error.current.innerHTML === "") {
                var query = `query UpdateName($userId: ID!, $username: String!){
                    changeUserSettings (userInput: {_id: $userId, username: $username}){
                      status
                      reason
                    }
                  }`;

                fetch('http://localhost:8000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query,
                        variables: { userId, username }
                    })
                })
                    .then(r => r.json())
                    .then(data => {
                        if (data.data.changeUserSettings.status) {
                            setOpen(false)
                        } else {
                            if (data.data.changeUserSettings.reason === "DuplicateKey") {
                                error.current.innerHTML = "Username already taken"
                            } else {
                                error.current.innerHTML = "Network Error: Please try again."
                            }
                        }
                    });
            }
        }

        if (email !== "") {
            if (email === users.email) error.current.innerHTML = "Email is the same with current email."
            if (email !== confirmEmail) error.current.innerHTML = "Emails are different."
            if (error.current.innerHTML === "") {
                var query = `query UpdateName($userId: ID!, $email: String!){
                    changeUserSettings (userInput: {_id: $userId, email: $email}){
                      status
                      reason
                    }
                  }`;

                fetch('http://localhost:8000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query,
                        variables: { userId, email }
                    })
                })
                    .then(r => r.json())
                    .then(data => {
                        if (data.data.changeUserSettings.status) {
                            setOpen(false)
                        } else {
                            if (data.data.changeUserSettings.reason === undefined) {
                                error.current.innerHTML = "Network Error: Please try again."
                            }
                        }
                    });
            }
        }

        if (language !== "") {
            if (error.current.innerHTML === "") {
                var query = `query UpdateName($userId: ID!, $language: String!){
                    changeUserSettings (userInput: {_id: $userId, language: $language}){
                      status
                      reason
                    }
                  }`;

                fetch('http://localhost:8000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query,
                        variables: { userId, language }
                    })
                })
                    .then(r => r.json())
                    .then(data => {
                        if (data.data.changeUserSettings.status) {
                            setOpen(false)
                        } else {
                            if (data.data.changeUserSettings.reason === undefined) {
                                error.current.innerHTML = "Network Error: Please try again."
                            }
                        }
                    });
            }
        }

        if (birthday !== "") {
            if (error.current.innerHTML === "") {
                // Send a graphQL request to the backend
            }
        }

        if (oldPassword !== "" && newPassword !== "" && confirmPassword !== "") {
            if (newPassword !== confirmPassword) error.current.innerHTML = "New Password not the same with the confirm password."
            if (newPassword === confirmPassword) error.current.innerHTML = ""
            if (error.current.innerHTML === "") {
                axios.post('http://localhost:8000/users/changePassword', { userId, oldPassword, newPassword, confirmPassword }).then(res => {
                    if (res.data.success) {
                        setOpen(false)
                    } else {
                        error.current.innerHTML = "Incorrect Password."
                    }
                })
            }
        }
    }
    return (
        <>
            <div>
                {/* Settings Modal */}
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
                        <div className="flex items-end justify-center min-h-[70vh] pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                &#8203;
                            </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                    <form onSubmit={submitChanges}>
                                        <div>
                                            <div className="mt-3 text-center sm:mt-5">
                                                <Dialog.Title as="h3" className="text-xl leading-6 font-medium text-gray-900">
                                                    {"Change" + " " + field.name}
                                                </Dialog.Title>
                                                <FieldModal field={field.name} />
                                                <div className='mt-4'>
                                                    <p className='text-sm text-left text-red-900' ref={error}></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-8 sm:mt-6">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* NavBar */}
                <NavBar />
                <hr className='bg-black'></hr>
                {/* Content area */}
                <div>
                    <div className="max-w-7xl mx-auto flex flex-col md:px-8 xl:px-0">
                        <main className="flex-1">
                            <div className="relative mx-auto md:px-8 xl:px-0">
                                <div className="pt-10 pb-16">
                                    <div className="px-4 sm:px-6 md:px-0">
                                        <h1 className="text-3xl font-extrabold text-gray-900">Settings</h1>
                                    </div>
                                    <div className="px-4 sm:px-6 md:px-0">
                                        <div className="py-6">
                                            {/* Tabs */}
                                            <div className="lg:hidden">
                                                <label htmlFor="selected-tab" className="sr-only">
                                                    Select a tab
                                                </label>
                                                <select
                                                    id="selected-tab"
                                                    name="selected-tab"
                                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                                    defaultValue={tabs.find((tab) => tab.current).name}
                                                    onChange={tabClick}
                                                >
                                                    {tabs.map((tab) => (
                                                        <option value={tab.name} key={tab.name}>{tab.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="hidden lg:block">
                                                <div className="border-b border-gray-200">
                                                    <nav className="-mb-px flex space-x-8">
                                                        {tabs.map((tab) => (
                                                            <span
                                                                key={tab.name}
                                                                onClick={tabClick}
                                                                className={classNames(
                                                                    tab.current
                                                                        ? 'border-blue-500 text-blue-600 cursor-pointer'
                                                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 cursor-pointer',
                                                                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer'
                                                                )}
                                                            >
                                                                {tab.name}
                                                            </span>
                                                        ))}
                                                    </nav>
                                                </div>
                                            </div>

                                            {/* General Tab Info */}
                                            {/* Description list with inline editing */}
                                            <div ref={generalRef}>
                                                <div className="mt-10 divide-y divide-gray-200">
                                                    <div className="space-y-1">
                                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
                                                        <p className="max-w-2xl text-sm text-gray-500">
                                                            This information will be displayed publicly so be careful what you share.
                                                        </p>
                                                    </div>
                                                    <div className="mt-6">
                                                        <dl className="divide-y divide-gray-200">
                                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                                                <dt className="text-sm font-medium text-gray-500">Name</dt>
                                                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                    <span className="flex-grow">{users.firstName + " " + users.lastName}</span>
                                                                    <span className="ml-4 flex-shrink-0">
                                                                        <button
                                                                            type="button"
                                                                            className="bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                                            onClick={() => openModal("name")}
                                                                        >
                                                                            Update
                                                                        </button>
                                                                    </span>
                                                                </dd>
                                                            </div>
                                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                                                                <dt className="text-sm font-medium text-gray-500">Photo</dt>
                                                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                    <span className="flex-grow">
                                                                        <img
                                                                            className="h-8 w-8 rounded-full"
                                                                            src={users.profilePicture}
                                                                            alt=""
                                                                        />
                                                                    </span>
                                                                    <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                                                                        <button
                                                                            type="button"
                                                                            className="bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                                            onClick={() => openModal("profile Picture")}
                                                                        >
                                                                            Update
                                                                        </button>
                                                                    </span>
                                                                </dd>
                                                            </div>
                                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                                                <dt className="text-sm font-medium text-gray-500">Username</dt>
                                                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                    <span className="flex-grow">{users.username}</span>
                                                                    <span className="ml-4 flex-shrink-0">
                                                                        <button
                                                                            type="button"
                                                                            className="bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                                            onClick={() => openModal("username")}
                                                                        >
                                                                            Update
                                                                        </button>
                                                                    </span>
                                                                </dd>
                                                            </div>
                                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                                                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                    <span className="flex-grow">{users.email}</span>
                                                                    <span className="ml-4 flex-shrink-0">
                                                                        <button
                                                                            type="button"
                                                                            className="bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                                            onClick={() => openModal("email")}
                                                                        >
                                                                            Update
                                                                        </button>
                                                                    </span>
                                                                </dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>

                                                <div className="mt-10 divide-y divide-gray-200">
                                                    <div className="space-y-1">
                                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Account</h3>
                                                        <p className="max-w-2xl text-sm text-gray-500">
                                                            Manage your account preferences.
                                                        </p>
                                                    </div>
                                                    <div className="mt-6">
                                                        <dl className="divide-y divide-gray-200">
                                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                                                <dt className="text-sm font-medium text-gray-500">Language</dt>
                                                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                    <span className="flex-grow">{users.language}</span>
                                                                    <span className="ml-4 flex-shrink-0">
                                                                        <button
                                                                            type="button"
                                                                            className="bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                                            onClick={() => openModal("language")}
                                                                        >
                                                                            Update
                                                                        </button>
                                                                    </span>
                                                                </dd>
                                                            </div>
                                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                                                                <dt className="text-sm font-medium text-gray-500">Birthday</dt>
                                                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                    <span className="flex-grow">MM-DD-YYYY</span>
                                                                    <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                                                                        <button
                                                                            type="button"
                                                                            className="bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                                            onClick={() => openModal("birthday")}
                                                                        >
                                                                            Update
                                                                        </button>
                                                                    </span>
                                                                </dd>
                                                            </div>
                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Security Tab Info */}
                                            <div className="mt-10 divide-y divide-gray-200 hidden" ref={securityRef}>
                                                <div className="space-y-1">
                                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Security</h3>
                                                    <p className="max-w-2xl text-sm text-gray-500">
                                                        Manage your password and two-factor authentication.
                                                    </p>
                                                </div>
                                                <div className="mt-6">
                                                    <dl className="divide-y divide-gray-200">
                                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                                            <dt className="text-sm font-medium text-gray-500">Password</dt>
                                                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <span className="flex-grow">Last changed 08/27/04</span>
                                                                <span className="ml-4 flex-shrink-0">
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                                        onClick={() => openModal("password")}
                                                                    >
                                                                        Update
                                                                    </button>
                                                                </span>
                                                            </dd>
                                                        </div>
                                                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                                                            <dt className="text-sm font-medium text-gray-500">2FA</dt>
                                                            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                <span className="flex-grow">Enabled</span>
                                                                <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                                    >
                                                                        Update
                                                                    </button>
                                                                    <span className="text-gray-300" aria-hidden="true">
                                                                        |
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        className="bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </span>
                                                            </dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    )
}


/*
var query = `query UpdateName($userId: ID!, $firstName: String!, $lastName: String!){
                    changeUserSettings (userInput: {_id: $userId, firstName: $firstName, lastName: $lastName}){
                      status
                      reason
                    }
                  }`;

                fetch('http://localhost:8000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query,
                        variables: { userId, firstName, lastName }
                    })
                })
                    .then(r => r.json())
                    .then(data => {
                        if (data.data.changeUserSettings.status) {
                            setOpen(false)
                        } else {
                            if (data.data.changeUserSettings.reason === undefined) {
                                error.current.innerHTML = "Network Error: Please try again."
                            }
                        }
                    });
*/