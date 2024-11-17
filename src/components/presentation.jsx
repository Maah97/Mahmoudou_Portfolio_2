import { useEffect, useRef, useMemo, useContext } from "react";
import { LangContext } from "../context/langage";
import { ThemeContext } from "../context/theme";
import { useTranslation } from "react-i18next";
import ImgOrdi from '../assets/ordi.webp';
import FrIcone from '../assets/fr-language-icon.webp';
import EnIcone from '../assets/en-language-icon.webp';
import imgTwitter from '../assets/twitter.webp';
import cvEn from '../assets/CV_MAHMOUDOU_EN.pdf';
import cvFr from '../assets/CV_MAHMOUDOU_FR.pdf';

function Presentation() {
    const {lang, toggleLang} = useContext(LangContext);
    const {theme, toggleTheme} = useContext(ThemeContext);
    const { t } = useTranslation();
    const containRef = useRef(null);
    const ratio = 0.1;
    const options = useMemo(() => {
        return {
            root: null,
            rootMargin: "0px",
            threshold: .1
        };
    }, [])
     
    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > ratio) {
                entry.target.style.opacity = 1;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, options);
        let contain = containRef.current
        if (containRef.current) {
            observer.observe(contain);
            observer.observe(contain.querySelector('.icones-reseaux-sociaux'));
            observer.observe(contain.querySelector('.txt-presentation-paragraphe'));
            observer.observe(contain.querySelector('.ordi'));
            observer.observe(contain.querySelector('.changement-background'));
            observer.observe(contain.querySelector('.langage'));
            observer.observe(contain.querySelector('.change-langue'));
        }
        return () => {
            observer.unobserve(contain);
            observer.unobserve(contain.querySelector('.icones-reseaux-sociaux'));
            observer.unobserve(contain.querySelector('.txt-presentation-paragraphe'));
            observer.unobserve(contain.querySelector('.ordi'));
            observer.unobserve(contain.querySelector('.changement-background'));
            observer.unobserve(contain.querySelector('.langage'));
            observer.unobserve(contain.querySelector('.change-langue'));
        }
    }, [containRef, options]);

    const txtPresentationParagrapheTitre = useRef(null);
    
    useEffect(() => {
        let speed = 80;
        let index = 0;
        const titlePortfolio = txtPresentationParagrapheTitre.current;
        let text = "";
        function effacer() {
            text = text.slice(0,-1);
            titlePortfolio.textContent = text;
            if (index > 0) {
                index--;
                return setTimeout(() => {
                    return effacer();      
                 },speed);
            } else {
                return setTimeout(() => {
                    return write();      
                 },1000);
            }
        }
        function write() {
            titlePortfolio.append(t("presentation.title")[index]);
            text = titlePortfolio.textContent;
            if (index < t("presentation.title").length-1) {
                index++;
                return setTimeout(() => {
                   return write();      
                },speed);
            } else {
                return setTimeout(() => {
                    return effacer();      
                 },3000);
            }
        }
        setTimeout(() => {
            return write();      
         },2000);
        
    })
    return (
        <article ref={containRef} className={theme==='light' ? "presentation" : "presentation dark visible"}>
            <div className='bloc-de-presentation'>
                <div className='icones-reseaux-sociaux'>
                    <a href="https://linkedin.com/in/mahmoudou-abdoul-nganiyyou-2b805a180" rel='noreferrer' target='_blank'>
                        <i id='linkedin' className="fa-brands fa-linkedin"></i>
                    </a>
                    <a href="https://github.com/Maah97" rel='noreferrer' target='_blank'>
                        <i id='github' className="fa-brands fa-github"></i>
                    </a>
                    <a href="https://x.com/mahmoudouabdoul" rel='noreferrer' target='_blank'>
                        <img id='twitter' src={imgTwitter} alt="X anciennement twitter" />
                    </a>
                </div>
                <div className='txt-presentation'>
                    <h1>{t("presentation.title")}</h1>
                    <div ref={txtPresentationParagrapheTitre} className="txt-presentation-paragraphe-title"></div>
                    <p className="txt-presentation-paragraphe">{t("presentation.paragrahe")}</p>
                    <a className="cv" style={lang === 'fr' ? {width: "300px"} : {}} href={lang==='en' ? cvEn : cvFr} download="CV_Mahmoudou.pdf" rel='noreferrer' target='_blank'>{t("presentation.cv")}</a>
                </div>
                <div className='image-presentation-et-background'>
                    <img className='ordi' src={ ImgOrdi } alt="Ordinateur de travail d'un developpeur web" />
                    <div onClick={() => toggleTheme()} className='changement-background'>
                        <i id='sun' className="fa-solid fa-sun"></i>
                        <i id='moon' className="fa-solid fa-moon"></i>
                        <div className='interrupteur-background'></div>
                    </div>
                   
                </div>
            </div>
            <p className="change-langue">{t("changeLangage")}</p>
            <div className='langage'>
                <img className={lang === 'en' ? "En selected" : "En"} onClick={() => toggleLang('en')} src= {EnIcone} alt="Icone langue anglaise" />
                <img className={lang === 'fr' ? "Fr selected" : "Fr"} onClick={() => toggleLang('fr')} src= {FrIcone} alt="Icone langue française" />
            </div>
        </article>
    )
};

export default Presentation;