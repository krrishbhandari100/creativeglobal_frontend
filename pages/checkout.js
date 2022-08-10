import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = (props) => {
    const [cart, setCart] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [promocode, setPromocode] = useState('');
    
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');


    useEffect(() => {
        let items = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCart(items);
        getSubTotal();
    }, [])

    const getSubTotal = () => {
        let sum = 0;
        let items = JSON.parse(localStorage.getItem('cartItems')) || [];
        items.map((item) => {
            sum += item.total;
        })
        setSubTotal(sum);
        setTotal(sum);
    }

    const checkPincode = async (pincode) => {
        let resp = await fetch(`${process.env.NEXT_PUBLIC_API_HOST2}/api/pincodes`);
        let data = await resp.json();

        Object.keys(data).every((pcode) => {
            if (pcode == pincode) {
                console.log(data[Object.keys(data)][0]);
                setCity(data[Object.keys(data)][0]);
                setState(data[Object.keys(data)][1]);
                return true;
            }
            else {
                return false;
            }
        })
    }

    function randomNumber(length) {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
    }

    const makeOrder = async (e) => {
        e.preventDefault();
        let orderId = randomNumber(19);
        let email = document.getElementById('email');
        let address = document.getElementById('address');
        let pincode = document.getElementById('pincode');
        let notes = document.getElementById('notes');

        let res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST1}/api/orders/pretransaction`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                address: address.value,
                pincode: pincode.value,
                notes: notes.value,
                promocode: promocode,
                products: cart,
                orderId: orderId,
                orderCost: subTotal,
                finalCost: total
            })
        });
        let data = await res.json();
        if (data.txnToken) {
            var config = {
                "root": "",
                "flow": "DEFAULT",
                "data": {
                    "orderId": orderId, /* update order id */
                    "token": data.txnToken, /* update token value */
                    "tokenType": "TXN_TOKEN",
                    "amount": total /* update amount */
                },
                "handler": {
                    "notifyMerchant": function (eventName, data) {
                        console.log("notifyMerchant handler function called");
                        console.log("eventName => ", eventName);
                        console.log("data => ", data);
                    }
                }
            };

            window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                // after successfully updating configuration, invoke JS Checkout
                window.Paytm.CheckoutJS.invoke();
            }).catch(function onError(error) {
                console.log("error => ", error);
            });
        }
    }

    const checkPCode = async (code)=>{
        let promocodeInfo = document.getElementById('promocodeInfo');
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST2}/api/promocodes`);
        let data = await res.json();
        let pcodes = Object.keys(data);
        if(pcodes.includes(code)){
            promocodeInfo.innerHTML = "";
            let discountValue = total * (100 - data[pcodes]['discount'])/100;
            const div = document.createElement('div');
            div.innerHTML = `<b>Promocode Applied</b>: <span class='text-red-700'>${code}</span>`;
            div.innerHTML += `<br>`;
            div.innerHTML += `<b>Discount Applied</b>: <span class='text-red-700'>₹-${total * (data[pcodes]['discount'])/100}</span>`;
            promocodeInfo.appendChild(div);
            setTotal(discountValue);
            toast.success('Promocode Applied successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            toast.error('Promocode does not exists', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            promocodeInfo.innerHTML = "";
            setTotal(subTotal);
        }
        document.getElementById('promocode').disabled = true;
        document.getElementById('applyBtn').disabled = true;
    }
    return (
        <div>
            <Script defer type="application/javascript" crossorigin="anonymous" src={`https://${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}></Script>
            <div className="mt-20">
                <h1 className="flex items-center justify-center font-bold text-blue-600 text-md lg:text-3xl">CreativeGlobal Checkout</h1>
            </div>
            <div className="container p-12 mx-auto">
                <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
                    <div className="flex flex-col md:w-full">
                        <h2 className="mb-4 font-bold md:text-xl text-heading ">Details:
                        </h2>
                        <form className="justify-center w-full mx-auto" method="post" onSubmit={makeOrder}>
                            <div>
                                <div className="space-x-0 lg:flex lg:space-x-4">
                                    <div className="w-full lg:w-1/2">
                                        <label htmlFor="firstName" className="block mb-3 text-sm font-semibold text-gray-500">First Name</label>
                                        <input onChange={(e)=>{setFirstName(e.currentTarget.value)}} name="firstName" type="text" placeholder="First Name"
                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" value={(props.user) ? props.user.first_name : ""} />
                                    </div>
                                    <div className="w-full lg:w-1/2 ">
                                        <label htmlFor="firstName" className="block mb-3 text-sm font-semibold text-gray-500">Last
                                            Name</label>
                                        <input onChange={(e)=>{setLastName(e.currentTarget.value)}} name="Last Name" type="text" placeholder="Last Name"
                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" value={(props.user) ? props.user.last_name : ""} />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="w-full">
                                        <label htmlFor="Email"
                                            className="block mb-3 text-sm font-semibold text-gray-500">Email</label>
                                        <input onChange={(e)=>{setEmail(e.currentTarget.value)}} name="email" id='email' type="text" placeholder="Email"
                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" value={(props.user) ? props.user.email : ""} />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="w-full">
                                        <label htmlFor="Address"
                                            className="block mb-3 text-sm font-semibold text-gray-500">Address</label>
                                        <textarea required id='address'
                                            className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                                            name="Address" cols="20" rows="4" placeholder="Address"></textarea>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="w-full">
                                        <label htmlFor="Email"
                                            className="block mb-3 text-sm font-semibold text-gray-500">Pincode</label>
                                        <input required onChange={(e) => checkPincode(e.currentTarget.value)} name="Pincode" type="text" id='pincode' placeholder="Pincode"
                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                    </div>
                                </div>

                                <div className="space-x-0 lg:flex lg:space-x-4 mt-4">
                                    <div className="w-full lg:w-1/2">
                                        <label htmlFor="city"
                                            className="block mb-3 text-sm font-semibold text-gray-500">City</label>
                                        <input name="city" type="text" placeholder="City" readOnly={true} value={city}
                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                    </div>
                                    <div className="w-full lg:w-1/2 ">
                                        <label htmlFor="Pincode" className="block mb-3 text-sm font-semibold text-gray-500">
                                            State</label>
                                        <input name="State" type="text" placeholder="State" readOnly={true} value={state}
                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                    </div>
                                </div>

                                <div className="relative pt-3 xl:pt-6"><label htmlFor="note"
                                    className="block mb-3 text-sm font-semibold text-gray-500"> Notes
                                    (Optional)</label><textarea name="note" id='notes'
                                        className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        rows="4" placeholder="Notes for delivery"></textarea>
                                </div>

                                <div className="mt-4">
                                    <div className="w-full">
                                        <label htmlFor="Email"
                                            className="block mb-3 text-sm font-semibold text-gray-500">Promocode</label>
                                        <input name="Promocode" onChange={(e)=>setPromocode(e.currentTarget.value)} type="text" id='promocode' placeholder="Promocode"
                                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600" />
                                        <button id='applyBtn' type='button' onClick={(e)=>checkPCode(promocode)} className='py-2 px-3 mt-3 rounded-md bg-red-500 text-white'>Apply</button>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <button type='submit' className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900">Process</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
                        <div className="pt-12 md:pt-0 2xl:ps-4">
                            <h2 className="text-xl font-bold">Order Summary</h2>
                            <div className="mt-8">
                                <div className="flex flex-col space-y-4">

                                    {cart.map((item, index) => {
                                        return (
                                                <div className="flex space-x-4" key={index}>
                                                    <div>
                                                        <img src={`${process.env.NEXT_PUBLIC_API_HOST1}${item.img}`} alt="image"
                                                            className="w-60" />
                                                    </div>
                                                    <div>
                                                        <h2 className="text-xl font-bold">{item.name}</h2>
                                                        <p className="text-sm">Size: {item.size}</p>
                                                        <p className="text-sm">Color: {item.color}</p>
                                                        <span className="text-red-600">Price</span> ₹{item.total}
                                                    </div>
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                                                            viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </div>
                                                </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="flex p-4 mt-4">
                                <h2 className="text-xl font-bold">ITEMS {cart.length}</h2>
                            </div>
                            <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                                Subtotal<span className="ml-2">₹{subTotal}</span></div>

                            <div id='promocodeInfo' className='px-2'>
                            </div>

                            <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                                Total<span className="ml-2">₹{total}</span></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Checkout
