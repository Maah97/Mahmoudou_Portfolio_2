import { useEffect, useRef, useMemo, useContext } from "react";
import { ThemeContext } from "../context/theme";
import { useTranslation } from "react-i18next";
import logoMongoDB from '../assets/mongodb.svg';
import logoLighthouse from '../assets/lighthouse.svg'
import logoNotion from '../assets/notion-logo.svg'

function Skills() {
    const { t } = useTranslation();
    const {theme} = useContext(ThemeContext);
    const containRef = useRef(null);
    const ratio = 0.1;
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
                entry.target.classList.add('visible-competences');
                observer.unobserve(entry.target);
            }
            if (entry.intersectionRatio === 1) {
                entry.target.classList.add('transition');
            }
        });
    }
    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, options);
        let contain = containRef.current
        if (containRef.current) {
            observer.observe(contain);
            observer.observe(contain.querySelector('.title-skills'));
            observer.observe(contain.querySelector('.ligne'));
            contain.querySelectorAll('.carte-competence').forEach((r) => {
                observer.observe(r);
            });
        }
        return () => {
            observer.unobserve(contain);
            observer.observe(contain.querySelector('.title-skills'));
            observer.observe(contain.querySelector('.ligne'));
            contain.querySelectorAll('.carte-competence').forEach((r) => {
                observer.unobserve(r);
            });
        }
    }, [containRef, options]);
    return(
        <article ref={containRef} className={theme==='light' ? "competences" : "competences dark visible"}>
            <h2 className="title-skills">{t("skills")}</h2>
            <div className="ligne ligne-skills"></div>
            <div className="bloc-icones-competences">
                <div className='carte-competence html'>
                    <i className="fa-brands fa-html5"></i>
                    <p>HTML5</p>
                </div>
                <div className="carte-competence css">
                    <i className="fa-brands fa-css3"></i>
                    <p>CSS3</p>
                </div>
                <div className="carte-competence sass">
                    <i className="fa-brands fa-sass"></i>
                    <p>Sass</p>
                </div>
                <div className="carte-competence js">
                    <i className="fa-brands fa-js"></i>
                    <p>JavaScript</p>
                </div>
                <div className="carte-competence react">
                    <i className="fa-brands fa-react"></i>
                    <p>ReactJS</p>
                </div>
                <div className="carte-competence node">
                    <i className="fa-brands fa-node"></i>
                    <p>NodeJS</p>
                </div>
                <div className="carte-competence mongodb">
                    <img src={logoMongoDB} alt="logo MongoDB" />
                    <p>MongoDB</p>
                </div>
                <div className="carte-competence lighthouse">
                    <img src={logoLighthouse} alt="logo Lighthouse" />
                    <p>Lighthouse</p>
                </div>
                <div className="carte-competence notion">
                    <img src={logoNotion} alt="logo Notion" />
                    <p>Notion</p>
                </div>
            </div>
        </article>
    )
};

export default Skills;