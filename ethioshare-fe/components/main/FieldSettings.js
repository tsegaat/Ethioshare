import React from "react";
import { useRef } from "react";

const FieldModal = ({ field }) => {
    const body = useRef()
    console.log(body)

    return (
        <>
            <div ref={body}>
                <div className="mt-6">
                    <div className="mt-1">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder={"New" + " " + field.name}
                        />
                    </div>

                    <div className='mt-4 hidden'>
                        <p className='text-sm text-left text-red-900'>{"Invalid" + " " + field.name}</p>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="mt-1">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder={"New" + " " + field.name}
                        />
                    </div>

                    <div className='mt-4 hidden'>
                        <p className='text-sm text-left text-red-900'>{"Invalid" + " " + field.name}</p>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="mt-1">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder={"New" + " " + field.name}
                        />
                    </div>

                    <div className='mt-4 hidden'>
                        <p className='text-sm text-left text-red-900'>{"Invalid" + " " + field.name}</p>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="mt-1">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder={"New" + " " + field.name}
                        />
                    </div>

                    <div className='mt-4 hidden'>
                        <p className='text-sm text-left text-red-900'>{"Invalid" + " " + field.name}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FieldModal