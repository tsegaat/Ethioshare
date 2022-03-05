import React from 'react'
import Link from 'next/link'
import { useState, useRef } from 'react'
import {
    CogIcon,
    QuestionMarkCircleIcon,
    ShieldCheckIcon,
} from '@heroicons/react/outline'
import Companies from '../../components/main/companies'
import NavBar from '../../components/main/Navbar'
import Cookies from 'universal-cookie'
const cookie = new Cookies

export default function Main() {
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

        // The query is where you send the user data and receive the data from the backend
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

    return (

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
                            <div
                                className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md hover:text-white hover:bg-blue-600"
                            >
                                <CogIcon className="mr-4 h-6 w-6" aria-hidden="true" />
                                <Link href="/main/settings">Settings</Link>
                            </div>
                            <a
                                className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md hover:text-white hover:bg-blue-600"
                            >
                                <QuestionMarkCircleIcon className="mr-4 h-6 w-6" aria-hidden="true" />
                                Help
                            </a>
                            <a
                                className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md hover:text-white hover:bg-blue-600"
                            >
                                <ShieldCheckIcon className="mr-4 h-6 w-6" aria-hidden="true" />
                                Privacy
                            </a>
                        </div>
                    </div>
                </div>

                <div className="lg:pl-64 flex flex-col flex-1">
                    <NavBar main />
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
                                                    {/* TODO: Better way to align the icon at the end */}
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