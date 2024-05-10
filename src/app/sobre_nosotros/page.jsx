import Navbar from "../components/NavbarLogin"

function SobreNosotros() {
    return (
        <div>
            <nav>
                <Navbar />
            </nav>
            <div
                className=" container mx-auto"
            >
                <center>
                    <h1>Sobre Nosotros</h1>
                </center>
                <div className=" flex gap-x-10">
                    <div className=" bg-blue-600 text-white px-4 py-3 mb-2 rounded-md flex justify-between">
                        <center>
                            <p>
                                SigMed es una empresa innovadora dedicada
                                a transformar la atención médica de emergencia
                                en Bogotá y más allá. Nuestro objetivo es
                                ofrecer soluciones tecnológicas avanzadas que
                                agilicen la detección, clasificación y asignación
                                de recursos médicos, mejorando así la calidad y
                                eficiencia de la asistencia en situaciones críticas.
                                Nos comprometemos a conectar vidas y salvar momentos,
                                brindando confianza y apoyo en los momentos más urgentes
                            </p>
                        </center>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SobreNosotros