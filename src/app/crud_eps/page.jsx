import Navbar from "../components/Navbar"
import FormEps from "./FormEps"
import ListEps from "./ListEps"
import ProtectedRoute from '../autenticacion/ProtectedRoute';

export const dynamic = "force-dynamic"

function CrudEps() {
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
                    <div>
                        <FormEps />
                        <ListEps />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default CrudEps