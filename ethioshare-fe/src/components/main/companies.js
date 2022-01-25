import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import axios from "axios"
import { CurrencyDollarIcon } from '@heroicons/react/solid'


export function TrendingCompanies({ active }) {

    const [companies, setCompanies] = useState([])

    const fetchData = () => {
        if (active) {
            axios.get("http://localhost:8000/companies/wd").then(res => {
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

    }

    useEffect(() => { fetchData() }, [])
    return !active ? (
        <nothing></nothing>
    ) : (
        <div className="flex flex-col mt-12 lg:mx-12 mx-5">
            <div className="mb-4 text-xl">Trending Companies</div>
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
                                        Sector
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
                                            <div className="text-md text-gray-900">{company.companySector}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-md text-gray-900">{company.companyPrice}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">{company.companyExchangeScore}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-md text-center font-medium">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Send<br />Request
                                                <CurrencyDollarIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}


export function SearchCompanies({ active }) {
    const [companies, setCompanies] = useState([])
    const fetchData = () => {
        if (active) {
            axios.get("http://localhost:8000/companies/wd").then(res => {
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
    }

    useEffect(() => { fetchData() }, [])
    return !active ? (
        <nothing></nothing>
    ) : (
        <div className="flex flex-col mt-12 lg:mx-12 mx-5">
            <div className="mb-4 text-xl">Companies</div>
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
                                        Sector
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
                                            <div className="text-md text-gray-900">{company.companySector}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-md text-gray-900">{company.companyPrice}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">{company.companyExchangeScore}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-md text-center font-medium">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Send<br />Request
                                                <CurrencyDollarIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <nav
                            className="bg-white px-4 py-3 mt-5 flex items-center justify-between border-t border-gray-200 sm:px-6"
                            aria-label="Pagination"
                        >
                            <div className="hidden sm:block">
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                                    <span className="font-medium">20</span> results
                                </p>
                            </div>
                            <div className="flex-1 flex justify-between sm:justify-end">
                                <a
                                    href="#"
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Previous
                                </a>
                                <a
                                    href="#"
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Next
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}