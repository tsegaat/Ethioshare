import React, { useEffect, useState } from "react";
import Link from "next/link"
import axios from "axios"
import { CurrencyDollarIcon } from '@heroicons/react/solid'
import { useRouter } from "next/router";


export default function Companies({ name, companies }) {
    // FIXME Not working for some reason!
    const [trendingCompanies, setTrendingCompanies] = useState([])
    const route = useRouter()

    const fetchData = () => {
        axios.get("http://localhost:8000/companies/wd").then(res => {
            const displayableCompanies = []
            res.data.forEach(company => {
                displayableCompanies.push({
                    _id: company._id.toString(),
                    companyName: company.companyName.charAt(0).toUpperCase() + company.companyName.slice(1),
                    companyEmail: company.companyEmail,
                    companySector: company.companySector.charAt(0).toUpperCase() + company.companySector.slice(1),
                    companyLogo: company.companyLogo,
                    companyPrice: company.companyPrice.toString() + " " + "ETB",
                    companyExchangeScore: company.companyExchangeScore.toString() + "%",
                })
            })
            setTrendingCompanies(displayableCompanies)
        })
    }

    const sendReq = (companyId) => {
        localStorage.companyId = companyId
        route.push("/main/company")
    }

    useEffect(() => { fetchData() }, [])
    return (
        <div className="flex flex-col mt-12 lg:mx-12 mx-5">
            <div className="mb-4 text-xl">{name}</div>
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
                                {(name !== "Trending Companies") ? companies && companies.map((company, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-11 w-11" src={company.companyLogo} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-md font-medium text-gray-900">{company.companyName.charAt(0).toUpperCase() + company.companyName.slice(1)}</div>
                                                    <div className="text-sm text-gray-500">{company.companyEmail}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-md text-gray-900">{company.companySector.charAt(0).toUpperCase() + company.companySector.slice(1)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-md text-gray-900">{company.companyPrice + " " + "ETB"}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">{company.companyExchangeScore.toString() + "%"}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-md text-center font-medium">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                onClick={() => sendReq(company._id)}>
                                                Send<br />Request
                                                <CurrencyDollarIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                                            </button>
                                        </td>
                                    </tr>
                                )) :
                                    trendingCompanies && trendingCompanies.map((company, index) => (
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
                                                    onClick={() => sendReq(company._id)}
                                                >
                                                    Send<br />Request
                                                    <CurrencyDollarIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
                                                </button>
                                            </td>
                                        </tr>))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}