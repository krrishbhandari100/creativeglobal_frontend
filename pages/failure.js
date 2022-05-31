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
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-col text-center w-full mb-20">
                    <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Order Id: #{router.query.orderId}</h1>
                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-red-600 font-bold">Sorry, Your order is not placed please go on <Link href={'/unpaidorders'}>unpaid orders</Link> section and try again</p>
                </div>
                <div class="lg:w-2/3 w-full mx-auto overflow-auto">
                    <table class="table-auto w-full text-left whitespace-no-wrap">
                        <thead>
                            <tr>
                                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Product Id</th>
                                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">name</th>
                                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">size</th>
                                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">color</th>
                                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">qty</th>
                                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Cost</th>
                                <th class="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData.id && orderData.products.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td class="px-4 py-3">{item.id}</td>
                                        <td class="px-4 py-3">{item.name}</td>
                                        <td class="px-4 py-3">{item.size}</td>
                                        <td class="px-4 py-3">{item.color}</td>
                                        <td class="px-4 py-3">{item.qty}</td>
                                        <td class="px-4 py-3 text-lg text-gray-900">₹{item.cost}</td>
                                        <td class="px-4 py-3 text-lg text-gray-900">₹{item.total}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div class="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
                    <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </a>
                    <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
                </div>
            </div>
        </section>
    )
}

export default Success
