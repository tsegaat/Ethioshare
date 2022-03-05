import { React, Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Cookie from 'universal-cookie'
import { useRouter } from "next/router";
import axios from "axios"


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const NavBar = ({ main }) => {
    const router = useRouter()
    const cookies = new Cookie();
    const userId = cookies.get('userId')
    const [user, setUser] = useState({ firstName: "", lastName: "" })
    const logout = () => {
        cookies.remove('userId')
        cookies.remove('accessToken')
        cookies.remove('refreshToken')
        router.push('/')
    }

    useEffect(() => {
        axios.post('http://localhost:8000/users/getUser', { userId }).then((res) => {
            const { firstName, lastName, profilePicture } = res.data
            setUser({ firstName, lastName, profilePicture })
        })
    }, [])



    return (!main) ? (
        <div className="relative z-10 flex-shrink-0 flex h-16 border-gray-200 mx-2 lg:border-none">
            <Link href="/main">
                <div className='absolute inset-y-0 left-0 flex pl-4 items-center cursor-pointer'>
                    <img
                        className="h-8 w-auto lg:block hidden"
                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                        alt="Easywire logo"
                    />
                    <img
                        className="h-8 w-auto lg:hidden"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Easywire logo"
                    />
                </div>
            </Link>
            {/* FIXME: When in Ipad show Logo with the text */}
            <div className="flex-1 px-4 flex justify-between sm:px-3 lg:mx-auto lg:px-4">
                <div className="flex-1 flex">
                </div>
                <div className="ml-4 flex items-center md:ml-6">
                    <Link href="/main/buyer_requests">
                        <button
                            type="button"
                            className="bg-white text-black p-1 rounded-full underline underline-offset-2 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-blue-500"
                        >
                            <span className="sr-only">Buyer Requests</span>
                            Buyer Requests
                        </button>
                    </Link>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                        <div>
                            <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src={user.profilePicture}
                                    alt=""
                                />
                                <span className="hidden ml-3 text-gray-700 text-sm text-black font-medium lg:block">
                                    <span className="sr-only">Open user menu for </span>{user.firstName + " " + user.lastName}
                                </span>
                                <ChevronDownIcon
                                    className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                                <Menu.Item>
                                    {({ active }) => (
                                        <div
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                        >
                                            <Link href="/main/settings">Settings</Link>
                                        </div>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <div
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                            onClick={logout}
                                        >
                                            Logout
                                        </div>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </div>
    ) : (
        <div className="relative z-10 flex-shrink-0 flex h-16 border-gray-200 lg:border-none">
            <Link href="/main">
                <div className='absolute inset-y-0 left-0 flex pl-4 items-center'>
                    <img
                        className="h-8 w-auto lg:hidden"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Easywire logo"
                    />
                </div>
            </Link>
            {/* FIXME: When in Ipad show Logo with the text */}
            <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                <div className="flex-1 flex">
                </div>
                <div className="ml-4 flex items-center md:ml-6">
                    <Link href="/main/buyer_requests">
                        <button
                            type="button"
                            className="bg-white text-black p-1 rounded-full underline underline-offset-2 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-blue-500"
                        >
                            <span className="sr-only">Buyer Requests</span>
                            Buyer Requests
                        </button>
                    </Link>
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                        <div>
                            <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src={user.profilePicture}
                                    alt=""
                                />
                                <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                                    <span className="sr-only">Open user menu for </span>{user.firstName + " " + user.lastName}
                                </span>
                                <ChevronDownIcon
                                    className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                                <Menu.Item>
                                    {({ active }) => (
                                        <div
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                        >
                                            <Link href="/main/settings">
                                                Settings
                                            </Link>
                                        </div>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                            onClick={logout}
                                        >
                                            Logout
                                        </a>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default NavBar;