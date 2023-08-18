"use client"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from "react";
import Image from "next/image";
import { Loader } from "@/components/Loader";
import { Input } from "@/components/Input";

const Contact = () => {

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    msg: ""
  });

  const handleChange = (e:any) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({...user, [name]:value});
  }
  
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validations
    if(!user.name) return toast.error("Name Is required!");
    if(!user.email) return toast.error("Email Is required!");
    if(!user.msg) return toast.error("Message Is required!");

    try{
      setLoading(true);
      console.log(user);
      setUser({name: "", email: "", msg: ""});
      setLoading(false);
    }catch(error){
      console.log(error);
      //@ts-ignore
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  }

  return (
    <>
    <div className='md:px-10 px-3 md:mb-10 mb-20 flex flex-wrap gap-4 justify-center items-center bg-bg min-h-[80vh]'>
      <ToastContainer/>

      <div className='col2 flex items-center justify-center'>
        <Image src="/writer.png" width={500} height={400} alt='Contact Us' className='rounded-lg animate-img'/>
      </div>

      <div className='col1'>
        <div className='bg-bg shadow-lg max-w-[1000px] w-full mx-auto min-h-[200px] rounded-md md:px-4 px-2 py-4'>
          <h2 className='md:text-3xl text-xl font-bold'>Contact Us:</h2>

          <form 
          onSubmit={handleSubmit}
          className='flex flex-col gap-5 md:max-w-[700px] md:px-5 mt-5 pb-5'>

            <div className='w-full flex items-center justify-start gap-4'>
              <i className='fas fa-user md:text-2xl text-accent text-lg'></i>
              <Input type="text" placeholder="Name" value={user.name} name="name" onChange={handleChange}/>
            </div>

            <div className='w-full flex items-center justify-start gap-4'>
              <i className='fas fa-envelope md:text-2xl text-accent text-lg'></i>
              <Input type="email" placeholder="Email" value={user.email} name="email" onChange={handleChange}/>
            </div>

            <div className='w-full flex items-start justify-start gap-4'>
              <i className='fas fa-message md:text-2xl text-accent text-lg pt-2'></i>
              <textarea placeholder='Leave a message...' rows={4} autoComplete='off'
              name='msg'
              value={user.msg}
              onChange={handleChange}
              className='w-full py-2.5 px-3 bg-gray-200 rounded-md outline-none resize-none text-text'></textarea>
            </div>

            <div className='w-full flex justify-end'>
              <button 
              type='submit'
              className='bg-primary text-bg rounded-md shadow-sm max-sm:w-full px-10 py-2.5 flex gap-2 items-center justify-center'
              >
                {loading ? <Loader dark={false}/> : (
                  <>
                  <i className='fas fa-paper-plane'></i>
                  Send Message
                  </>
                )}
                
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
    </>
  )
}

export default Contact;