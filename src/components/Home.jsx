import React, { useEffect, useState } from 'react'
import useSwr from 'swr';
import {motion,useScroll,useSpring} from "framer-motion"
import { useParams,Link } from 'react-router-dom';
import Loading from './Loading';
import Navbar from './Navbar';





const Home = () => {
   const {scrollYProgress}=useScroll();
   const scaleX=useSpring(scrollYProgress,{
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
   })
   const [dropdown,setDropDown]=useState(true);
   const [countryData,setcountryData]=useState([]);
   const { region_data } = useParams();
   const [search_data,setsearch_data] =useState('');
   const [country_name,setCountryName] = useState('');
   const url = region_data ? `https://restcountries.com/v3.1/region/${region_data}` : 'https://restcountries.com/v3.1/all';
   const fetcher =(...args)=>fetch(...args).then((resp)=>resp.json());
   const {data:country,error,isLoading}=useSwr(url,fetcher);
   useEffect(()=>{
    setcountryData(country)
   },[country])
  //  if(isLoading){
  //     return <Loading></Loading>
  //  }

  const dropDownhandle=()=>{
    setDropDown(!dropdown);
}  


  return (
    
    <div className='scroll-smooth'>
      {isLoading && <Loading></Loading>}
      <div className="flex fixed w-4/5 top-14">
        <label htmlFor="location-search" className="mb-2 text-sm font-medium text-gray-900  sr-only dark:text-white">Your Email</label>
        <button id="dropdown-button-2" onClick={dropDownhandle} data-dropdown-toggle="dropdown-search-city" className="flex-shrink-0 inline-flex bg-opacity-80 items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300  hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
        <span className='md:block hidden'>Filter by Region</span><svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg> </button>
        <div id="dropdown-search-city"  className={`${dropdown && 'hidden'} absolute top-14 bg-white divide-y transition   dropdown divide-gray-100 rounded-r-lg shadow w-44 dark:bg-gray-700`}>
            <ul onClick={dropDownhandle} className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button-2">
                <li className='flex-1 w-full flex items-center justify-center'>
                <Link to={'/regions/asia'}>
                   <button type="button" >
                     Asia
                   </button>
                </Link>
                </li>
                 
                <li className='flex-1 w-full flex items-center justify-center'>
                <Link to={'/regions/europe'}>
                   <button type="button" >
                     Europe
                   </button>
                </Link>
                </li>

                <li className='flex-1 w-full flex items-center justify-center'>
                <Link to={'/regions/africa'}>
                   <button type="button" >
                    Africa
                   </button>
                </Link>
                </li>
                 
                <li className='flex-1 w-full flex items-center justify-center'>
                <Link to={'/regions/americas'}>
                   <button type="button" >
                   Americas
                   </button>
                </Link>
                </li>
                

              
            </ul>
        </div>
       <div className="relative w-full">
           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
           </div>
            <input type="search" onChange={(e)=>setsearch_data(e.target.value.toLowerCase())} className="block pl-10 p-2.5 w-full z-20 text-sm  bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:bg-gray-400   bg-opacity-80 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  outline-none" placeholder="Search for city or address" required/>   
        </div> 
    </div>
      <motion.div 
        className="progress bg-purple-800  fixed top-24 mt-0.5 rounded-r-md" style={{ scaleX }}
      />
      <div className="grid sm:grid-cols-3 grid-cols-1 lg:grid-cols-4  gap-x-0 gap-y-2 mt-28">
      {
        countryData?.filter((item)=>{
          if(search_data === ''){
            return item;
          }else{
            return item.name.common.toLowerCase().includes(search_data);
          }
        }).map((country) => (
          <div key={country.cca3} className='bg-slate-800 text-white  sm:w-52 w-56 border-2 dark:border-green-500  mx-auto rounded shadow overflow-hidden'>
            <Link to={`/countries/${country.cca3}`}>
            <div className="w-full ">
              <img src={country.flags.png} className='w-full  object-contain' alt="" srcSet="" />
            </div>  
            <div className="ps-2 py-2">
              <p className='font-extrabold'>{country.name.common}</p>
              <p className='py-1'>Population: {country.population}</p>
              <p className='py-1'>Region: {country.region}</p>
              <p>Capital: {country.capital}</p>
            </div>
            {/* <Link to={`/currency/${country.cca3}`}>{country.}</Link> */}
            </Link>
          </div>
        ))
      }

      </div>
     
    </div>
  )
}

export default Home