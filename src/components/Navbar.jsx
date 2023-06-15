import React, { useState,useEffect } from 'react'
import 'animate.css';
import {BsMoonStars,BsMoonStarsFill} from 'react-icons/bs';
import {FiSun} from 'react-icons/fi';
import {HiComputerDesktop} from 'react-icons/hi2';
import {Link,Form} from 'react-router-dom';
const Navbar = () => {
    const [toggel,settoggel]=useState(false);
    const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());  
     
    const lighMode = ()=>{
      document.documentElement.classList.remove('dark');
    }
    const darkMode = ()=>{
      document.documentElement.classList.add('dark');
    }
    const defaultMode = (getCurrentTheme) =>{
       if(getCurrentTheme){
        document.documentElement.classList.add('dark');
       }
    }

  return (
    
    <nav className='w-full  fixed top-0 py-4  sm:px-20 px-4 bg-white text-black dark:bg-slate-800 dark:text-white z-20 bg-opacity-100 flex justify-between items-center'>
      <h3>Where is the country?</h3>
      <div className='flex flex-row items-center justify-between gap-2 cursor-pointer' onClick={()=>settoggel((prev)=>!prev)}><BsMoonStars/></div>
       <div className={`${toggel ? 'flex':'hidden'} absolute sm:top-16 top-28 right-1  `}>
         <ul className="list-none z-50 flex flex-col items-start px-5 justify-end min-w-[140px] animate__animated animate__bounceIn animate__faster rounded text-white bg-slate-600 bg-opacity-30">
           <li className='flex flex-row items-center justify-between gap-2 pt-2 leading-8 cursor-pointer' onClick={lighMode} ><FiSun></FiSun>Light</li>
           <li className='flex flex-row items-center justify-between gap-2 leading-8 cursor-pointer' onClick={darkMode} ><BsMoonStars></BsMoonStars>Dark</li>
           <li className='flex flex-row items-center justify-between gap-2 leading-8 cursor-pointer' onClick={defaultMode}><HiComputerDesktop></HiComputerDesktop>System</li>
         </ul>
       </div>
    </nav>
   
  )
}

export default Navbar