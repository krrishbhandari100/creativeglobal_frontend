import Link from 'next/link'
import React from 'react'
import Cart from '../public/cart.png'
import DropdownAuth from './DropdownAuth'
import Dropdown from './Dropdown'

const Header = (props) => {
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <img width="44" src="/logo.png" alt="logo" />
                    <span className="ml-3 text-xl">CreativeGlobal</span>
                </a>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <Link href={'/'}><a className="mr-5 hover:text-[#515295] hover:font-extrabold cursor-pointer">Home</a></Link>
                    <Link href={'/about'}><a className="mr-5 hover:text-[#515295] hover:font-extrabold cursor-pointer">About</a></Link>
                    <Link href={'/products'}><a className="mr-5 hover:text-[#515295] hover:font-extrabold cursor-pointer">Products</a></Link>
                    <Link href={'/contact'}><a className="mr-5 hover:text-[#515295] hover:font-extrabold cursor-pointer">Contact</a></Link>
                </nav>

                <form className='mt-3 md:mt-0 w-[400px] ml-3'>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-[#515295] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>

                <div className='ml-3'>
                    {props.loggedin ? <div className='flex items-center'>
                        <DropdownAuth />

                        <div className='cursor-pointer'>
                            <img onClick={props.toggleCart} src="/cart.png" alt="cart" />
                        </div>

                        <div className='cursor-pointer'>
                            <Link href={'/logout'}><img src="/logout.png" alt="cart" /></Link>
                        </div>
                    </div> : <Dropdown />}

                </div>
            </div>
        </header>
    )
}

export default Header
