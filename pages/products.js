import Link from 'next/link';
import React, { useState } from 'react'

const Products = (props) => {
    const [products, setProducts] = useState(props.products);
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-2.5 py-12 mx-auto">
                <h1 className='text-4xl mb-4 text-black'>Products:</h1>
                <div className="flex flex-wrap -m-4">

                    {Object.keys(products).map((item, index) => {
                        return (
                            <div key={index} className="lg:w-1/3 sm:w-1/2 p-4 shadow-md ml-3 mt-4">
                                <div className="flex relative h-[300px]">
                                    <img alt="gallery" className="absolute inset-0 w-full h-full object-center" src={`${process.env.NEXT_PUBLIC_API_HOST1}${products[item].attributes.image.data.attributes.formats.thumbnail.url}`} />
                                    <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                                        <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">{products[item].attributes.category}</h2>
                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{products[item].attributes.name}</h1>
                                        <div>
                                            Color:
                                            <div className='flex mb-4 justify-self-auto w-[103px]'>
                                                {products[item].color.map((color) => {
                                                    return (
                                                        <div key={color} className='rounded h-5 w-5 ml-2' style={{ background: `${color}` }}></div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        <div>
                                            Size:
                                            <div className='flex mb-4 justify-between w-[103px]'>
                                                {products[item].size.map((size) => {
                                                    return (
                                                        <>
                                                            <div className='rounded text-center h-8 w-8 border border-black bg-black text-white'>{size}</div>
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        <div>
                                            <Link href={`/products/${products[item].attributes.slug}?title=${products[item].attributes.title}`} passHref><button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">View Details</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}


                </div>
            </div>
        </section>
    )
}

export default Products
export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST2}/api/products`)
    const products = await res.json()

    // Pass data to the page via props
    return { props: { products } }
}
