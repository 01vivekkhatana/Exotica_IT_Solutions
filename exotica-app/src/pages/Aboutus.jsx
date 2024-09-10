import { Link } from "react-router-dom";
import Header from "../components/Header";
import heroBg from '../images/hero_bg.png';
import Footer from "../components/Footer";

function AboutUs() {


    const backgroundStyle = {
        backgroundImage: `url(${heroBg})`,
    };
    const logos = [
        "tech-1.png",
        "tech-2.png",
        "tech-3.png",
        "tech-4.png",
        "tech-5.png",
        "tech-6.png",
        "tech-7.png"
    ];


    return (
        <>
            <Header />
            <section className="hero_sec bg-style" style={backgroundStyle}>
                <div className="container">
                    <div className="row flex justify-between align-center">
                        <div className="col-5">
                            <div className="hero_content">
                                <h2>
                                    About Us
                                </h2>
                                <p><Link to="/">Home</Link> About Us</p>
                            </div>
                        </div>
                        <div className="col-7">
                            <div className="hero_img">
                                <img className="circles" src="circles.png" alt="img" />
                                <div className="main_img">
                                    <img src="about_hero.png"
                                        alt="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="partner_section reveal">
                <div className="container">
                    <div className="row">
                        <div className="col-7">
                            <div className="partner_img">
                                <img src="about_1.png" alt="about" />
                            </div>
                        </div>
                        <div className="col-5">
                            <div class="heading-title">
                                <h2>Your Trusted Development and Digital Marketing Partner</h2>
                            </div>
                            <div className="partener_content">
                                <p>Whether you’re a global enterprise, an SME or a startup, you can count on
                                    us for result-driven custom design, development and digital marketing
                                    services. We help your business thrive through the world-class web, CMS,
                                    and Ecommerce development.</p>
                                <ul>
                                    <li> Whether you’re a global enterprise</li>
                                    <li> Whether you’re a global enterprise</li>
                                    <li> Whether you’re a global enterprise</li>
                                    <li> Whether you’re a global enterprise</li>
                                </ul>
                                <div className="hero_btn">
                                    <Link to="#" className="theme_btn">Explore Services</Link>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </section>

            <section className="who_we_are_section reveal ">
                <div className="container">
                    <div className="row">
                        <div className="col-7">
                            <div class="heading-title">
                                <h2>Who We Are</h2>
                            </div>
                            <div className="partener_content">
                                <p>Established in (Year), Exotica is a new age IT company based in Edgevalley
                                    Road London, Ontario, Canada, offering world-class design, development
                                    and digital marketing service to meet your business’ unique needs.</p>

                                <p>
                                    Regardless of your industry and business size, our perfect blend of highly-
                                    qualified experts, one-of-a-kind approaches, and new-age technology
                                    solutions will help your business reach new heights that you haven’t imagined.
                                </p>

                                <p>
                                    We use human intelligence, data, and state-of-the-art technology in a variety of
                                    services we provide, from design to development, support and SEO. And we strive for
                                    ongoing improvement by consistently refining the results as soon as they come in.
                                </p>
                            </div>
                            <div className="hero_btn">
                                <Link to="#" className="theme_btn">Explore Services</Link>
                            </div>

                        </div>

                        <div className="col-5">
                            <div className="we_are_img">
                                <img src="who_we_are.png" alt="about" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="our_mission_section reveal">
                <div className="container">
                    <div className="row">
                        <div className="col-7">
                            <div className="mission_img">
                                <img src="mission.png" alt="about" />
                            </div>
                        </div>

                        <div className="col-5">
                            <div class="heading-title">
                                <h2>Our Mission</h2>
                            </div>
                            <div className="partener_content">
                                <p>Our mission is to provide innovative and customized IT solutions that meet
                                    the unique needs of our clients. We strive to exceed their expectations by
                                    delivering high-quality products and services while maintaining a
                                    commitment to customer satisfaction and excellence.</p>
                                <p>
                                    An effective mission statement will naturally change over time. As a company
                                    grows, it may reach its early goals, and they’ll change. It’s important to revise
                                    mission statements as needed to reflect the business’s new culture as it
                                    achieves its goals and develops new targets.
                                </p>

                            </div>
                            <div className="hero_btn">
                                <Link to="#" className="theme_btn">Explore Services</Link>
                            </div>

                        </div>


                    </div>
                </div>
            </section>
            <section class="technology_sec reveal">
                <div class="container">
                    <div class="inner_technology">
                        <div class="heading-title">
                            <h2><span>Technology</span></h2>
                            <p>Our engineers understand your business needs and assist in selecting the appropriate technology for your solution.</p>
                        </div>
                        <div className="technology_brand_logo">
                            <div className="slider">
                                {logos.concat(logos).map((logo, index) => (
                                    <div className="tech_logo" key={index}>
                                        <img src={logo} alt={`Technology logo ${index + 1}`} />
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
export default AboutUs;