"use client"
import { useDark } from '@/store/ThemeProvider'
import Link from 'next/link'
import { signOut, useSession } from "next-auth/react";

export const Header = () => {

    const {dark, setDark} = useDark();
    const session = useSession();

    const navLinks = [
        {title: "Home", path: "/"},
        {title: "Blogs", path: "/blogs"},
        {title: "Portfolio", path: "/portfolio"},
        {title: "Contact", path: "/contact"},
        {title: "Dashboard", path: "/dashboard"},
    ]

  return (

    <header className='flex items-center justify-between gap-3 md:px-10 md:max-w-[1300px] md:mx-auto w-full px-3 py-4'>
        <Link href="/">
            <h2 className='text-3xl font-bold text-accent cursor-pointer'>Blogger</h2>
        </Link>   
        <div className='flex items-center gap-3'>

        <nav className='flex items-center justify-center gap-4 text-lg'>
            {navLinks.map((link, index) => (
                <Link href={link.path}
                key={index}
                >
                    {link.title}
                </Link>
            ))}
        </nav>
        {session.status === "authenticated" && (
            <div>
                <button
                className='px-2 py-1 rounded-md bg-accent text-bg cursor-pointer'
                onClick={() => signOut()}
                >Logout</button>
            </div>
        )}
        

        <i className={`fas fa-${dark ? "sun": "moon"} text-2xl text-accent cursor-pointer`}
        onClick={() => setDark((prev:boolean) => !prev)}
        ></i>
        </div>
    </header>
  )
}
