import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router';

export default function ViewOrder(props) {
    const [order, setOrder] = useState([]);
    const router = useRouter();
    useEffect(() => {
        console.log(props.user);
        fetch(`http://localhost:1337/api/orders?filters[email][$eq]=${props.user.email}`).then((res) => res.json()).then((data) => {
            setOrder(data.data);
            console.log(data.data);
        })

    }, [new Date().getSeconds()]);
    return (
        <div className='container m-4'>
            <Head>
                <title>View Orders</title>
            </Head>
            <h1 className='text-2xl mb-4'>View Order</h1>
            <div className="overflow-x-auto relative">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Order Id
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Order Cost
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Final Cost
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Promocode Used
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Status
                            </th>
                            <th scope="col" className="py-3 px-6">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {order && order.map((item) => {
                            return (
                                <>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.attributes.orderId}
                                        </th>
                                        <td className="py-4 px-6">
                                            {item.attributes.orderCost}
                                        </td>
                                        <td className="py-4 px-6">
                                            {item.attributes.finalCost}
                                        </td>
                                        <td className="py-4 px-6">
                                            {item.attributes.promocode}
                                        </td>

                                        <td className="py-4 px-6">
                                            {item.attributes.status}
                                        </td>
                                        
                                        <td className="py-4 px-6">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                                View More
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}