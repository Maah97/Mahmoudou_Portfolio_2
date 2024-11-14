import Presentation from "../components/presentation";
import About from "../components/About"
import Skills from "../components/skills";
import Contact from "../components/contact";
import Projets from "../components/projets";

function Home() {
    return (
        <section className="page-accueil">
            <Presentation />
            <About />
            <Skills />
            <Projets />
            <Contact />
        </section>
    )
};

export default Home;