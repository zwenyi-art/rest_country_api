import React,{ useEffect, useState } from 'react'
import useSwr from 'swr';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';

const Country = () => {
  const { code } = useParams();
  const [countryData,setcountryData]=useState([]);
  const[languages,setlanguages]=useState([]);
  const [countryBorder,setcountryBorder]=useState([]);
  const [mcurrencies,setCurrencies]=useState([]);
  const navigate = useNavigate();
  const backbuttonhandle=()=>{
    console.log("clicked");
    navigate('/');
  }

  
   const fetcher =(...args)=>fetch(...args).then((resp)=>resp.json());
   const {data:country,error,isLoading}=useSwr(`https://restcountries.com/v3.1/alpha/${code}`,fetcher);
   useEffect(() => {
      if(country){
       const result_data ={
          code : country[0].cca3,
          flag: country[0].flags.png,
         "name": country[0]['name'].common,
         languages:(()=>Object.values(country[0]['languages']))(),
         population:country[0]['population'].toLocaleString(),
         "borders":country[0]['borders'],
         "tld":country[0]['tld'],
         "region":country[0].region,
         "subregion":country[0].subregion,
         "capital":country[0].capital,  
         currencies:(()=>Object.values(country[0]['currencies']))()
      }
       setcountryData(result_data);
       setlanguages(result_data.languages);
       setcountryBorder(result_data.borders);
       setCurrencies(result_data.currencies)
    
     }
   }, [country]);
  if(mcurrencies){
    console.log(mcurrencies)
  }
   
  return (
  <>
   
   {isLoading && <Loading></Loading>}
  <div className="h-[100px] "></div>
  <div className={`${isLoading ? 'hidden' : 'flex'} mx-6   bg-white dark:text-white items-start md:items-center flex-col md:flex-row justify-center  gap-2 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700`}>
     
      <img src={countryData?.flag} className='md:w-[50%] w-[100%] h-[100%] z-[5]  md:rounded-l-lg  md:rounded-none rounded-t-lg' alt="" />
    
    <div className="flex-auto grow flex flex-col p-3">
       <h1 className='font-extrabold'>Belgium</h1>
       <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="">
           <p>Native Name: <span className='font-medium'>{countryData.name}</span></p>
           <p>Population: <span className='font-medium'>{countryData.population}</span></p>
          <p>Region: <span className='font-medium'>{countryData.region}</span></p>
          <p>Sub Region: <span className='font-medium'>{countryData.subregion}</span></p>
           <p>Capital: <span className='font-medium'>{countryData.capital}</span></p>
        </div>
       
        <div className="">
        <p>Top Level Domain: <span className='font-medium'>{countryData.tld}</span></p>
         
         <div className='flex flex-wrap flex-row gap-1'>
              <p>Currencies : </p> 
              {mcurrencies?.map((e)=><p className='font-medium' key={e.name}> {e.name}</p>)}
         </div>
         <div className='flex flex-wrap flex-row gap-1'>
              <p>Languages :</p>
              {languages?.map((e)=><p className='font-medium' key={e}> {e}</p>)}
         </div>
        </div>
       </div>
       <div className='flex flex-wrap flex-row '>
               <p>Border Countries : </p>
               {countryBorder?.map((e)=>
               <p key={e} className='mx-1 p-0.5 border border-blue-400'>{e}</p>)}
         </div>

    </div>
   </div>

   </>
  )
}

export default Country