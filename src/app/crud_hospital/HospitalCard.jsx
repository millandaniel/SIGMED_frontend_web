"use client"
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";
import { Modal } from 'bootstrap'; // Importa solo el componente Modal de Bootstrap
import MultiSelectCheckboxDropdown from "../components/MultiSelectCheckboxDropdown";

const opcionesPagina = { rowsPerPageText: 'Filas Por Pagina:', rangeSeparatorText: 'de', noRowsPerPage: false, selectAllRowsItem: false, selectAllRowsItemText: 'Todas' };

// Definir las columnas de la tabla
const columnas = [
    // {
    //     name: "ID",
    //     selector: row => row.id,
    //     sortable: true,
    //     width: "8%",
    //     center: true,
    //     cell: row => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{row.id}</div>
    // },
    {
        name: "Nombre",
        selector: row => row.nombre,
        sortable: true,
        center: true,
        cell: row => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{row.nombre}</div>
    },
    {
        name: "Latitud",
        selector: row => row.latitud,
        center: true,
        cell: row => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{row.latitud}</div>
    },
    {
        name: "Longitud",
        selector: row => row.longitud,
        center: true,
        cell: row => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{row.longitud}</div>
    },
    {
        name: "Especialidades",
        selector: row => row.especialidades,
        center: true,
        cell: row => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{Array.isArray(row.especialidades) ? row.especialidades.join(', ') : row.especialidades.split(',').join(', ')}</div>
    },
    {
        name: "Eps Asociadas",
        selector: row => row.listaeps,
        center: true,
        cell: row => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{Array.isArray(row.listaeps) ? row.listaeps.join(', ') : row.listaeps.split(',').join(', ')}</div>
    }
];

function HospitalCard({ hospitales }) {

    const router = useRouter();
    const [edit, setEdit] = useState(false)

    const [selectedRow, setSelectedRow] = useState(null);

    //Constantes utilizadas para la modificacion de los datos
    const [nuevonombre, setnuevonombre] = useState('')
    // const [nuevocodigo_registro, setnuevocodigo_registro] = useState(hospital.codigo_registro)
    const [nuevolatitud, setnuevolatitud] = useState('')
    const [nuevolongitud, setnuevolongitud] = useState('')
    const [nuevoespecialidades, setnuevoespecialidades] = useState('')
    const [nuevolistaeps, setnuevolistaeps] = useState('')
    const [especialidadesDisponibles, setEspecialidadesDisponibles] = useState([]);
    const [epsDisponibles, setEpsDisponibles] = useState([]);
    const [especialidadesDB, setespecialidadesDB] = useState([])
    const [listaepsDB, setlistaepsDB] = useState([])
    const [especialidades, setespecialidades] = useState([])
    const [listaeps, setlistaeps] = useState([])


    const cargarDatosHospital = (hospital) => {
        setnuevonombre(hospital.nombre);
        setnuevolatitud(hospital.latitud);
        setnuevolongitud(hospital.longitud);
        setnuevoespecialidades(hospital.especialidades.join(', '));
        setnuevolistaeps(hospital.listaeps.join(', '));
    };


    //Funciones para transformar los arreglos a datos que entienda la DB
    const handleEspecialidadesChange = (selectedOptions) => {
        setespecialidades(selectedOptions);
        const especialidadesNombres = selectedOptions.map(option => option.label);
        setespecialidadesDB(especialidadesNombres);
        console.log("Especialidades A Agregar: ", especialidadesDB)
    };

    const handleEpsChange = (selectedOptions) => {
        setlistaeps(selectedOptions);
        const epsNombres = selectedOptions.map(option => option.label);
        setlistaepsDB(epsNombres);
        console.log("EPS A Agregar: ", listaepsDB)
    };


    //Funcion para eliminar un hospital de la base de datos
    const eliminarHospital = async (id) => {
        console.log(id)
        if (window.confirm("¿Desea eliminar este Hospital?")) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hospitales/eliminar/`, {
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


    //Funcion para eliminar un hospital de la base de datos
    const modificarHospital = async (id) => {
        console.log(id)
        console.log(nuevonombre)
        if (window.confirm("¿Deseas modificar este hospital?")) {
            //-------Mirar la verificacion de los campos si es necesaria
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hospitales/modificar/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    nombre: nuevonombre,
                    latitud: nuevolatitud, longitud: nuevolongitud,
                    especialidades: especialidadesDB, listaeps: listaepsDB,
                }),
            });

            const data = await res.json();

            if (res.status === 200) {
                window.alert(data.mensaje)
                setnuevonombre(data.nombre);
                setlistaepsDB('');
                setespecialidadesDB('');
                handleCloseModal();

            } else {
                window.alert(data.mensaje);
            }

        }
        router.refresh();
        setEdit(false);
    };

    const handleOpenModal = (row) => {
        setSelectedRow(row);
        cargarDatosHospital(row); // Cargar los datos del hospital seleccionado
        setEdit(true); // Cambiar a modo de edición
        setespecialidadesDB(row.especialidades);
        setlistaepsDB(row.listaeps);
        console.log("Especialidades antes de editar: ", especialidadesDB)
        console.log("EPS antes de editar: ", listaepsDB)
        const modal = new Modal(document.getElementById('modal'), {});
        modal.show();
    };

    const handleCloseModal = () => {
        setSelectedRow(null);
        const modal = Modal.getInstance(document.getElementById('modal'));
        setespecialidades([]);
        setlistaeps([]);
        modal.hide();
    };

    useEffect(() => {
        const fetchEspecialidades = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/especialidades/`);
                const data = await res.json();
                setEspecialidadesDisponibles(data);
                console.log(data);
            } catch (error) {
                console.error("Error al obtener las especialidades:", error);
            }
        };

        const fetchEps = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/eps/`);
                const data = await res.json();
                setEpsDisponibles(data);
                console.log(data);
            } catch (error) {
                console.error("Error al obtener las EPS:", error);
            }
        };

        fetchEspecialidades();
        fetchEps();
    }, []);

    return (
        <div className="rounded-md justify-between">
            {/* DataTable con las columnas y los datos */}
            <center>
                <DataTable
                    className=' rounded-2xl border border-gray-800'
                    columns={[
                        ...columnas, // Agregar las columnas definidas anteriormente
                        { // Columna personalizada para el botón "Modificar"
                            cell: (row) => <button className="font-semibold text-white rounded-md p-2 m-2" onClick={() => handleOpenModal(row)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Modificar</button>,
                            allowOverflow: true,
                            button: true,
                            width: "100px"
                        },
                        { // Columna personalizada para el botón "Eliminar"
                            cell: (row) => <button className="font-semibold text-white rounded-md p-2 m-2 bg-red-600" onClick={() => eliminarHospital(row.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Eliminar</button>,
                            allowOverflow: true,
                            button: true,
                            width: "100px"
                        }
                    ]}
                    data={hospitales}
                    pagination
                    paginationPerPage={6}
                    paginationRowsPerPageOptions={[6, 12, 18, 24, 30, 36]}
                    highlightOnHover
                    noDataComponent={<h2 className=' text-4xl text-red-600'>No hay Hospitales Para Mostrar</h2>}
                    paginationComponentOptions={opcionesPagina}
                    responsive
                />
            </center>

            {/* Modal para mostrar la modificacion del hospital seleccionado */}

            <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modificar Hospital</h5>
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
                                    <h3>Latitud:</h3>
                                    <input
                                        type="text"
                                        name="latitud"
                                        placeholder={selectedRow.latitud}
                                        value={nuevolatitud}
                                        onChange={e => setnuevolatitud(e.target.value)}
                                    />
                                    <h3>Longitud:</h3>
                                    <input
                                        type="text"
                                        name="longitud"
                                        placeholder={selectedRow.longitud}
                                        value={nuevolongitud}
                                        onChange={e => setnuevolongitud(e.target.value)}
                                    />
                                    <label className="font-bold" htmlFor="especialidades">Especialidades</label>
                                    <MultiSelectCheckboxDropdown
                                        options={especialidadesDisponibles.map(especialidad => ({
                                            value: especialidad.id,
                                            label: especialidad.nombre
                                        }))}
                                        selectedOptions={especialidades}
                                        onChange={handleEspecialidadesChange}
                                    />
                                    <label className="font-bold" htmlFor="listaEps">EPS</label>
                                    <MultiSelectCheckboxDropdown
                                        options={epsDisponibles.map(ep => ({
                                            value: ep.id,
                                            label: ep.nombre
                                        }))}
                                        selectedOptions={listaeps}
                                        onChange={handleEpsChange}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="modal-footer" >
                            <button className="bg-green-500 text-white rounded-md p-2" onClick={() => modificarHospital(selectedRow.id)}>Guardar Cambios</button>
                            <button className="bg-red-600 text-white rounded-md p-2" onClick={handleCloseModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HospitalCard