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
                            <div className="max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <a href="#">
                                    <img className="p-8 w-full rounded-t-lg" src={`${process.env.NEXT_PUBLIC_API_HOST1}${products[item].attributes.image.data.attributes.formats.thumbnail.url}`} alt="product image" />
                                </a>
                                <div className="px-5 pb-5">
                                    <a href="#">
                                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{products[item].attributes.name}</h5>
                                        <p className='text-xs text-gray-400'>{products[item].attributes.category}</p>
                                    </a>
                                    <div className="flex items-center mt-2.5 mb-5">
                                        {products[item].color.map((color) => {
                                            return (
                                                <div key={color} className='rounded h-5 w-5 mx-1' style={{ background: `${color}` }}></div>
                                            )
                                        })}

                                    </div>

                                    <div className="flex items-center mt-2.5 mb-5">
                                        {products[item].size.map((size) => {
                                            return (
                                                <>
                                                    <div className='rounded text-center h-8 w-8 border border-black bg-black text-white mx-1'>{size}</div>
                                                </>
                                            )
                                        })}

                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">${products[item].attributes.cost}</span>
                                        <Link href={`/products/${products[item].attributes.slug}?title=${products[item].attributes.title}`} passHref>
                                            <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">View More</button>
                                        </Link>
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
export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST2}/api/products`)
    const products = await res.json()

    // Pass data to the page via props
    return { props: { products } }
}
