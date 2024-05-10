import Navbar from "../components/Navbar"
import LoremIpsum from 'lorem-ipsum';
import ProtectedRoute from '../autenticacion/ProtectedRoute';
import ListSolicitudes from "./ListSolicitudes"


export const dynamic = "force-dynamic"

function FullSolicitudes() {

    return (
        <ProtectedRoute allowedRoles={['administrador']}>
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

export default FullSolicitudes