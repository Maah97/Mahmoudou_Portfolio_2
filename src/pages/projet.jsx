import { useParams } from 'react-router-dom';
import { useEffect, useRef, useMemo } from "react";
import projets from '../projets.json';
import Caroussel from '../components/caroussel';

function Projet() {
    const {id} = useParams();
    const projet = projets.find(item => item.id === id);
    const containRef = useRef(null);
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
                entry.target.classList.add('visible-projet');
                observer.unobserve(entry.target);
            }
        });
    }
    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, options);
        let contain = containRef.current
        if (containRef.current) {
            observer.observe(contain);
            observer.observe(contain.querySelector('.title-projet'));
            observer.observe(contain.querySelector('.date-et-github'));
            observer.observe(contain.querySelector('.description'));
            observer.observe(contain.querySelector('.problems'));
        }
        return () => {
            observer.unobserve(contain);
            observer.unobserve(contain.querySelector('.title-projet'));
            observer.unobserve(contain.querySelector('.date-et-github'));
            observer.unobserve(contain.querySelector('.description'));
            observer.unobserve(contain.querySelector('.problems'));
        }
    }, [containRef, options]);
    return (
        <section id='project' ref={containRef} className='projet'>
            <h1 className='title-projet'><i className="fa-solid fa-angles-right"></i>Projects / {projet.title} / Pictures of the project</h1>
            <Caroussel key={projet.id} pictures={projet.pictures} />
            <div className='infos-projets'>
                <div className="date-et-github">
                    <h2>{projet.title}</h2>
                    <div className='ligne visible-projet'></div>
                    <p><span>Date : </span>{projet.date}</p>
                    {projet.link.github === "" ? "" : <p><span>Github : </span><a href={projet.link.github} target='_blank' rel='noreferrer'>This project is here</a></p>}
                    {projet.link.files === "" ? "" : <p><span>Files : </span><a href={projet.link.files} download="Files_of_the_project.rar" target='_blank' rel='noreferrer'>Download the files of the project here</a></p>}
                    <p><span>Skills developed : </span>{projet.skillsDev}</p>
                </div>
                <div className="description">
                    <h2>Description of the project : </h2>
                    <div className='ligne visible-projet'></div>
                    <p>{projet.description}</p>
                </div>
                <div className="problems">
                    <h2>Problem encountered : </h2>
                    <div className='ligne visible-projet'></div>
                    <p>{projet.problems}</p>
                </div>
            </div>
        </section>
    )
};

export default Projet;