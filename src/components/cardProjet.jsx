import { React, useEffect, useRef, useMemo, useContext } from "react";
import { ThemeContext } from "../context/theme";
import { useTranslation } from "react-i18next";
import MongoDB1 from '../assets/mongodb2.svg';
import MongoDB2 from '../assets/mongodb3.svg';
import Lighthouse1 from '../assets/lighthouse2.svg';
import Lighthouse2 from '../assets/lighthouse3.svg';
import Notion1 from '../assets/notion-logo.svg';
import Notion2 from '../assets/notion-logo2.svg'
import { NavLink } from "react-router-dom";

function CardProjet(props) {
    const { t } = useTranslation();
    const {theme} = useContext(ThemeContext);
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
                entry.target.style.opacity = 1;
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
        <NavLink onClick={scrollToTop} ref={containRef} to={'/projects/' + props.id} className={theme==='light' ? "card-projet" : "card-projet dark visible-card-projet"}>
            <div className='conteneur-card-projet'>
                <img src={props.imgCover} alt="cover homepage of the project" className='img-cover' />
                <p>{props.titre}</p>
                <div className="ligne"></div>
                <p>{props.category}</p>
                <div className='technos'>
                    {
                        props.technos.map((techno,i) => (
                            <div key={i} className='techno'>
                                {techno === "MongoDB" ? <img src={theme==='light' ? MongoDB1 : MongoDB2} alt="logo MongoDB" /> : techno === "Lighthouse" ? <img src={theme==='light' ? Lighthouse1 : Lighthouse2} alt="logo Lighthouse" /> : techno === "Notion" ? <img src={theme==='light' ? Notion1 : Notion2} alt="logo Notion" />
                                : <i className={`fa-brands fa-${techno}`}></i>}
                                <p>{techno}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="txt-hover"><p>{t("cardProjet")}</p></div>
        </NavLink>
    )
};

export default CardProjet;