import Navbar from "../components/NavbarMod"
import LoremIpsum from 'lorem-ipsum';
import ProtectedRoute from '../autenticacion/ProtectedRoute';
import ListSolicitudes from "./ListSolicitudes"


export const dynamic = "force-dynamic"

function CrudSolicitudes() {

    return (
        <ProtectedRoute allowedRoles={['moderador']}>
            <div>
                <nav>
                    <Navbar />
                </nav>
                <div
                    className=" container mx-auto"
                >
                    <br />
                    <center>
                        <ListSolicitudes />
                    </center>

                </div>
            </div>
        </ProtectedRoute>
    )
}

export default CrudSolicitudes