import { useEffect, useRef, useMemo, useContext } from "react";
import { ThemeContext } from "../context/theme";
import { useTranslation } from "react-i18next";
import { LangContext } from "../context/langage";
import CardProjet from './cardProjet';
import projetsEN from '../projets/EN/projets.json';
import projetsFR from '../projets/FR/projets.json';

function Projets() {
    const { t } = useTranslation();
    const {lang} = useContext(LangContext);
    const {theme} = useContext(ThemeContext);
    let projets = lang === 'en' ? projetsEN : projetsFR;
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
                entry.target.style.opacity = 1;
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
        <article ref={containRef} id="projects" className={theme==='light' ? "projets" : "projets dark visible"}>
             <svg className="svg-curve" viewBox="0 0 1440 79" xmlns="http://www.w3.org/2000/svg">
                <path d="M-100 79C-100 79 218.416 23.165 693.5 23.165C1168.58 23.165 1487 79 1487 79V0H-100V79Z"></path>
            </svg>
            <h2 className="txt-title-projets">{t("projects")}</h2>
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