import React from 'react'
import { Disclosure, Menu } from '@headlessui/react'
import { Link } from 'gatsby'

export default function Navbar() {
    const page = window.location.href.split("//")[1].split("/")[1]

    const navigation = {
        "indexCreate": <Link to="/create">Get Started</Link>,
        "indexSign-in": <Link to="/sign-in">Sign In</Link>,
        "createSign-in": <Link to="../sign-in">Sign In</Link>,
        "createCreate": <Link to="/create">Get Started</Link>,
        "sign-inCreate": <Link to="../create">Get Started</Link>,
        "sign-inSign-in": <Link to="/sign-in">Sign In</Link>
    }

    const links = []
    if (page == "create") {
        links.push(navigation['createSign-in'], navigation['createCreate'])
    } else if (page == "sign-in") {
        links.push(navigation['sign-inSign-in'], navigation['sign-inCreate'])
    } else {
        links.push(navigation['indexSign-in'], navigation['indexCreate'])
    }
    return (
        <Disclosure as="nav" className="gradient pt-1.5">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <Link to="/">
                            <img
                                className="block lg:block h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Ethioshare"
                            />
                        </Link>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/">
                                <img
                                    className="hidden sm:block h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                    alt="Ethioshare"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                            type="button"
                            className=" p-1"
                        >
                            {links[0]}
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-3 relative">
                            <div>
                                <Menu.Button className="bg-gray-800 flex text-sm rounded-full">
                                    <button className='bg-blue-700 text-white pointer px-2.5 py-2.5 rounded-md'>{links[1]}</button>
                                </Menu.Button>
                            </div>
                        </Menu>
                    </div>
                </div>
            </div>
            <hr className='border-black'></hr>
        </Disclosure>
    )
}
