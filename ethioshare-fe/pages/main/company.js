import React from "react";
import { Fragment, useState, useRef } from 'react'
import Link from "next/link";
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

const product = {
    name: 'Basic Tee 6-Pack',
    price: '192 ETB',
    sizes: [
        { name: '50', inStock: true },
        { name: '100', inStock: true },
        { name: '150', inStock: true },
        { name: '300', inStock: true },
        { name: '400', inStock: true },
        { name: '500', inStock: true },
        { name: '600', inStock: true },
        { name: '1000', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Company() {
    const premiumRef = useRef()

    const premiumOptions = (e) => {
        const premium = e.target.innerHTML
        premiumRef.current.value = premium
    }
    return (
        <div className="flex flex-col flex-1">
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
            <hr className='bg-black'></hr>
            <div className="pt-6">
                {/* Product info */}
                <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:mt-0 lg:row-span-3">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl text-gray-900">{product.price}</p>

                        <form className="mt-10">
                            <h3 className="text-base text-gray-900 mb-1 font-medium">Premium</h3>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="rounded"
                                    ref={premiumRef}
                                    min={0}
                                />
                                <span className="absolute input-ETB-position">ETB</span>
                            </div>

                            {/* Sizes */}
                            <div>
                                <div className="mt-4">
                                    <label className="sr-only">Choose a Premium</label>
                                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                        {product.sizes.map((size) => (
                                            <div
                                                key={size.name}
                                                value={size}
                                                onClick={premiumOptions}
                                                className="bg-white shadow-sm text-gray-900 cursor-pointer group relative border rounded-md py-1 px-2 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-3"
                                            >
                                                {size.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="mt-10 w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Submit Buy Request
                            </button>
                        </form>
                    </div>

                    <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        {/* Description and details */}
                        <div className="lg:flex items-center">
                            <div className="flex-shrink-0 lg:w-48">
                                <img className="object-contain" src="https://res.cloudinary.com/ethioshare/image/upload/v1642786392/companies/Yes%20Mineral%20Water.jpg" />
                            </div>
                            <div className="lg:ml-4">
                                <h3 className="sr-only">Description</h3>
                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{product.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10">
                            <h2 className="text-lg font-medium text-gray-900">Exchange Score</h2>

                            <div className="mt-4 space-y-6">
                                <p className="text-base text-gray-600">{product.details}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}