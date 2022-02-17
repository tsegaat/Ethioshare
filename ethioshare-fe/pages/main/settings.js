import React from 'react'
import { Fragment, useState, useRef } from 'react'
import { Switch, Transition, Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import {
    BellIcon,
} from '@heroicons/react/outline'
import Link from 'next/link'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Settings() {
    const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] = useState(false)
    const [tabCurrent, setTabCurrent] = useState([true, false, false])
    const generalRef = useRef()
    const securityRef = useRef()

    const tabs = [
        { name: 'General', href: '#', current: tabCurrent[0] },
        { name: 'Security', href: '#', current: tabCurrent[1] },
    ]

    function tabClick(e) {
        const tabName = (e.target.innerHTML.charAt(0) === "<") ? e.target.value : e.target.innerHTML
        const tabBools = [false, false, false]
        tabs.map((tab, index) => {
            if (tab.name == tabName) {
                tabBools[index] = true
                setTabCurrent(tabBools)
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
    return (
        <>
            <div>
                {/* NavBar */}
                <div className="relative z-10 flex-shrink-0 flex h-16 border-gray-200 mx-2 lg:border-none">
                    <div className='absolute inset-y-0 left-0 flex pl-4 items-center'>
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
                    {/* FIXME: When in Ipad show Logo with the text */}
                    <div className="flex-1 px-4 flex justify-between sm:px-3 lg:mx-auto lg:px-4">
                        <div className="flex-1 flex">
                        </div>
                        <div className="ml-4 flex items-center md:ml-6">
                            <button
                                type="button"
                                className="bg-white p-1 rounded-full text-gray-400 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <span className="sr-only">View notifications</span>
                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Profile dropdown */}
                            <Menu as="div" className="ml-3 relative">
                                <div>
                                    <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                        <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                                            <span className="sr-only">Open user menu for </span>Emilia Birch
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
                                                <a
                                                    href="#"
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Your Profile
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <div
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    <Link href="/main/settings">Settings</Link>
                                                </div>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <div
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
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
                                                                    <span className="flex-grow">Chelsea Hagon</span>
                                                                    <span className="ml-4 flex-shrink-0">
                                                                        <button
                                                                            type="button"
                                                                            className="bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                                                                            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                                            alt=""
                                                                        />
                                                                    </span>
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
                                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                                                <dt className="text-sm font-medium text-gray-500">Username</dt>
                                                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                    <span className="flex-grow">Chelsea</span>
                                                                    <span className="ml-4 flex-shrink-0">
                                                                        <button
                                                                            type="button"
                                                                            className="bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                                        >
                                                                            Update
                                                                        </button>
                                                                    </span>
                                                                </dd>
                                                            </div>
                                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                                                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                    <span className="flex-grow">chelsea.hagon@example.com</span>
                                                                    <span className="ml-4 flex-shrink-0">
                                                                        <button
                                                                            type="button"
                                                                            className="bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                                                                    <span className="flex-grow">English</span>
                                                                    <span className="ml-4 flex-shrink-0">
                                                                        <button
                                                                            type="button"
                                                                            className="bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                                        >
                                                                            Update
                                                                        </button>
                                                                    </span>
                                                                </dd>
                                                            </div>
                                                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                                                                <dt className="text-sm font-medium text-gray-500">Birthday</dt>
                                                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                    <span className="flex-grow">DD-MM-YYYY</span>
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

                                                            <Switch.Group
                                                                as="div"
                                                                className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200"
                                                            >
                                                                <Switch.Label as="dt" className="text-sm font-medium text-gray-500" passive>
                                                                    Auto-update applicant data
                                                                </Switch.Label>
                                                                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                                    <Switch
                                                                        checked={autoUpdateApplicantDataEnabled}
                                                                        onChange={setAutoUpdateApplicantDataEnabled}
                                                                        className={classNames(
                                                                            autoUpdateApplicantDataEnabled ? 'bg-blue-600' : 'bg-gray-200',
                                                                            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-auto'
                                                                        )}
                                                                    >
                                                                        <span
                                                                            aria-hidden="true"
                                                                            className={classNames(
                                                                                autoUpdateApplicantDataEnabled ? 'translate-x-5' : 'translate-x-0',
                                                                                'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                                                            )}
                                                                        />
                                                                    </Switch>
                                                                </dd>
                                                            </Switch.Group>
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
