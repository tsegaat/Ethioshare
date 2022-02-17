import React, { useEffect, Fragment, useState } from "react";
import Link from 'next/link'
import axios from "axios"
import { CurrencyDollarIcon, SearchIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { Transition, Menu } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function BuyerRequests() {

    const [companies, setCompanies] = useState([])

    const fetchData = () => {
        axios.get("http://localhost:8000/companies/d").then(res => {
            const displayableCompanies = []
            res.data.forEach(company => {
                displayableCompanies.push({
                    companyName: company.companyName.charAt(0).toUpperCase() + company.companyName.slice(1),
                    companyEmail: company.companyEmail,
                    companySector: company.companySector.charAt(0).toUpperCase() + company.companySector.slice(1),
                    // Can edit logo abit here
                    companyLogo: company.companyLogo,
                    companyPrice: company.companyPrice.toString() + " " + "ETB",
                    companyExchangeScore: company.companyExchangeScore.toString() + "%",
                })
            })
            setCompanies(displayableCompanies)
        })
    }

    useEffect(() => { fetchData() }, [])

    return (
        <>
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
            <div className="flex-1 flex px-4 md:px-0 mt-6">
                <div className="justify-center flex flex-1">
                    <form className="flex md:ml-0" action="#" method="GET">
                        <label htmlFor="mobile-search-field" className="sr-only">
                            Search
                        </label>
                        <label htmlFor="desktop-search-field" className="sr-only">
                            Search
                        </label>
                        <div className="border-2 pl-2 py-1 rounded-lg rounded-r-2xl">
                            <div className="relative text-gray-400 focus-within:text-gray-600 ">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                                    <SearchIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                                </div>
                                <input
                                    name="mobile-search-field"
                                    id="mobile-search-field"
                                    className="h-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:hidden"
                                    placeholder="Search"
                                    type="search"
                                />
                                <input
                                    name="desktop-search-field"
                                    id="desktop-search-field"
                                    className="hidden h-full w-96 border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:block"
                                    placeholder="Search Company"
                                    type="search"
                                />
                                <div
                                    className="cursor-pointer absolute inset-y-0 right-0 flex items-center bg-blue-700 p-2 rounded rounded-r-xl text-white"
                                >
                                    Search
                                </div>
                            </div>
                        </div>

                    </form>
                </div>

            </div>
            <div className="flex flex-col mt-12 mx-12">
                <div className="mb-4 text-xl">Buyer Requests</div>
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            User
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Sector
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Premium
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Exchange Score
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Exchange</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {companies && companies.map((company, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-11 w-11" src={company.companyLogo} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-md font-medium text-gray-900">{company.companyName}</div>
                                                        <div className="text-sm text-gray-500">{company.companyEmail}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-md text-gray-900">Username</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-md text-gray-900">{company.companySector}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-md text-gray-900">100 ETB</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-md text-gray-900">{company.companyPrice}</div>
                                            </td>
                                            <td className="px-6 py-4 text-center">{company.companyExchangeScore}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-md text-center font-medium">
                                                <Link href="create">
                                                    <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                        Send<br />Request
                                                        <CurrencyDollarIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
