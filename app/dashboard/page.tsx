"use client"
import { Loader } from '@/components/Loader';
import React, { useState } from 'react'
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/Input';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {

  const session = useSession()
  const router = useRouter();

  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [img, setImg] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  // Client side fecthing (instead of useEffect, we use this nextjs library)
  //@ts-ignore
  const fetcher = (...args) => fetch(...args).then(res => res.json())  
  const {data, mutate, isLoading, error} = useSWR(`/api/post?username=${session?.data?.user?.name}`, fetcher);
  let author = session?.data?.user?.name;

  const baseUrl = "http://localhost:3000";

  const publish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validations
    if(!title) return toast.error("Title is required") 
    if(!desc) return toast.error("Description is required") 
    if(!img) return toast.error("Image is required") 
    if(!content) return toast.error("Content is required") 

    try{
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/post`, {
        method: "POST",
        body: JSON.stringify({title, desc, img, content, author})
      });
      // const data = await res.json();
      mutate();
      if(res.ok){
        toast.success("Your post has been published")
      }else{
        toast.error("something went wrong");
      }
      setTitle("");
      setDesc("");
      setImg("");
      setContent("");
      setLoading(false);
    }catch(error){
      console.log(error);
      setLoading(false);
    }

  }

  const deletePost = async (id:string) => {
    try{  
      const res = await fetch(`${baseUrl}/api/post/${id}`, {
        method: "DELETE"
      }) 
      mutate();
      if(res.ok){
        toast.success("Post has been deleted");
      }else{
        toast.error("Something went wrong")
      }
    }catch(error){
      console.log(error);
    }
  }

  if(session.status === "loading"){
    return (
      <div className='w-full h-[80vh] flex justify-center items-center gap-2 px-3'>
        <Loader dark={true}/>
      </div>
    )
  }
  if(session.status === "unauthenticated") router.push("/dashboard/login");

  if(session.status === "authenticated") {
    return (
      <>
      <section className='portfolio-section px-3 min-h-[80vh] flex flex-col justify-center mb-10'>
        <ToastContainer/>
      <h2 className='text-4xl font-bold head-text'>Create Blog</h2>
        <div className={`row flex  gap-10 my-10`}>
        <div className='col2 rounded-lg'>
          <form 
          onSubmit={publish}
          className='max-w-[500px] flex flex-col gap-3  w-full mx-auto px-4 py-3 shadow-lg'>
            <Input placeholder='Blog Title' type='text' value={title} onChange={(e:any) => setTitle(e.target.value)}/>
            <Input placeholder='Blog Description' type='text' value={desc} onChange={(e:any) => setDesc(e.target.value)}/>
            <Input placeholder='Blog Image URL' type='url' value={img} onChange={(e:any) => setImg(e.target.value)}/>

            <textarea 
            placeholder='Blog content'
            className='bg-gray-200 w-full py-2.5 px-3 resize-none rounded-md outline-none'
            value={content}
            onChange={(e:any) => setContent(e.target.value)}
            rows={5}
            ></textarea>

            <div>
              <button type='submit' className='py-2.5 bg-accent text-bg rounded-md w-full'>
                {loading ? <Loader dark={false}/>: "Publish"}
              </button>
            </div>
          </form>
        </div>

        <div className='col1 flex gap-2 flex-col'>
          <h2 className='head-text text-3xl mb-3'>{data?.length > 0 ? "Your Blogs": "You haven't published any blog yet"}</h2>
        {data?.length > 0 && data.map((item:any) => (
          <div className='flex relative items-center gap-2' key={item._id}>
          <div className='relative'>
            <Image src="https://img.freepik.com/premium-photo/creative-background-dark-laptop-stands-dark-background-modern-technology-concept_99433-6860.jpg" alt='hero-image' width={200} height={200} className='object-contain rounded-lg'/>
          </div>
          <div>
            <Link href={`/blogs/${item._id}`}>
            <h2 className='text-3xl font-bold'>{item.title}</h2>
            </Link>
            <p className='my-2'>{item.desc.substring(0,180)}...</p>
          </div>
          <i className='fas fa-times sm:text-3xl text-2xl cursor-pointer text-accent font-semibold absolute top-0 right-2'
          onClick={() => deletePost(item._id)}
          ></i>
          </div>
        ))
        }
          
        </div>
      </div>

    </section>
      </>
    )  
  }
  
}

export default Dashboard;