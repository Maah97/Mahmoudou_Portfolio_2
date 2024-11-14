import { NavLink } from 'react-router-dom';
import { useEffect, useRef, useMemo } from "react";
import imgOups from '../assets/oups.webp';
import imgRobot from '../assets/robot.webp';

function Error() {
    function AddClassActive() {
        const menu = document.querySelector('nav');
        menu.classList.toggle('active');
        document.addEventListener('click', (e) => {
            let isClickedInside = document.querySelector('.menu-hamburger').contains(e.target);
            if (!isClickedInside) {
                menu.classList.remove('active');
            }
        });
    };

    const containerRef = useRef(null);
    const options = useMemo(() => {
        return {
            root: null,
            rootMargin: "0px",
            threshold: .1
        };
    }, [])
     
    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0.1) {
                entry.target.classList.add('visible-error');
            } 
            if (entry.intersectionRatio === 1) {
                entry.target.classList.add('transition');
            }
        });
    }
    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, options);
        let contain = containerRef.current
        if (containerRef.current) {
            observer.observe(contain);
            observer.observe(contain.querySelector('.oups'));
            observer.observe(contain.querySelector('.txt-h2'));
            observer.observe(contain.querySelector('.txt-p'));
            observer.observe(contain.querySelector('.robot'));
            observer.observe(contain.querySelector('.home'));
        }
        return () => {
            observer.unobserve(contain);
            observer.unobserve(contain.querySelector('.oups'));
            observer.unobserve(contain.querySelector('.txt-h2'));
            observer.unobserve(contain.querySelector('.txt-p'));
            observer.unobserve(contain.querySelector('.robot'));
            observer.unobserve(contain.querySelector('.home'));
        }
    }, [containerRef, options]);

    return (
        <section ref={containerRef} className="error">
            <div className='container'>
                <img className='oups ' src={imgOups} alt="Oups !!" />
                <div className='txt'>
                    <h2 className='txt-h2'>404</h2>
                    <p className='txt-p'>Sorry, page not found !</p>
                </div>
                <img className='robot' src={imgRobot} alt="Oups Robot avec une loupe !!" />
                <NavLink onClick={AddClassActive} className='home' to="/">GO HOME</NavLink>
            </div>
        </section>
    )
};

export default Error;