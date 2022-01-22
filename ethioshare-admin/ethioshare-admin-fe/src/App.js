import React from "react";
import axios from "axios"

export default function Create() {
  const formRef = React.createRef()

  const submit = (e) => {
    e.preventDefault();

    const formElements = []
    for (let i = 0; i < 7; i++) {
      formElements.push(formRef.current.children[i])
    }
    const companyName = formElements[0].children[0].children[1].value
    const companyEmail = formElements[1].children[0].children[0].children[1].value
    const companyPrice = formElements[2].children[1].children[0].value
    const companyExchangeScore = formElements[3].children[1].children[0].value
    const companyLogo = formElements[4].children[1].children[0].value
    const companySector = formElements[5].children[1].children[0].value
    const companyDescription = formElements[6].children[1].children[0].value

    const company = { companyName, companyEmail, companyPrice, companyExchangeScore, companyLogo, companySector, companyDescription }

    axios.post("http://localhost:8000/add", company).then(res => {
      alert(res.data)
    })
  }

  return (
    <>
      <div className="min-h-full flex items-baseline justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl lg:text-4xl font-extrabold text-gray-900">Add company</h2>
            <p className="mt-2 text-center text-md text-gray-600">
              Admin Things
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={submit} ref={formRef}>
            <div>
              <div className="flex justify-between mt-1 relative rounded-md ">
                <label htmlFor="company-name" className="sr-only">
                  Company Name
                </label>
                <input
                  type="text"
                  name="CompanyName"
                  id="CompanyName"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 py-4 w-full block border-gray-300 rounded-md"
                  placeholder="Company Name"
                />
              </div>
            </div>
            <div className="shadow-sm -space-y-px">
              <div>
                <div className="flex justify-between mt-1 relative rounded-md ">
                  <label htmlFor="company-email-address" className="sr-only">
                    Company Email address
                  </label>
                  <input
                    id="companyEmail"
                    name="companyEmail"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                    placeholder="Company Email address"
                  />
                </div>
              </div>
            </div>
            <div className="shadow-sm -space-y-px">

              <label htmlFor="companyPrice" className="sr-only">
                Company Price
              </label>
              <div className="relative">
                <input
                  type="float"
                  name="companyPrice"
                  id="companyPrice"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 relative w-full py-4 block border-gray-300 rounded-md"
                  placeholder="Company Price"
                />
              </div>
            </div>
            <div className="shadow-sm -space-y-px">
              <label htmlFor="exchange-score" className="sr-only">
                Exchange Score
              </label>
              <div className="relative">
                <input
                  type="float"
                  name="exchangeScore"
                  id="exchangeScore"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 w-full py-4 block border-gray-300 rounded-md"
                  placeholder="Exchange Score"
                />
              </div>
            </div>

            <div className="shadow-sm -space-y-px">
              <label htmlFor="company-logo" className="sr-only">
                Company Logo link
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="companyLogo"
                  id="companyLogo"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 w-full py-4 block border-gray-300 rounded-md"
                  placeholder="Company Logo Link"
                />
              </div>
            </div>

            <div className="shadow-sm -space-y-px">
              <label htmlFor="company-sector" className="sr-only">
                Company Sector
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="companySector"
                  id="companySector"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 w-full py-4 block border-gray-300 rounded-md"
                  placeholder="Company Sector"
                />
              </div>
            </div>

            <div className="shadow-sm -space-y-px">
              <label htmlFor="company-description" className="sr-only">
                Company Description
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="companyDescription"
                  id="companyDescription"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 w-full py-4 block border-gray-300 rounded-md"
                  placeholder="Company Description"
                />
              </div>
            </div>


            <button
              type="submit"
              className="group w-full flex justify-center py-4 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Company
            </button>

          </form>
        </div>
      </div >
    </>
  )
}
