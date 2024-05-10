"use client"
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import { Modal } from 'bootstrap'; // Importa solo el componente Modal de Bootstrap

const opcionesPagina = { rowsPerPageText: 'Filas Por Pagina:', rangeSeparatorText: 'de', noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: 'Todas' };

// Definir las columnas de la tabla
const columnas = [
    // {
    //     name: "ID",
    //     selector: row => row.id,
    //     sortable: true,
    //     center: true,
    //     cell: row => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{row.id}</div>
    // },
    {
        name: "Nombre",
        selector: row => row.nombre,
        sortable: true,
        center: true,
        width: "400px",
        cell: row => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{row.nombre}</div>
    }
];

function EpsCard({ epss }) {

    const router = useRouter();
    const [edit, setEdit] = useState(false)

    const [selectedRow, setSelectedRow] = useState(null);

    //Constantes utilizadas para la modificacion de los datos
    const [nuevonombre, setnuevonombre] = useState('')

    const cargarDatosEps = (eps) => {
        setnuevonombre(eps.nombre);
    };

    //Funcion para eliminar una eps de la base de datos
    const eliminarEps = async (id) => {
        console.log(id)
        if (window.confirm("¿Desea eliminar esta Eps?")) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/eps/eliminar/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                }),
            });

            const data = await res.json();

            if (res.status === 200) {
                window.alert(data.mensaje)
                router.refresh();
            } else {
                window.alert(data.mensaje);
            }
        }

    };


    //Funcion para modificar una eps de la base de datos
    const modificarEps = async (id) => {
        console.log("Modificacion de eps: ", "Id: ", id, "Nombre: ", nuevonombre)
        if (!nuevonombre.trim()) {
            alert("No puede asignarle un nombre vacio a la Eps")
            return;
        } else {
            if (window.confirm("¿Deseas modificar esta eps?")) {
                //-------Mirar la verificacion de los campos si es necesaria
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/eps/modificar/`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: id,
                        nombre: nuevonombre,
                    }),

                });

                const data = await res.json();

                if (res.status === 200) {
                    window.alert(data.mensaje)
                    setnuevonombre("");
                    handleCloseModal();

                } else {
                    window.alert(data.mensaje);
                }

            }
            router.refresh();
            setEdit(false);
        }

    };

    const handleOpenModal = (row) => {
        setSelectedRow(row);
        cargarDatosEps(row); // Cargar los datos de la eps seleccionada
        setEdit(true); // Cambiar a modo de edición
        const modal = new Modal(document.getElementById('modal'), {});
        modal.show();
    };

    const handleCloseModal = () => {
        setSelectedRow(null);
        const modal = Modal.getInstance(document.getElementById('modal'));
        setnuevonombre("");
        modal.hide();
    };

    return (
        <div className="rounded-md justify-between">
            {/* DataTable con las columnas y los datos */}
            <center>
                <DataTable
                    className=' rounded-2xl border border-gray-800 w-full'
                    columns={[
                        ...columnas, // Agregar las columnas definidas anteriormente
                        { // Columna personalizada para el botón "Modificar"
                            cell: (row) => <button className="font-semibold text-white rounded-md p-2 m-2" onClick={() => handleOpenModal(row)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Modificar</button>,
                            allowOverflow: true,
                            button: true,
                            width: "100px"
                        },
                        { // Columna personalizada para el botón "Eliminar"
                            cell: (row) => <button className="font-semibold text-white rounded-md p-2 m-2 bg-red-600" onClick={() => eliminarEps(row.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Eliminar</button>,
                            allowOverflow: true,
                            button: true,
                            width: "100px"
                        }
                    ]}
                    data={epss}
                    pagination
                    paginationPerPage={6}
                    paginationRowsPerPageOptions={[6, 12, 18, 24, 30, 36]}
                    highlightOnHover
                    noDataComponent={<h2 className=' text-4xl text-red-600'>No hay Hospitales Para Mostrar</h2>}
                    paginationComponentOptions={opcionesPagina}
                    responsive
                />
            </center>

            {/* Modal para mostrar la modificacion de la eps seleccionada */}

            <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modificar Eps</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body">
                            {selectedRow && (
                                <div className="bg-gray-100 p-4 rounded-md">
                                    <h3>Nombre:</h3>
                                    <input
                                        type="text"
                                        name="nombre"
                                        placeholder={selectedRow.nombre}
                                        value={nuevonombre}
                                        onChange={e => setnuevonombre(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="modal-footer" >
                            <button className="bg-green-500 text-white rounded-md p-2" onClick={() => modificarEps(selectedRow.id)}>Guardar Cambios</button>
                            <button className="bg-red-600 text-white rounded-md p-2" onClick={handleCloseModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EpsCard