import React from "react"
import Navbar from "../components/Navbar"
import FeaturedCompanies from "../components/FeaturedCompanies"
import About from "../components/About"
import OfferShares from "../components/OfferShares"

export default function Landing() {
  return (
    <>
      <Navbar></Navbar>
      {/* Full page config */}
      <div className="gradient w-full">
        <div className="column">
          <div className="top-1/3 inset-x-0 bg-blue-100 text-blue-700 px-2.5 py-2 inline-table my-7 rounded-3xl">Get Started Today</div>
          <div className="py-2.5 top-1/2 text-center inset-x-0 text-4xl lg:text-6xl prata font-bold">Exchange <br /> Ethiopian Shares</div>
          <p className="mt-3.5 text-center text-md lg:text-xl prata">All the share in one place!</p>
          <div class="pt-2 relative mx-auto text-gray-600 my-10">
            <input class="border-2 h-10 rounded-lg text-md focus:outline-none w-80 p-7 lg:text-lg"
              type="search" name="search" placeholder="Search Company" />
            <button type="submit" class="absolute right-0 top-0 mt-6 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <FeaturedCompanies></FeaturedCompanies>
      <About></About>
      <hr className="border-grey"></hr>
      <OfferShares></OfferShares>
      {/* Footer */}
      <hr className="border-black"></hr>
      <footer className="px-4 py-8 bg-coolGray-100 text-coolGray-600">
        <div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
          <div className="flex flex-column pr-3 space-x-4 sm:space-x-8">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5 rounded-full text-coolGray-50">
                <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
              </svg>
            </div>
            <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
              <li style={{ "margin-left": "calc(1rem * calc(1 - var(--tw-space-x-reverse)))" }}>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Terms of Use</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
            </ul>
          </div>
          <ul className="flex flex-wrap space-x-4 sm:space-x-8">
            <li>
              <a href="#" className="hidden lg:block">Instagram</a>
              <a href="#"><svg class="h-8 w-8 lg:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg></a>
            </li>
            <li>
              <a href="#" className="hidden lg:block">Facebook</a>
              <a href="#"><svg class="h-8 w-8 lg:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
            </li>
            <li>
              <a href="#" className="hidden lg:block">Twitter</a>
              <a href="#"><svg class="h-8 w-8 lg:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg></a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  )
}