import Navbar from "../components/Navbar"
import FormUsuario from "./FormUsuario"
import ListUsuario from "./ListUsuario"
import ProtectedRoute from '../autenticacion/ProtectedRoute';

export const dynamic = "force-dynamic"

function CrudUsuario() {
    return (
        <ProtectedRoute allowedRoles={['administrador']}>
            <div>
                <nav>
                    <Navbar />
                </nav>
                <div
                    className=" container mx-auto"
                >
                    <div>
                        <FormUsuario />
                        <ListUsuario />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default CrudUsuario