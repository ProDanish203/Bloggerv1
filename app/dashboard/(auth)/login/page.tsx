"use client"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from "react";
import Image from "next/image";
import { Loader } from "@/components/Loader";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const router = useRouter();
  const session = useSession();
  
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!username) return toast.error("Username is required")
    if(!password) return toast.error("Password is required")
    
    try{
      setLoading(true);
      const data = await signIn("credentials", {redirect: false}, {username, password})
      console.log(data);
      setLoading(false);
    }catch(error){
      console.log(error);
      // toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  }

  const signWithGoogle = async () => {
    await signIn('google');
    router.push('/dashboard')
  }
  session.status === "authenticated" && router.push("/dashboard");
  if(session.status === "unauthenticated"){
    return (
    <>
    <div className='flex items-center justify-center w-full h-[80vh] md:px-20 px-4'>
      <ToastContainer/>
      <form onSubmit={handleLogin} 
      className='form px-5 py-4 rounded-md max-w-[350px] w-full flex bg-bg flex-col gap-5 shadow-lg '
      >   

        <h2 className='text-xl font-semibold text-center mb-3'>Login To Your Account</h2>

        <div className='flex flex-col gap-1 relative input-box'>
          <input type="text" id='username' required 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete='off'
          placeholder="Username"
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
            {loading ? <Loader dark={false}/>: "Login"}
          </button>
        </div>

        <div className="google-btn">
          <p className="font-semibold">OR</p>

          <button 
          onClick={() => signWithGoogle()}
          type="button" className="flex items-center justify-center gap-2 bg-gray-200 w-full py-2 rounded-md mt-2">
            <Image src="/google-logo.png" width={30} height={20} alt="google-logo"/>
            Sign in with google
          </button>
        </div>

        <div>
            <p className='text-sm'>Don't have an account? <Link href="/dashboard/register" className='text-accent font-semibold'>Signup now</Link></p>
            <Link href={"/dashboard/login"} className='text-sm text-accent mt-2'>Forgot Password?</Link>
        </div>


      </form>
    </div>
    </>
  )}
}

export default Login;