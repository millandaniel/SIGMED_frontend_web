import NavbarClean from "../components/NavbarClean"
import FormAutenticacion from "./FormAutenticacion"

export const dynamic = "force-dynamic"

function PaginaAutenticacion() {
    return (
        <div>
            <nav>
                <NavbarClean />
            </nav>

            <div
                className=" container mx-auto"
            >
                <br />
                <div className=" flex gap-x-10 justify-center">
                    <FormAutenticacion />
                </div>
            </div>
        </div>
    )
}

export default PaginaAutenticacion