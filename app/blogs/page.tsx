import Image from "next/image"
import Link from "next/link"

const getData = async () => {
  const res = await fetch('http://localhost:3000/api/post');
  const data = await res.json();
  return data;
} 

const Blogs = async () => {

  const data = await getData();

  return (
    <>
    <section className='portfolio-section px-3 min-h-[80vh] flex flex-col justify-center'>
      <h2 className='text-6xl font-bold head-text mb-5'>Explore Blogs</h2>

      <div className="flex flex-wrap gap-7 mt-5 mb-8 relative">
      {data.map((item:any) => (
      <div 
      key={item._id}
      className="relative min-h-[410px] mb-5 sm:max-w-[400px] max-w-[300px] w-full overflow-hidden object-contain">
          <div className="h-[250px] relative w-full overflow-hidden">
            <Image src={item.image} alt={item.title} fill className='object-cover rounded-lg'/>
          </div>
          <div className="my-2">
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <p>{item.desc.substring(0, 120)}...</p>
          </div>
          <Link href={`/blogs/${item._id}`}>
            <button className="w-full block bg-accent py-2 rounded-md text-bg">Read More</button>
          </Link>
      </div>
      ))}
        


      </div>
    </section>
    </>
  )
}

export default Blogs