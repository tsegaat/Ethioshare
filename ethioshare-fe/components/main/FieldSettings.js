import React from "react";
import { useState, useRef } from "react";

const FieldModal = ({ field }) => {
    const [profilePic, setProfilePic] = useState({ showDetails: "block", picture: false })
    const body = useRef()
    const pPSubmit = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onload = () => {
            setProfilePic({ showDetails: "none", picture: reader.result })
        }
    }

    const dragged = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onload = () => {
            setProfilePic({ showDetails: "none", picture: reader.result })
        }
    }
    console.log(field)
    switch (field) {
        case "Name":
            return (
                <div id="name">
                    <div className="mt-6">
                        <div className="mt-1">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder={"First Name"}
                            />
                        </div>
                        <div className="mt-5">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder={"Last Name"}
                            />
                        </div>

                        <div className='mt-4 hidden'>
                            <p className='text-sm text-left text-red-900'>Invalid Something</p>
                        </div>
                    </div>
                </div>
            )
        case "Profile Picture":
            return (
                <div id="photo">
                    <div className="mt-6">
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md" onDrop={dragged} onDragOver={(e) => e.preventDefault()} style={{ "backgroundImage": `url(${profilePic.picture})`, "backgroundPosition": "center", "backgroundRepeat": "no-repeat", "backgroundSize": "contain" }}>
                                <div className="space-y-1 text-center" >
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div style={{ "display": `${profilePic.showDetails}` }}>
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer bg-white font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none0"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" accept="image/png, image/jpeg, image/jpg, image/gif" className="sr-only" onChange={pPSubmit} />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        case "Username":
            return (
                <div id="username">
                    <div className="mt-6">
                        <div className="mt-1">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder={"New Username"}
                            />
                        </div>

                        <div className='mt-4 hidden'>
                            <p className='text-sm text-left text-red-900'>Something</p>
                        </div>
                    </div>
                </div>
            )
        case "Email":
            return (
                <div id="email">
                    <div className="mt-6">
                        <div className="mt-1">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="New Email"
                            />
                        </div>

                        <div className="mt-5">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Confirm Email"
                            />
                        </div>

                        <div className='mt-4 hidden'>
                            <p className='text-sm text-left text-red-900'>{"Invalid Email"}</p>
                        </div>
                    </div>
                </div>
            )
        case "Language":
            return (
                <div id="language">
                    <div className="mt-6">
                        <div className="mt-1">
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 text-left mb-2">
                                    Language
                                </label>
                                <select
                                    id="location"
                                    name="location"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    defaultValue="English"
                                >
                                    <option>English</option>
                                    <option>Amharic</option>
                                </select>
                            </div>
                        </div>

                        <div className='mt-4 hidden'>
                            <p className='text-sm text-left text-red-900'>{"Invalid Email"}</p>
                        </div>
                    </div>
                </div>
            )
        case "Birthday":
            return (
                <div id="birthday">
                    <div className="mt-6">
                        <div className="mt-1">
                            <input
                                type="date"
                                name="username"
                                id="username"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <div className='mt-4 hidden'>
                            <p className='text-sm text-left text-red-900'>{"Invalid Email"}</p>
                        </div>
                    </div>
                </div>
            )
        case "Password":
            return (
                <div id="password">
                    <div className="mt-6">
                        <div className="mt-1">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Current Password"
                            />
                        </div>

                        <div className="mt-5">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="New Password"
                            />
                        </div>

                        <div className="mt-5">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Confirm New Password"
                            />
                        </div>

                        <div className='mt-4 hidden'>
                            <p className='text-sm text-left text-red-900'>{"Invalid Email"}</p>
                        </div>
                    </div>
                </div>
            )
    }
}

export default FieldModal


