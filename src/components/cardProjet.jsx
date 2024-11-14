import React from "react";
import { useEffect, useRef, useMemo } from "react";
import MongoDB from '../assets/mongodb2.svg';
import Lighthouse from '../assets/lighthouse2.svg'
import Notion from '../assets/notion-logo.svg'
import { NavLink } from "react-router-dom";

function CardProjet(props) {
    const containRef = useRef(null);
    const ratio = 0.1;
    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }
    const options = useMemo(() => {
        return {
            root: null,
            rootMargin: "0px",
            threshold: ratio
        };
    }, []);
     
    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > ratio) {
                entry.target.classList.add('visible-card-projet');
                observer.unobserve(entry.target);
            }
        });
    }
    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, options);
        let contain = containRef.current
        if (containRef.current) {
            observer.observe(contain);
        }
        return () => {
            observer.unobserve(contain);
        }
    }, [containRef, options]);
    return (
        <NavLink onClick={scrollToTop} ref={containRef} to={'/projects/' + props.id} className="card-projet">
            <div className='conteneur-card-projet'>
                <img src={props.imgCover} alt="cover homepage of the project" className='img-cover' />
                <p>{props.titre}</p>
                <div className="ligne"></div>
                <p>{props.category}</p>
                <div className='technos'>
                    {
                        props.technos.map((techno,i) => (
                            <div key={i} className='techno'>
                                {techno === "MongoDB" ? <img src={MongoDB} alt="logo MongoDB" /> : techno === "Lighthouse" ? <img src={Lighthouse} alt="logo MongoDB" /> : techno === "Notion" ? <img src={Notion} alt="logo MongoDB" />
                                : <i className={`fa-brands fa-${techno}`}></i>}
                                <p>{techno}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="txt-hover"><p>See the project</p></div>
        </NavLink>
    )
};

export default CardProjet;