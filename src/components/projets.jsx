import { useEffect, useRef, useMemo } from "react";
import CardProjet from './cardProjet'
import projets from '../projets.json'

function Projets() {
    const containRef = useRef(null);
    const ratio = 0.1
    const options = useMemo(() => {
        return {
            root: null,
            rootMargin: "0px",
            threshold: ratio
        };
    }, [])
     
    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > ratio) {
                entry.target.classList.add('visible-projets');
                observer.unobserve(entry.target);
            }
        });
    }
    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, options);
        let contain = containRef.current
        if (containRef.current) {
            observer.observe(contain);
            observer.observe(contain.querySelector('.txt-title-projets'));
            observer.observe(contain.querySelector('.ligne'));
        }
        return () => {
            observer.unobserve(contain);
            observer.unobserve(contain.querySelector('.txt-title-projets'));
            observer.unobserve(contain.querySelector('.ligne'));
        }
    }, [containRef, options]);
    return (
        <article ref={containRef} id="projects" className="projets">
             <svg className="svg-curve" viewBox="0 0 1440 79" xmlns="http://www.w3.org/2000/svg">
                <path d="M-100 79C-100 79 218.416 23.165 693.5 23.165C1168.58 23.165 1487 79 1487 79V0H-100V79Z"></path>
            </svg>
            <h2 className="txt-title-projets">PROJECTS</h2>
            <div className="ligne ligne-projets"></div>
            <div className='liste-projets'>
                {
                    projets.map((projet) => (
                        <CardProjet key={projet.id} id={projet.id} titre={projet.title} category={projet.categorie} technos={projet.technologie} imgCover={projet.cover} />
                    ))
               }
            </div>
            <svg id="contact" className="svg-curve" viewBox="0 0 1440 79" xmlns="http://www.w3.org/2000/svg">
                <path d="M-100 0C-100 0 218.416 55.835 693.5 55.835C1168.58 55.835 1487 0 1487 0V79H-100V0Z"></path>
            </svg>
        </article>
    )
};

export default Projets;