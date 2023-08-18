import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Portfolio = () => {
  return (
    <>
    <section className='portfolio-section px-3 min-h-[80vh] flex flex-col justify-center'>
      <h2 className='text-6xl font-bold head-text'>Our Works</h2>
      <h4 className='text-3xl sm:text-2xl font-bold my-2'>Choose Your Category</h4>

      <div className="flex flex-wrap sm:justify-start justify-center gap-7 mt-5 mb-8 relative">

        <Link href="/portfolio/website" className="cat-card relative rounded-lg overflow-hidden h-[400px] w-[350px]">
            <Image src="https://img.freepik.com/premium-photo/creative-background-dark-laptop-stands-dark-background-modern-technology-concept_99433-6860.jpg" alt='title' width={350} height={150} className='object-cover rounded-lg full-img'/>
          <div className='image-overlay absolute top-0 left-0 z-10'>
          </div>
          <p className='text-5xl text-bg font-bold absolute z-10 bottom-2 right-4'>Website</p>
        </Link>

        <Link href="/portfolio/technology" className="cat-card relative rounded-lg overflow-hidden h-[400px] w-[350px]">
            <Image src="https://w0.peakpx.com/wallpaper/160/217/HD-wallpaper-face-recognition-dark-tech.jpg" alt='title' width={350} height={150} className='object-cover full-img rounded-lg'/>
          <div className='image-overlay absolute top-0 left-0 z-10'>
          </div>
          <p className='text-5xl text-bg font-bold absolute z-10 bottom-2 right-4'>Technology</p>
        </Link>

        <Link href="/portfolio/social" className="cat-card relative rounded-lg overflow-hidden h-[400px] w-[350px]">
            <Image src="https://www.verdict.co.uk/wp-content/uploads/2019/03/shutterstock_449580016.jpg" alt='title' width={350} height={150} className='object-cover full-img rounded-lg'/>
          <div className='image-overlay absolute top-0 left-0 z-10'>
          </div>
          <p className='text-5xl text-bg font-bold absolute z-10 bottom-2 right-4'>Social</p>
        </Link>

      </div>
    </section>
    </>
  )
}

export default Portfolio