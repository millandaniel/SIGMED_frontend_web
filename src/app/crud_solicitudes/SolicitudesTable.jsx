"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import { Modal } from 'bootstrap'; // Importa solo el componente Modal de Bootstrap

const opcionesPagina = { rowsPerPageText: 'Filas Por Pagina:', rangeSeparatorText: 'de', noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: 'Todas' };

// Definir las columnas de la tabla
const columnas = [
    {
        name: "Fecha De La Solicitud",
        selector: row => row.fecha_hora,
        sortable: true
    },
    {
        name: "Emergencia",
        selector: row => row.emergencia_detectada,
        sortable: true
    },
    {
        name: "Nombre/s",
        selector: row => row.nombre_usuario
    },
    {
        name: "Apellido/s",
        selector: row => row.apellido_usuario
    },
    {
        name: "Triage",
        selector: row => row.triage,
        sortable: true
    },
    {
        name: "Fecha De Nacimiento",
        selector: row => row.fecha_nacimiento_usuario,
        sortable: true
    }
];

function SolicitudesTable({ solicitudes }) {

    // Estado para controlar la fila seleccionada
    const router = useRouter();

    const [filteredSolicitudes, setFilteredSolicitudes] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [nombreHospital, setNombreHospital] = useState('');

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData && userData.nombre_hospital) {
            setNombreHospital(userData.nombre_hospital);
            const filtered = solicitudes.filter(solicitud => solicitud.nombre_hospital === userData.nombre_hospital);
            setFilteredSolicitudes(filtered);
        }
    }, [solicitudes]);

    // Función para abrir el modal y mostrar los detalles de la solicitud seleccionada
    const handleOpenModal = (row) => {
        setSelectedRow(row);
        // Abre el modal utilizando el ID del modal definido en el JSX
        const modal = new Modal(document.getElementById('modal'), {});
        modal.show();
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Actualiza los registros cada 5000 milisegundos (5 segundos)
            const userData = JSON.parse(localStorage.getItem('user'));
            if (userData && userData.nombre_hospital) {
                const filtered = solicitudes.filter(solicitud => solicitud.nombre_hospital === userData.nombre_hospital);
                setFilteredSolicitudes(filtered);

                router.refresh();
                console.log("ACTUALIZANDO TABLA")
            }
        }, 300000);

        return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
    }, [solicitudes]);


    return (
        <div>
            <h2>Solicitudes - {nombreHospital}</h2>

            <div className=" justify-between m-3">
                {/* DataTable con las columnas y los datos */}
                <DataTable
                    className=' rounded-2xl border border-gray-800'
                    columns={[
                        ...columnas, // Agregar las columnas definidas anteriormente
                        { // Columna personalizada para el botón "Ver Detalles"
                            cell: (row) => <button className="font-semibold text-white rounded-md p-2 m-2 justify-center " onClick={() => handleOpenModal(row)}>Detalles</button>,
                            allowOverflow: true,
                            button: true,
                            width: "100px"
                        }
                    ]}
                    data={filteredSolicitudes}
                    pagination
                    paginationPerPage={6}
                    paginationRowsPerPageOptions={[6, 12, 18, 24, 30, 36]}
                    highlightOnHover
                    noDataComponent={<h2 className=' text-4xl text-red-600'>No hay Hospitales Para Mostrar</h2>}
                    paginationComponentOptions={opcionesPagina}
                    responsive
                />

                {/* Modal para mostrar los detalles de la solicitud seleccionada */}
                <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Detalles de la Solicitud</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* Muestra los detalles de la solicitud seleccionada */}
                                {selectedRow && (
                                    <div>
                                        <p>Emergencia Detectada: {selectedRow.emergencia_detectada}</p>
                                        <p>Direccion De la Emergencia: {selectedRow.direccion}</p>
                                        <p>Nombre del Usuario: {selectedRow.nombre_usuario}</p>
                                        <p>Apellidos del Usuario: {selectedRow.apellido_usuario}</p>
                                        <p>Correo: {selectedRow.correo_usuario}</p>
                                        <p>Fecha de Nacimiento: {selectedRow.fecha_nacimiento_usuario}</p>
                                        <p>Telefono: {selectedRow.telefono_usuario}</p>
                                        <p>Triage: {selectedRow.triage}</p>
                                        <p>Sintomas: {selectedRow.sintomas_presentes}</p>
                                        <p>Hospital: {selectedRow.nombre_hospital}</p>
                                        <p>Fecha de la Solicitud: {selectedRow.fecha_hora}</p>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SolicitudesTable;