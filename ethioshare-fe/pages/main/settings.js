import React from 'react'
import { useState, useRef } from 'react'
import { Switch } from '@headlessui/react'
import NavBar from '../../components/main/Navbar'
import Cookies from 'universal-cookie'
const cookie = new Cookies()
import axios from 'axios'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Settings() {
    const [users, setUsers] = useState({ firstName: "", lastName: "", username: "", email: "" })
    const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] = useState(false)
    const [tabCurrent, setTabCurrent] = useState([true, false, false])
    const generalRef = useRef()
    const securityRef = useRef()

    const tabs = [
        { name: 'General', href: '#', current: tabCurrent[0] },
        { name: 'Security', href: '#', current: tabCurrent[1] },
    ]

    const userId = cookie.get('userId')
    axios.post('http://localhost:8000/users/getUser', { userId }).then(res => {
        // FIXME: Check what is coming from the backend before displaying it
        setUsers(res.data)
    })

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
                                                                    <span className="flex-grow">{users.username}</span>
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
                                                                    <span className="flex-grow">{users.email}</span>
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
