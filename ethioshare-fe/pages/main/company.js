import React from "react";
import { Fragment, useState, useRef } from 'react'
import Link from "next/link";
import NavBar from '../../components/main/Navbar'

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
            <NavBar />
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