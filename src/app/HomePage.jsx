"use client"

/* eslint-disable @next/next/no-img-element */
import Navbar from "./components/NavbarLogin"
import Image from "next/image"
import Head from 'next/head';
import styles from './components/Home.module.css';
import { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import StyleImage from "react-image-gallery/styles/css/image-gallery.css";

function Presentacion() {

    const [index, setIndex] = useState(0);
    const images = [
        {
            original: "https://img.freepik.com/foto-gratis/doctor-estetoscopio-cerca_23-2149191355.jpg?t=st=1715325879~exp=1715329479~hmac=07637628b0c9213557bd089d99d06d1f1c6d1f59815a5676e78360872c34c1d1&w=996",
            thumbnail: "https://img.freepik.com/foto-gratis/doctor-estetoscopio-cerca_23-2149191355.jpg?t=st=1715325879~exp=1715329479~hmac=07637628b0c9213557bd089d99d06d1f1c6d1f59815a5676e78360872c34c1d1&w=996",
        },
        {
            original: "https://img.freepik.com/foto-gratis/doctora-feliz-dando-alta-fie-nino-que-vino-su-padre-al-hospital_637285-492.jpg?t=st=1715325888~exp=1715329488~hmac=bc9b68fed251ac8ad0da2bfe483dcade1c63354ea18be916eea88d967d7cbb78&w=996",
            thumbnail: "https://img.freepik.com/foto-gratis/doctora-feliz-dando-alta-fie-nino-que-vino-su-padre-al-hospital_637285-492.jpg?t=st=1715325888~exp=1715329488~hmac=bc9b68fed251ac8ad0da2bfe483dcade1c63354ea18be916eea88d967d7cbb78&w=996",
        },
        {
            original: "https://img.freepik.com/foto-gratis/concepto-salud-estetoscopio-ventosas-mano_53876-129536.jpg?t=st=1715324802~exp=1715328402~hmac=dadd19d131f5aa0811baba5a6f844601e559c80c7602d2e2b5be8cd84619bc2d&w=996",
            thumbnail: "https://img.freepik.com/foto-gratis/concepto-salud-estetoscopio-ventosas-mano_53876-129536.jpg?t=st=1715324802~exp=1715328402~hmac=dadd19d131f5aa0811baba5a6f844601e559c80c7602d2e2b5be8cd84619bc2d&w=996",
        },
        {
            original: "https://img.freepik.com/foto-gratis/joven-medico-guapo-tunica-medica-estetoscopio_1303-17818.jpg?t=st=1715325896~exp=1715329496~hmac=3e9e42a702145628f9bc4c4755c336246db4578b96e3c10c12bcfb6478d852b3&w=996",
            thumbnail: "https://img.freepik.com/foto-gratis/joven-medico-guapo-tunica-medica-estetoscopio_1303-17818.jpg?t=st=1715325896~exp=1715329496~hmac=3e9e42a702145628f9bc4c4755c336246db4578b96e3c10c12bcfb6478d852b3&w=996",
        },
        {
            original: "https://img.freepik.com/foto-gratis/concepto-seguro-vida-familia-papel_23-2149191410.jpg?t=st=1715325899~exp=1715329499~hmac=c1857e7a175feed7011e896ddde38b4ed73b340ea260a394ca38922351c2d862&w=996",
            thumbnail: "https://img.freepik.com/foto-gratis/concepto-seguro-vida-familia-papel_23-2149191410.jpg?t=st=1715325899~exp=1715329499~hmac=c1857e7a175feed7011e896ddde38b4ed73b340ea260a394ca38922351c2d862&w=996",
        },
        {
            original: "https://img.freepik.com/foto-gratis/covid-19-trabajadores-salud-concepto-pandemia-hermosa-solicita-medico-asiatico-enfermera-matorrales-mostrando-gesto-corazon-sonriendo-cuidando-pacientes-amor-fondo-blanco_1258-84118.jpg?t=st=1715325919~exp=1715329519~hmac=61f82a82d7b8f5ca3109da6a1daced8acd9c1000bc7d4032198808b2d01aa97a&w=1380",
            thumbnail: "https://img.freepik.com/foto-gratis/covid-19-trabajadores-salud-concepto-pandemia-hermosa-solicita-medico-asiatico-enfermera-matorrales-mostrando-gesto-corazon-sonriendo-cuidando-pacientes-amor-fondo-blanco_1258-84118.jpg?t=st=1715325919~exp=1715329519~hmac=61f82a82d7b8f5ca3109da6a1daced8acd9c1000bc7d4032198808b2d01aa97a&w=1380",
        },
        {
            original: "https://img.freepik.com/foto-gratis/banner-medico-medico-estetoscopio_23-2149611224.jpg?t=st=1715325926~exp=1715329526~hmac=298b1d169d9970e1fac8b92be5532622e11460989621f41763c5e25963f55fbe&w=996",
            thumbnail: "https://img.freepik.com/foto-gratis/banner-medico-medico-estetoscopio_23-2149611224.jpg?t=st=1715325926~exp=1715329526~hmac=298b1d169d9970e1fac8b92be5532622e11460989621f41763c5e25963f55fbe&w=996",
        }
    ];


    return (
        <div>
            <Head>
                <title>Sigmed - Plataforma de Gestión Médica</title>
                <meta name="description" content="Plataforma de gestión médica. Organiza tus procesos médicos de forma eficiente." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.container}>

                <section>
                    <div className=" bg-gray-100">
                        <h1 className=" text-7xl font-bold">Bienvenido a Sigmed</h1>
                        <p className=" text-base font-semibold">Agilizando la atención de emergencias médicas en Bogotá</p>
                        <br />
                    </div>
                </section>
                <br />
                <section >
                    <div className=" w-auto h-1/2 items-center">
                        <ImageGallery
                            items={images}

                        />
                    </div>
                </section>
                <br />
                <section className={styles.about}>
                    <div className={styles.aboutContent}>
                        <h2>¿Qué es Sigmed?</h2>
                        <p>Sigmed es una aplicación de software destinada a asistir la gestión de recursos en situaciones de emergen-cia médica en Bogotá, Colombia.
                            Esta aplicación se plantea como una herramienta de apoyo que agilizará la evaluación de la gravedad de una emergencia médica, su clasificación
                            según prioridad y la recomendación del hospital más adecuado para su tratamiento, inicialmente co-mo una aplicación para dispositivos móviles.</p>
                    </div>
                </section>
                <br />
                <section className={styles.team}>
                    <h2 className=" text-5xl">Nuestro Equipo</h2>
                    <br />
                    <div className={styles.teamMembers}>
                        <div className={styles.teamMember}>
                            <Image className={styles.logoSigmed}
                                src={"/Andres.jpg"}
                                alt={"logo"}
                                width={400}
                                height={125}>
                            </Image>
                            <p className=" font-bold">Andres Porras</p>
                            <br />
                            <p>Scrum Master
                                Product Owner
                                Desarrollador</p>
                        </div>
                        <div className={styles.teamMember}>
                            <Image className={styles.logoSigmed}
                                src={"/Sebastian.jpg"}
                                alt={"logo"}
                                width={400}
                                height={125}>
                            </Image>
                            <p className=" font-bold">Sebastian Sandoval</p>
                            <br />
                            <p>Product Owner
                                Desarrollador
                                Arquitecto de Software</p>
                        </div>
                        <div className={styles.teamMember}>
                            <Image className={styles.logoSigmed}
                                src={"/Daniel.png"}
                                alt={"logo"}
                                width={400}
                                height={125}>
                            </Image>
                            <p className=" font-bold">Daniel Millan</p>
                            <br />
                            <p>Product Owner
                                Desarrollador
                                Tester QA</p>
                        </div>
                    </div>
                </section>
                <section>
                    <div className=" bg-cyan-700">
                        <center>
                            <br />
                            <p className=" text-white font-semibold text-sm">
                                SigMed © Año [2024]
                            </p>
                            <p className=" text-white text-sm">
                                Excepto donde se indique lo contrario, todo el contenido de esta obra está bajo la licencia de Creative Commons
                            </p>
                            <p className=" text-white text-sm">
                                Reconocimiento-NoComercial-CompartirIgual 4.0 Internacional.
                            </p>
                            <p className=" text-white text-sm">
                                Para ver una copia de esta licencia, visite
                            </p>
                            <a className=" text-white font-semibold text-sm" href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="creativecommons">http://creativecommons.org/licenses/by-nc-sa/4.0/</a>
                            <p className=" text-white text-sm">
                                o envíe una carta a Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
                            </p>
                            <br />
                        </center>
                    </div>
                </section>
                <br />
            </main>
        </div>
    );
}

export default Presentacion