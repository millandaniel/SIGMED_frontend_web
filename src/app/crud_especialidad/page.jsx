import Navbar from "../components/Navbar"
import FormEspecialidad from "./FormEspecialidad"
import ListEspecialidad from "./ListEspecialidad"
import ProtectedRoute from '../autenticacion/ProtectedRoute';

export const dynamic = "force-dynamic"

function CrudEspecialidad() {
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
                    <div >
                        <FormEspecialidad />
                        <ListEspecialidad />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default CrudEspecialidad