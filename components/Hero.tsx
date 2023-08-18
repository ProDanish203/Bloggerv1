import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Hero = () => {
  return (
    <>
    <section className='section hero-section md:px-10 px-5'>
        <div className='row'>
            <div className='col1'>
                <h1 className='flex justify-center flex-col sm:text-5xl text-4xl font-bold'>
                    <span className='head-text mb-2'>Words Unleashed</span>
                    <span className='sm:text-4xl text-2xl'>Your Platform for Sharing and Discovering Blogs</span>
                </h1>

                <p className='head-text my-4'>
                Discover, Create, Connect: Your Hub for Blogs and Beyond. Unleash Your Voice in Our Thriving Online Community.
                </p>

                <Link href="/blogs">
                <button className='text-bg bg-primary rounded-lg px-5 py-3 text-lg flex items-center justify-center gap-2'>
                    <span>Explore More</span>
                    <i className='fas fa-arrow-right-long text-secondary text-lg'></i>
                </button>
                </Link>
            </div>

            <div className='col2'>
                <Image src="/hero.png" alt='hero-image' width={400} height={400} className='object-contain animate-img'/>
            </div>
        </div>
    </section>
    </>
  )
}
