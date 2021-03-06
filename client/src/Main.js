import React, { useRef, useEffect, useState } from 'react';
import { Routes ,Route, Link } from 'react-router-dom';
import { AppBar} from '@material-ui/core';
import Contacts from './pages/Contacts.js';
import Home from './pages/Home.js';
import Art from './pages/Art.js';
import Code from './pages/Code.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import { useSelector} from 'react-redux';
import pageLinks from './constants/links.js';
import ProjectPage from './pages/ProjectPage';


  export const useElementOnScreen = (options) => {
    const containerRef = useRef(null)
    const [ isVisible, setIsVisible ] = useState(false)
  
    const callbackFunction = (entries) => {
      const [ entry ] = entries
      setIsVisible(entry.isIntersecting)
    }
  
    useEffect(() => {
      
      const observer = new IntersectionObserver(callbackFunction, options)
      if (containerRef.current) observer.observe(containerRef.current)
      
      return () => {
        if(containerRef.current) observer.unobserve(containerRef.current)
      }
    }, [containerRef, options])
  
    return [containerRef, isVisible]
  }

const Main = () => {

    const [ containerRef, isVisible ] = useElementOnScreen({
        root: null,
        rootMargin: "0px",
        threshold:1.0
    })


    const showMenu = useSelector((state) =>state.showMobileMenu);
    const [value, setValue] = useState(1);


    return (
        <>
            <AppBar position = 'static' color = 'transparent'>
                <Navbar />
                <div className ={showMenu?'subbar-links-active': 'hide'}>
                    {pageLinks.map((link) => {
                        return (
                        <Link key={link.id} className = {link.id === value? 'sublinks-active':'sublinks'}  to={link.url} onClick ={() => setValue(link.id)}>
                            {link.text}
                        </Link>
                        )
                    })}
                </div>
                  <Routes>
                    <Route path ="/*" element = {<Home isVisible ={isVisible}/>}/> 
                    <Route path = "/contacts" element = {<Contacts/>}/> 
                    <Route path = "/art/" element = {<Art/>}/>
                    <Route path = "/code/" element = {<Code/>}/>
                    <Route path = "/code/:id" element = {<ProjectPage />}/>
                  </Routes>
            </AppBar>

            <Footer ref={containerRef} />
            
        </>
    )
}

export default Main;



