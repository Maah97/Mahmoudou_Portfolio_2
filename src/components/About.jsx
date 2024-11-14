import { useEffect, useRef, useMemo } from "react";

function About() {
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
        <article ref={containRef} id="about" className="apropos">
            <svg id="svg-curve1" className="svg-curve svg-curve1" viewBox="0 0 1440 79" xmlns="http://www.w3.org/2000/svg">
                <path d="M-100 79C-100 79 218.416 23.165 693.5 23.165C1168.58 23.165 1487 79 1487 79V0H-100V79Z"></path>
            </svg>
            <div className="txt-apropos">
                <h2 className="txt-apropos-h2">ABOUT ME</h2>
                <div className="ligne ligne1"></div>
                <p className="txt-apropos-p">Here you will find more information about me, what I do, and my current skills mostly in terms of programming and technology</p>
                <div className="ligne ligne2"></div>
                <div className="paragraphes-apropos">
                    <p>Fresh out of a training for the web developer path on <a href="https://openclassrooms.com/fr/">Openclassroom</a>, I am more focused on the front-end but I also master the back end side with NodeJS and MongoDB. Discover some of my work that I was able to achieve during my training in the <a href="#projects">projects</a> section.</p>
                    <p>I also like to share content related to things I have learned over the years in web development so that it can help other people in the Dev community. Feel free to connect or follow me on my <a href="https://linkedin.com/in/mahmoudou-abdoul-nganiyyou-2b805a180">Linkedin</a> and <a href="https://x.com/mahmoudouabdoul">Twitter</a> where I publish useful content related to web development and programming. I am open to job opportunities where I can contribute, learn and grow. If you have a good opportunity that matches my skills and experience, do not hesitate to <a href="#contact">contact</a> me.</p>
                </div>
            </div>
            <svg id="skills" className="svg-curve svg-curve2" viewBox="0 0 1440 79" xmlns="http://www.w3.org/2000/svg">
                <path d="M-100 0C-100 0 218.416 55.835 693.5 55.835C1168.58 55.835 1487 0 1487 0V79H-100V0Z"></path>
            </svg>
        </article>
    )
};

export default About;