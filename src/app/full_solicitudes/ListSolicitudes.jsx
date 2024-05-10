import React from 'react';
import SolicitudesTable from "./SolicitudesTable"

async function cargarSolicitudes() {
    const res = await fetch(`${process.env.BACKEND_URL}/solicitudes/`)
    const solicitudes = await res.json()
    return solicitudes;
}

async function ListSolicitudes() {

    const solicitudes = await cargarSolicitudes()
    console.log(solicitudes)

    return (
        <div className='bg-gray-50 p-4 w-full rounded-md'>
            <SolicitudesTable solicitudes={solicitudes} />
        </div>
    );
}

export default ListSolicitudes;