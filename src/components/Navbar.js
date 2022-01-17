import React from 'react'
import { Disclosure, Menu } from '@headlessui/react'

export default function Navbar() {
    return (
        <Disclosure as="nav" className="gradient pt-1.5">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <img
                            className="block lg:block h-8 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                            alt="Ethioshare"
                        />
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="hidden sm:block h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                alt="Ethioshare"
                            />
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                            type="button"
                            className=" p-1"
                        >
                            Sign In
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-3 relative">
                            <div>
                                <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <span className="sr-only">Open user menu</span>
                                    <button className='bg-blue-700 text-white pointer px-2.5 py-2.5 rounded-md'>Get Started</button>
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
