import { useEffect, useRef, useMemo } from "react";
import ImgOrdi from '../assets/ordi.webp';
import FrIcone from '../assets/fr-language-icon.webp';
import EnIcone from '../assets/en-language-icon.webp';
import imgTwitter from '../assets/twitter.webp';
import CV from '../assets/CV_MAHMOUDOU_ANGLAIS.pdf';

function Presentation() {
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
        }
        return () => {
            observer.unobserve(contain);
            observer.unobserve(contain.querySelector('.icones-reseaux-sociaux'));
            observer.unobserve(contain.querySelector('.txt-presentation-paragraphe'));
            observer.unobserve(contain.querySelector('.ordi'));
            observer.unobserve(contain.querySelector('.changement-background'));
            observer.unobserve(contain.querySelector('.langage'));
        }
    }, [containRef, options]);

    const txt = "HELLO, WELCOME TO MY PORTFOLIO OF WEB DEVELOPER";
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
            titlePortfolio.append(txt[index]);
            text = titlePortfolio.textContent;
            if (index < txt.length-1) {
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
        <article ref={containRef} className="presentation">
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
                    <h1>HELLO, WELCOME TO MY PORTFOLIO OF WEB DEVELOPPER</h1>
                    <div ref={txtPresentationParagrapheTitre} className="txt-presentation-paragraphe-title"></div>
                    <p className="txt-presentation-paragraphe">My name is Mahmoudou Abdoul Nganiyyou and i'm a Result-Oriented fullstack Developer building and managing Websites and Web Applications that leads to the success of the overall product</p>
                    <a className="cv" href={CV} download="CV_Mahmoudou.pdf" rel='noreferrer' target='_blank'>Download my CV</a>
                </div>
                <div className='image-presentation-et-background'>
                    <img className='ordi' src={ ImgOrdi } alt="Ordinateur de travail d'un developpeur web" />
                    <div className='changement-background'>
                        <i id='sun' className="fa-solid fa-sun"></i>
                        <i id='moon' className="fa-solid fa-moon"></i>
                        <div className='interrupteur-background'></div>
                    </div>
                   
                </div>
            </div>
            <div className='langage'>
                <img className='Fr' src= {FrIcone} alt="Icone langue française" />
                <img className='En' src= {EnIcone} alt="Icone langue anglaise" />
            </div>
        </article>
    )
};

export default Presentation;