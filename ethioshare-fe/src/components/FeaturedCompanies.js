import React from "react";
import { Link } from "@reach/router";

const companies = [
    {
        name: 'Zemen Bank',
        title: '493.2 ETB',
        department: 'Optimization',
        role: '80%',
        email: 'zemen@bank.com',
        image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Coca Cola',
        title: '312.2 ETB',
        department: 'Optimization',
        role: '36%',
        email: 'cocacola@cola.com',
        image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Awash Bank',
        title: '43.2 ETB',
        department: 'Optimization',
        role: '63%',
        email: 'jane.cooper@example.com',
        image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'Dashen Bank',
        title: '262.6 ETB',
        department: 'Optimization',
        role: '70%',
        email: 'dashen@bankk.com',
        image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        name: 'ATK',
        title: '472.8 ETB',
        department: 'Optimization',
        role: '55%',
        email: 'atk-bi@atk.com',
        image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    // More people...
]

export default function FeaturedCompanies() {
    return (
        <div className="flex flex-col mt-12 mx-12">
            <div className="mb-4 text-xl">Featured Companies</div>
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
                                        Price
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Exchange Score
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Exchange</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {companies.map((company) => (
                                    <tr key={company.email}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-11 w-12" src={company.image} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-md font-medium text-gray-900">{company.name}</div>
                                                    <div className="text-sm text-gray-500">{company.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-md text-gray-900">{company.title}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">{company.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-md text-center font-medium">
                                            <Link to="create" className="text-blue-600 hover:text-blue-700 hover:underline">
                                                Exchange
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
    )
}
