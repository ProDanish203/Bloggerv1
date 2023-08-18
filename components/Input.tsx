"use client"
 
interface InputProps{
    placeholder: string;
    value:string;
    type:string;
    onChange:any;
    name?:string;
}

export const Input = ({placeholder, value, onChange, type, name }:InputProps) => {
  return (
    <>
    <input type={type} 
    placeholder={placeholder}
    className='bg-gray-200 w-full py-2.5 px-3 text-text rounded-md outline-none'
    value={value}
    onChange={onChange}
    autoComplete="off"
    required
    name={name}
    />
    </>
  )
}
