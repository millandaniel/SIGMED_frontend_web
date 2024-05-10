
import HospitalCard from "./HospitalCard"

async function cargarHospitales() {
    const res = await fetch(`${process.env.BACKEND_URL}/hospitales/`)
    const hospitales = await res.json()
    return hospitales
}

async function ListHospital() {

    const hospitales = await cargarHospitales()
    console.log(hospitales)

    return (

        <div className=" bg-gray-200 p-4 w-full rounded-md">
            <HospitalCard hospitales={hospitales} />
        </div>
    )
}

export default ListHospital