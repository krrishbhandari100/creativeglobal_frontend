import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Success = () => {
    const router = useRouter();
    const [orderData, setOrderData] = useState({});
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST1}/api/orders/${router.query.orderId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            setOrderData(data);
        })
        localStorage.removeItem('cartItems');
    }, [router.query])
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Order Id: #{router.query.orderId}</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-red-600 font-bold">Sorry, Your order is not placed please go on <Link href={'/unpaidorders'}>unpaid orders</Link> section and try again</p>
                </div>
                <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                    <table className="table-auto w-full text-left whitespace-no-wrap">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Product Id</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">name</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">size</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">color</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">qty</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Cost</th>
                                <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData.id && orderData.products.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td className="px-4 py-3">{item.id}</td>
                                        <td className="px-4 py-3">{item.name}</td>
                                        <td className="px-4 py-3">{item.size}</td>
                                        <td className="px-4 py-3">{item.color}</td>
                                        <td className="px-4 py-3">{item.qty}</td>
                                        <td className="px-4 py-3 text-lg text-gray-900">₹{item.cost}</td>
                                        <td className="px-4 py-3 text-lg text-gray-900">₹{item.total}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
                    <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </a>
                    <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
                </div>
            </div>
        </section>
    )
}

export default Success
