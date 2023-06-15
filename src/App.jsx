import React from 'react';
import { BrowserRouter,Routes,Route, useParams } from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/Navbar';
import Country from './components/Country';

function Team() {
  let params = useParams();
  console.log(params["*"]); // "one/two"
}
const App = () => {
  return (
    <BrowserRouter>
     <Navbar></Navbar>
      <Routes>
         <Route index element={<Home></Home>}></Route>
         <Route path='/regions/:region_data' element={<Home></Home>}></Route>
         <Route path='/countries/:code' element={<Country></Country>}></Route>
         <Route path='/:name' element={<Home></Home>}></Route>
         <Route path='/*' element={<Home></Home>}></Route>
        <Route path='/files/*' element={<Team/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App