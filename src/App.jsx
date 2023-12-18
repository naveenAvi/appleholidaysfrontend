import { Suspense, createContext, lazy, useEffect, useRef, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'

import CreateStudent from './CreateStudent';
import Navbar from './Layout/Navbar'
import ListStudents from './STudents';
function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter basename="/">
        <Navbar />
        <div className='main-body-section'>
          <Routes>

            <Route path="/create-student" element={<CreateStudent />} />
            <Route path="/create-student/:userid" element={<CreateStudent />} />

            
            <Route path="/" element={<ListStudents />} />

            
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
