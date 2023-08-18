import Image from "next/image"

const baseUrl = "http://localhost:3000"

const getData = async (id:any) => {
  const res = await fetch(`${baseUrl}/api/post/${id}`);
  const data = await res.json();
  return data;
}
      
export async function generateMetadata({params}:any){
  const data = await getData(params.id);
  return {
    title: data.title,
    description: data.description
  }
}

const Blog = async ({params}:any) => {
  const data = await getData(params.id);
  return (
    <>
    <section className='portfolio-section px-3 min-h-[80vh] flex flex-col justify-center'>

      <h2 className='sm:text-5xl text-4xl font-bold head-text mt-10 mb-5'>{data.title}</h2>
      <p className="font-semibold text-lg">{data.desc}</p>

      <div className="flex items-center gap-3 mt-5">
        <div className="relative rounded-full w-[50px] h-[50px] ">
          <Image src={data.image} alt='author' fill className="rounded-full object-cover"/>
        </div>

        <div>
          <h4 className="text-lg font-semibold">{data.createdBy}</h4>
          <p className="font-thin text-sm text-gray-500">Published At: {data.createdAt}</p>
        </div>
      </div>
      <div className="flex items-center justify-center my-10">
        <Image src={data.image} alt='title'  className='max-w-[800px] w-full h-[400px] object-cover rounded-lg' width={1000} height={1000}/>
      </div>

      <div className="mb-10 flex flex-col gap-5">
        <p>{data.content}</p>
      </div>


    </section>
    </>
  )
}

export default Blog