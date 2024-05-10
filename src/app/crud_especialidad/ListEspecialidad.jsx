import EspecialidadCard from "./EspecialidadCard"

async function cargarEspecialidades() {
    const res = await fetch(`${process.env.BACKEND_URL}/especialidades/`)
    const especialidades = await res.json()
    return especialidades
}

async function ListEspecialidad() {

    const especialidades = await cargarEspecialidades()

    return (
        <center>
            <div className=" bg-gray-200 p-4 rounded-md inline-block">
                <EspecialidadCard especialidades={especialidades} />
            </div>
        </center>
    )
}

export default ListEspecialidad