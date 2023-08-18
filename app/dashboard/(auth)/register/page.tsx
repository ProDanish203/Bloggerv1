"use client"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from "react";
import Image from "next/image";
import { Loader } from "@/components/Loader";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter()

  const baseUrl = "http://localhost:3000"

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!username) return toast.error("Username is required")
    if(username.includes(" ")) return toast.error("Username should not contain white spaces")
    if(!email) return toast.error("Email is required")
    if(!password) return toast.error("Password is required")
    if(password.length < 6) return toast.error("Password Should be greater than 6 characters")
    if(password.includes(" ")) return toast.error("Password should not contain white spaces")
    
    try{
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        body: JSON.stringify({username, email, password})
      });
      console.log(res);
      const data = await res.json();
      if(res.ok){
        toast.success("Registered successfully");
        router.push(`/dashboard/login?success=Registered successfully`);
      }else{
        toast.error(data.error);
      }
      setLoading(false);
    }catch(error){
      console.log(error);
      toast.error("Something went wrong, please try again later");
      setLoading(false);
    }
  }
  return (
    <>
    <div className='flex items-center justify-center w-full h-[80vh] md:px-20 px-4'>
      <ToastContainer/>
      <form onSubmit={handleLogin} 
      className='form px-5 py-4 rounded-md max-w-[350px] w-full flex bg-bg flex-col gap-5 shadow-lg '
      >   

        <h2 className='text-xl font-semibold text-center mb-3'>Register Account</h2>

        <div className='flex flex-col gap-1 relative input-box'>
          <input type="text" required 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete='off'
          placeholder="Username"
          className='px-3 py-2.5 rounded-md bg-gray-200 text-text outline-none text-sm' />
        </div>

        <div className='flex flex-col gap-1 relative input-box'>
          <input type="email" required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='off'
          placeholder="Email Address"
          className='px-3 py-2.5 rounded-md bg-gray-200 text-text outline-none text-sm' />
        </div>

        <div className='flex flex-col gap-1 relative input-box'>
          <input type={showPass ? "text" : "password"} id='username' required 
          autoComplete='off'
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='px-3 py-2.5 rounded-md text-text bg-gray-200  outline-none text-sm' />
          <i className={`fas ${showPass ? "fa-eye-slash" : "fa-eye"} absolute right-2 top-3 text-lg cursor-pointer text-text`} onClick={() => setShowPass(prev => !prev)}></i>
        </div>

        <div className='w-full'>
          <button 
          className='bg-accent w-full py-2 text-white outline-none rounded-md shadow-md hover:scale-[1.01]'
          type='submit'
          >
            {loading ? <Loader dark={false}/>: "Register"}
          </button>
        </div>

        <div className="google-btn">
          <p className="font-semibold">OR</p>

          <button 
          onClick={() => signIn('google')}
          type="button" className="flex items-center justify-center gap-2 bg-gray-200 w-full py-2 rounded-md mt-2">
            <Image src="/google-logo.png" width={30} height={20} alt="google-logo"/>
            Sign up with google
          </button>
        </div>

        <div>
            <p className='text-sm'>Already have an account? <Link href="/dashboard/login" className='text-accent font-semibold'>Login now</Link></p>
      </div>


      </form>
    </div>
    </>
  )
}

export default Register;