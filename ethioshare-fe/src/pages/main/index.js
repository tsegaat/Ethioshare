import React from 'react'
import { Fragment, useState, useRef } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
    BellIcon,
    CogIcon,
    QuestionMarkCircleIcon,
    ShieldCheckIcon,
} from '@heroicons/react/outline'
import {
    ChevronDownIcon,
} from '@heroicons/react/solid'
import { Redirect } from "@reach/router"
import { Companies } from '../../components/main/companies'

const secondaryNavigation = [
    { name: 'Settings', href: '#', icon: CogIcon },
    { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
    { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Main({ location }) {
    const { showPage } = location.state || false

    const [companiesParameters, setCompanyParameters] = useState([{ trending: true }])
    const mobileFormRef = useRef()
    const desktopFormRef = useRef()

    // FIXME: Implement a better way to search for the mobile and desktop version witout creating 2 seprate functions

    const searchMobile = (e) => {
        e.preventDefault()
        const formElements = []
        for (let i = 0; i < 3; i++) {
            formElements.push(mobileFormRef.current.children[i])
        }

        const companyName = formElements[0].children[1].children[0].value.toLowerCase()
        const companySector = formElements[1].children[1].children[0].value.toLowerCase()
        const companyPrice = (formElements[2].children[1].children[0].value !== "") ? parseFloat(formElements[2].children[1].children[0].value) : 0

        console.log(formElements)

        // The query is where you send the user data and recive the data from the backend
        var query = `query GetCompany($companyName: String, $companySector: String, $companyPrice: Float){
            company(companyInput: {companyName: $companyName, companyPrice: $companyPrice, companySector: $companySector}){
                _id
                companyName
                companyPrice
                companySector
                companyEmail
                companyLogo
                companyExchangeScore
            }
          }`;

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: { companyName, companyPrice, companySector }
            })
        })
            .then(r => r.json())
            .then(data => {
                const companies = data.data.company
                setCompanyParameters([{
                    trending: false,
                    companies
                }])
            });
    }

    const searchDesktop = (e) => {
        e.preventDefault()
        const formElements = []
        for (let i = 0; i < 3; i++) {
            formElements.push(desktopFormRef.current.children[i])
        }

        const companyName = formElements[0].children[1].children[0].value.toLowerCase()
        const companySector = formElements[1].children[1].children[0].value.toLowerCase()
        const companyPrice = (formElements[2].children[1].children[0].value !== "") ? parseFloat(formElements[2].children[1].children[0].value) : 0

        console.log(formElements)

        // The query is where you send the user data and recive the data from the backend
        var query = `query GetCompany($companyName: String, $companySector: String, $companyPrice: Float){
            company(companyInput: {companyName: $companyName, companyPrice: $companyPrice, companySector: $companySector}){
                _id
                companyName
                companyPrice
                companySector
                companyEmail
                companyLogo
                companyExchangeScore
            }
          }`;

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: { companyName, companyPrice, companySector }
            })
        })
            .then(r => r.json())
            .then(data => {
                const companies = data.data.company
                setCompanyParameters([{
                    trending: false,
                    companies
                }])
            });
    }


    return !showPage ? (
        <Redirect noThrow to="../sign-in" />
    ) : (

        <>
            <div className="min-h-full">
                {/* Static sidebar for desktop */}
                <div className="hidden lg:flex lg:w-72 bg-gray-100 lg:flex-col lg:fixed lg:inset-y-0">
                    <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4 mb-10">
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                alt="Easywire logo"
                            />
                        </div>
                        <nav className="mt-10" aria-label="Sidebar">
                            <form onSubmit={searchDesktop} ref={desktopFormRef}>
                                <div className="px-5 space-y-1 mb-8">
                                    <label
                                        htmlFor="name"
                                        className="-mt-px inline-block px-1 bg-grey-100 text-base font-bold text-gray-900"
                                    >
                                        Company Name
                                    </label>
                                    <div className="relative bg-white border border-gray-300 rounded-md px-2 py-1 shadow-sm focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600">

                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            autoComplete="off"
                                            className="block w-full border-0 text-gray-900 focus:ring-0 lg:text-base text-sm"
                                            placeholder="Zemen Bank"
                                        />
                                    </div>
                                </div>
                                <div className="px-5 space-y-1 mb-8">
                                    <label
                                        htmlFor="name"
                                        className="-mt-px inline-block px-1 bg-grey-100 text-base font-bold text-gray-900"
                                    >
                                        Sector
                                    </label>
                                    <div className="relative bg-white border border-gray-300 rounded-md px-2 py-1 shadow-sm focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600">

                                        <input
                                            type="text"
                                            name="name"
                                            id="sector"
                                            autoComplete="off"
                                            list='sectors'
                                            className="block w-full border-0 text-gray-900 focus:ring-0 lg:text-base text-sm"
                                            placeholder="Agriculture"
                                        />
                                        <datalist id="sectors">
                                            <option key={"bank"}>Bank</option>
                                        </datalist>
                                    </div>
                                </div>
                                <div className="px-5 space-y-1 mb-8">
                                    <label
                                        htmlFor="name"
                                        className="-mt-px inline-block px-1 bg-grey-100 text-base font-bold text-gray-900"
                                    >
                                        I want to spend
                                    </label>
                                    <div className="relative bg-white border border-gray-300 rounded-md px-2 py-1 shadow-sm focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600">
                                        <input
                                            type="number"
                                            name="name"
                                            id="name"
                                            step="any"
                                            min={1}
                                            autoComplete="off"
                                            className="block w-full border-0 text-gray-900 focus:ring-0 lg:text-base text-sm"
                                            placeholder="Any Amount"
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 lg:text-base text-sm" id="price-currency">
                                                ETB
                                            </span>
                                        </div>
                                    </div>

                                </div>
                                <div className="px-5 space-y-1 mb-8">
                                    <div className='relative'>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center w-full px-4 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Find Companies

                                        </button>

                                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-[13px] left-[210px] h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </form>
                        </nav>
                    </div>
                    <hr className='bg-gray-100'></hr>
                    <div className="mb-6 pt-6">
                        <div className="px-2 space-y-1">
                            {secondaryNavigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md hover:text-white hover:bg-blue-600"
                                >
                                    <item.icon className="mr-4 h-6 w-6" aria-hidden="true" />
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:pl-64 flex flex-col flex-1">
                    <div className="relative z-10 flex-shrink-0 flex h-16 border-gray-200 lg:border-none">
                        <div className='absolute inset-y-0 left-0 flex pl-4 items-center'>
                            <img
                                className="h-8 w-auto lg:hidden"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Easywire logo"
                            />
                        </div>
                        {/* FIXME: When in Ipad show Logo with the text */}
                        <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
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
                                                    <a
                                                        href="#"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Settings
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
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
                    <main className="flex-1 pb-8">
                        {/* Page header */}
                        <div className="bg-white">
                            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
                                <div className="lg:border-t lg:border-gray-200">
                                    <div className="flex-1 min-w-0">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:mx-12 pb-3">
                                <h6 className="text-5xl leading-[1.5em] font-bold text-gray-900">Exchange Company Shares</h6>
                                <h2 className="text-lg font-medium text-gray-600">Make buy requests and secure your shares!</h2>
                            </div>
                            {/* Mobile Version of the filter */}
                            <div className="lg:hidden lg:flex lg:w-72 lg:flex-col lg:inset-y-0">
                                <div className="flex flex-col flex-grow overflow-y-auto">

                                    <nav className="mt-10" aria-label="Sidebar">
                                        <form onSubmit={searchMobile} ref={mobileFormRef}>
                                            <div className="px-5 space-y-1 mb-8">
                                                <label
                                                    htmlFor="name"
                                                    className="-mt-px inline-block px-1 bg-grey-100 text-base font-bold text-gray-900"
                                                >
                                                    Company Name
                                                </label>
                                                <div className="relative bg-white border border-gray-300 rounded-md px-2 py-1 shadow-sm focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600">

                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        autoComplete="off"
                                                        className="block w-full border-0 text-gray-900 focus:ring-0 lg:text-base text-sm"
                                                        placeholder="Zemen Bank"
                                                    />
                                                </div>
                                            </div>
                                            <div className="px-5 space-y-1 mb-8">
                                                <label
                                                    htmlFor="name"
                                                    className="-mt-px inline-block px-1 bg-grey-100 text-base font-bold text-gray-900"
                                                >
                                                    Sector
                                                </label>
                                                <div className="relative bg-white border border-gray-300 rounded-md px-2 py-1 shadow-sm focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600">

                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="sector"
                                                        autoComplete="off"
                                                        list='sectors'
                                                        className="block w-full border-0 text-gray-900 focus:ring-0 lg:text-base text-sm"
                                                        placeholder="Agriculture"
                                                    />
                                                    <datalist id="sectors">
                                                        {/* TODO Get the sectors from the DB and show here  */}
                                                        <option key={"bank"}>Bank</option>
                                                    </datalist>
                                                </div>
                                            </div>
                                            <div className="px-5 space-y-1 mb-8">
                                                <label
                                                    htmlFor="name"
                                                    className="-mt-px inline-block px-1 bg-grey-100 text-base font-bold text-gray-900"
                                                >
                                                    I want to spend
                                                </label>
                                                <div className="relative bg-white border border-gray-300 rounded-md px-2 py-1 shadow-sm focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600">
                                                    <input
                                                        type="number"
                                                        name="name"
                                                        id="name"
                                                        step="any"
                                                        min={1}
                                                        autoComplete="off"
                                                        className="block w-full border-0 text-gray-900 focus:ring-0 lg:text-base text-sm"
                                                        placeholder="Any Amount"
                                                    />
                                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                        <span className="text-gray-500 lg:text-base text-sm" id="price-currency">
                                                            ETB
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="px-5 space-y-1 mb-8">
                                                <div className='relative'>
                                                    <button
                                                        type="submit"
                                                        className="inline-flex items-center w-full px-4 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    >
                                                        Find Companies

                                                    </button>
                                                    {/* TODO: Better way to allign the icon at the end */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-[13px] left-[280px] h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </form>
                                    </nav>
                                </div>

                            </div>
                            {/* Activity table (small breakpoint and up) */}
                            {companiesParameters.map((companyParameters) => {
                                return !companyParameters.trending ? <Companies name="Companies" companies={companyParameters.companies}></Companies> : <Companies name="Trending Companies"></Companies>
                            }
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>

    )
}