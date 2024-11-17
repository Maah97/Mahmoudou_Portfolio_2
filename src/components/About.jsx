import { useEffect, useRef, useMemo, useContext } from "react";
import { useTranslation } from "react-i18next";
import { LangContext } from "../context/langage";
import { ThemeContext } from "../context/theme";

function About() {
    const { t } = useTranslation();
    const { lang } = useContext(LangContext);
    const {theme} = useContext(ThemeContext);
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
                entry.target.classList.add('visible-apropos');
                observer.unobserve(entry.target);
            }
        });
    }
    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, options);
        let contain = containRef.current
        if (containRef.current) {
            observer.observe(contain);
            observer.observe(contain.querySelector('.txt-apropos-h2'));
            observer.observe(contain.querySelector('.ligne1'));
            observer.observe(contain.querySelector('.txt-apropos-p'));
            observer.observe(contain.querySelector('.ligne2'));
            observer.observe(contain.querySelector('.paragraphes-apropos'));
        }
        return () => {
            observer.unobserve(contain);
            observer.unobserve(contain.querySelector('.txt-apropos-h2'));
            observer.unobserve(contain.querySelector('.ligne1'));
            observer.unobserve(contain.querySelector('.txt-apropos-p'));
            observer.unobserve(contain.querySelector('.ligne2'));
            observer.unobserve(contain.querySelector('.paragraphes-apropos')); 
        }
    }, [containRef, options]);
    return (
        <article ref={containRef} id="about" className={theme==='light' ? "apropos" : "apropos dark visible"}>
            <svg id="svg-curve1" className="svg-curve svg-curve1" viewBox="0 0 1440 79" xmlns="http://www.w3.org/2000/svg">
                <path d="M-100 79C-100 79 218.416 23.165 693.5 23.165C1168.58 23.165 1487 79 1487 79V0H-100V79Z"></path>
            </svg>
            <div className="txt-apropos">
                <h2 className="txt-apropos-h2">{t("about.title")}</h2>
                <div className="ligne ligne1"></div>
                <p className="txt-apropos-p">{t("about.subtitle")}</p>
                <div className="ligne ligne2"></div>
                <div className="paragraphes-apropos">
                    <p>{t("about.paragraphe.p1")} <a href="https://openclassrooms.com/fr/">Openclassroom</a>, {t("about.paragraphe.p2")} <a href="#projects">{t("about.paragraphe.link1")}</a> {lang === 'en' ? "section" : ""}.</p>
                    <p>{t("about.paragraphe.p3")} <a href="https://linkedin.com/in/mahmoudou-abdoul-nganiyyou-2b805a180">Linkedin</a> {t("about.paragraphe.p4")} <a href="https://x.com/mahmoudouabdoul">Twitter</a> {t("about.paragraphe.p5")} <a href="#contact">{t("about.paragraphe.link2")}</a> {lang === 'en' ? "me" : ""}.</p>
                </div>
            </div>
            <svg id="skills" className="svg-curve svg-curve2" viewBox="0 0 1440 79" xmlns="http://www.w3.org/2000/svg">
                <path d="M-100 0C-100 0 218.416 55.835 693.5 55.835C1168.58 55.835 1487 0 1487 0V79H-100V0Z"></path>
            </svg>
        </article>
    )
};

export default About;