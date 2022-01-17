import React from 'react'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function OfferShares() {

    return (
        <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Do you want to offer shares?
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        Here are 3 easy ways to get started.
                    </p>
                </div>
                <div className="mt-10">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                        <div key="Contact" className="relative">
                            <dt>
                                <div className='flex justify-center mb-4'>
                                    <span className='icon-stack'>
                                        <FontAwesomeIcon icon={faCircle} className="absolute text-4xl"></FontAwesomeIcon>
                                        <span className="absolute left-[14px]">1</span>
                                    </span>
                                </div>
                                <p className="text-center text-lg leading-6 font-medium text-gray-900">Contact</p>
                            </dt>
                            <dd className="mt-2 lg:ml-16 text-base text-gray-500">Write an email to our email address <a href="mailto:tsega207@gmail.com" className='text-blue-700'>tsega207@gmail.com</a> saying you want to join
                                to transfer shares mention what shares and how much of that share you have.</dd>
                        </div>
                        <div key="Response" className="relative">
                            <dt>
                                <div className='flex justify-center mb-4'>
                                    <span className='icon-stack'>
                                        <FontAwesomeIcon icon={faCircle} className="absolute text-4xl"></FontAwesomeIcon>
                                        <span className="absolute left-[13px]">2</span>
                                    </span>
                                </div>
                                <p className="text-center text-lg leading-6 font-medium text-gray-900">Response</p>
                            </dt>
                            <dd className="mt-2 lg:ml-16 text-base text-gray-500">We will respond to your email. You may be asked by one of our agents to prove that your share certificate is authentic.</dd>
                        </div>
                        <div key="Start Offering" className="relative">
                            <dt>
                                <div className='flex justify-center mb-4'>
                                    <span className='icon-stack'>
                                        <FontAwesomeIcon icon={faCircle} className="absolute text-4xl"></FontAwesomeIcon>
                                        <span className="absolute left-[13px]">3</span>
                                    </span>
                                </div>
                                <p className="text-center text-lg leading-6 font-medium text-gray-900">Start Offering</p>
                            </dt>
                            <dd className="mt-2 lg:ml-16 text-base text-gray-500">After your shares are verifed we will provide you with an account to login using your email and a chosen password. You will then be able to start offering shares.</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}