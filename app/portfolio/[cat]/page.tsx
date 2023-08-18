import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { items } from "./data";
import {notFound} from 'next/navigation'

const getData = (cat:string) => {
  //@ts-ignore
  const data = items[cat];
  if(data) return data;
  return notFound();
}

const Category = async ({params}:any) => {
  const data = await getData(params.cat)
  return (
    <>
    <section className='portfolio-section px-3 min-h-[30vh] flex flex-col justify-center mb-10'>
      <h2 className='text-6xl font-bold head-text'>Our Works</h2>
      <h4 className='text-3xl sm:text-2xl text-primary font-bold my-1'>/{params.cat}</h4>
      {data.map((item:any, index:number) => (
        <div className={`row flex ${index % 2 && 'flex-row-reverse'} gap-10 my-10`} key={index}>
        <div className='col1'>
            <h2 className='text-4xl font-bold'>{item.title}</h2>

            <p className='my-4'>{item.desc}</p>

            <Link href="/portfolio">
            <button className='text-bg bg-primary rounded-lg px-5 py-2.5 text-md flex items-center justify-center gap-2'>
                <span>Read More</span>
                <i className='fas fa-arrow-right-long text-secondary text-md'></i>
            </button>
            </Link>
        </div>

        <div className='col2 rounded-lg'>
            <Image src={item.image} alt='hero-image' width={400} height={400} className='object-contain rounded-lg'/>
        </div>
      </div>
      ))}

    </section>
    </>
  )
}

export default Category;