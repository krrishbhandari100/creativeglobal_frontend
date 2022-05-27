import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'

export default function Home() {
  return (
    <>
      <div id='intro' className='grid md:grid-cols-2 h-[80vh] place-items-center'>
        <div className="video w-full lg:w-1/2">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/QG-O1vji5Lg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>

        <div className="text w-full mt-4 lg:w-1/2 lg:mt-0">
          <h1 className='text-4xl'>Welcome to</h1>
          <h1 className='text-3xl mb-2 text-[#515295]'>CreativeGlobal</h1>
          <p className='w-[300px] lg:w-[434px]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi minus odio, labore quas consequatur eius, non nesciunt beatae voluptate laboriosam nobis cumque. Sint saepe accusamus voluptates porro dicta odio. Minus dolorem quam exercitationem, sequi quod corrupti magnam quaerat, voluptas accusantium eos atque reiciendis deserunt excepturi autem quibusdam odit vero ex.
          </p>

          <div id="buttons" className='mt-3'>
            <button type="button" className="text-white bg-[#515295] hover:bg-transparent hover:text-[#515295] hover:border hover:border-[#515295] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Get Started</button>
            <button type="button" className="text-white bg-[#515295] hover:bg-transparent hover:text-[#515295] hover:border hover:border-[#515295] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Contact Us</button>
          </div>
        </div>
      </div>
    </>
  )
}
