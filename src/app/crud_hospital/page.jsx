import Navbar from "../components/Navbar"
import FormHospital from "./FormHospital"
import ListHospital from "./ListHospital"
import ProtectedRoute from '../autenticacion/ProtectedRoute';


export const dynamic = "force-dynamic"

function CrudHospital() {
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
                        <FormHospital />
                        <ListHospital />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}

export default CrudHospital