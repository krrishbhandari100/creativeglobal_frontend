import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Slug = (props) => {
    const router = useRouter();
    const [product, setProduct] = useState(props.product);
    const [variant, setVariant] = useState(props.variant);
    const [key, setKey] = useState(Math.random());

    const [color, setColor] = useState(product[router.query.title].attributes.color);
    const [size, setSize] = useState(product[router.query.title].attributes.size);
    const [cost, setCost] = useState(product[router.query.title].attributes.cost);
    const [qty, setQty] = useState(product[router.query.title].attributes.qty);
    const [prodqty, setProdQty] = useState(1);
    
    
    const refreshVariant = (url)=>{
        let slug = url.split('?')[0];
        let title = url.split('?')[1].split('=')[1];
        console.log(size, color);
        // window.location.href = `/products/${url}`;
        // router.push(url);
        fetch(`${process.env.NEXT_PUBLIC_API_HOST2}/api/fetchBySlug?slug=${slug}`).then((res)=>{
            return res.json();
        }).then((data)=>{
            setProduct(data);
            setColor(data[title].attributes.color);
            setSize(data[title].attributes.size);
            setCost(data[title].attributes.cost);
            setCost(data[title].attributes.cost);
            setQty(data[title].attributes.qty);
            setKey(Math.random());
            router.push(url);
        });
    }
    
    useEffect(()=>{
        setKey(Math.random());
        console.log('Key Changed');
    }, [router.query])

    return (
        <section key={key} className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-center rounded" src={`${process.env.NEXT_PUBLIC_API_HOST1}${product[router.query.title].attributes.image.data.attributes.formats.thumbnail.url}`} />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{product[router.query.title].attributes.category}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product[router.query.title].attributes.name}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <span className="text-gray-600 ml-3">4 Reviews</span>
                            </span>
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                <a className="text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                    </svg>
                                </a>
                                <a className="text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                    </svg>
                                </a>
                                <a className="text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                    </svg>
                                </a>
                            </span>
                        </div>
                        <p className="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>

                        <h1 className='text-xl text-red-400'>Variant:</h1>
                        <p>Size: <b>{product[router.query.title].attributes.size}</b></p>
                        <p>Colour: <b>{product[router.query.title].attributes.color}</b></p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5 border-2 justify-center">
                            <br />
                            <div className="flex items-center">
                                <span className="mr-3">Color</span>

                                {Object.keys(variant).includes('red') && <button name='red' onClick={(e)=>refreshVariant(`${router.query.title}-${size}-${e.currentTarget.name}?title=${router.query.title}`)} className={`border-2 rounded-full w-6 h-6 focus:outline-none bg-red-600 ${color=='red' ? "border-black" : "border-gray-300"}`}></button>}
                                {Object.keys(variant).includes('brown') && <button name='brown' onClick={(e)=>refreshVariant(`${router.query.title}-${size}-${e.currentTarget.name}?title=${router.query.title}`)} className={`border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none bg-[brown] ${color=='brown' ? "border-black" : "border-gray-300"}`}></button>}
                                
                                
                            </div>
                            <div className="flex ml-6 items-center">
                                <span className="mr-3">Size</span>
                                <div className="relative">
                                    <select value={size} onChange={(e)=>refreshVariant(`${router.query.title}-${e.currentTarget.value}-${color}?title=${router.query.title}`)} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                                        {Object.keys(variant[color]).includes('sm') && <option>sm</option>}
                                        {Object.keys(variant[color]).includes('md') && <option>md</option>}
                                        {Object.keys(variant[color]).includes('lg') && <option>lg</option>}
                                        {Object.keys(variant[color]).includes('xl') && <option>xl</option>}
                                        {Object.keys(variant[color]).includes('xxl') && <option>xxl</option>}
                                    </select>
                                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                            <path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {(qty == 0) ? <h1 className='text-red-400 text-2xl'>Out Of Stock</h1> : ""}
                        
                        <div>
                            <input type="number" onChange={(e)=>setProdQty(e.currentTarget.value)} name="qty" id="qty" className='border-2 border-black' placeholder='Qty' min={1} value={prodqty} />
                        </div>

                        <div className="flex">
                            <span className="title-font font-medium text-2xl text-gray-900">₹{cost}</span>
                            {props.loggedin ? <button disabled={qty===0} onClick={()=>props.addToCart(product[router.query.title].attributes.name, product[router.query.title].attributes.title, product[router.query.title].attributes.slug, prodqty, cost, color, size, product[router.query.title].attributes.image.data.attributes.formats.thumbnail.url)} className="flex ml-auto text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded">Add to Cart</button> : ""}
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Slug
export async function getServerSideProps(context) {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST2}/api/fetchBySlug?slug=${context.params.slug}`);
    let product = await res.json();

    let res1 = await fetch(`${process.env.NEXT_PUBLIC_API_HOST2}/api/variants?title=${context.query.title}`);
    let variant = await res1.json();

    return {
        props: { product, variant }, // will be passed to the page component as props
    }
}
