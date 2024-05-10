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
    {
        name: "T. Identificacion",
        selector: row => row.tipo_identificacion,
        center: true,
        cell: row => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{row.tipo_identificacion}</div>
    },
    {
        name: "Identificacion",
        selector: row => row.identificacion,
        sortable: true,
        center: true,
        cell: row => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{row.identificacion}</div>
    },
    {
        name: "Nombres",
        selector: row => row.nombre,
        sortable: true,
        center: true,
        cell: row => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{row.nombre}</div>
    },
    {
        name: "Apellidos",
        selector: row => row.apellido,
        sortable: true,
        center: true,
        cell: row => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{row.apellido}</div>
    },
    {
        name: "Correo",
        selector: row => row.correo,
        sortable: true,
        center: true,
        cell: row => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{row.correo}</div>
    },
    {
        name: "Telefono",
        selector: row => row.telefono,
        sortable: true,
        center: true,
        cell: row => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{row.telefono}</div>
    },
    {
        name: "Nombre De Usuario",
        selector: row => row.nombre_usuario,
        sortable: true,
        center: true,
        cell: row => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{row.nombre_usuario}</div>
    },
    {
        name: "Tipo de Usuario",
        selector: row => row.tipo_usuario,
        sortable: true,
        center: true,
        cell: row => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{row.tipo_usuario}</div>
    }

];

function UsuarioCard({ usuarios }) {

    const router = useRouter();
    const [edit, setEdit] = useState(false)

    const [selectedRow, setSelectedRow] = useState(null);

    //Constantes utilizadas para la modificacion de los datos
    const [nuevotipo_identificacion, setnuevotipo_identificacion] = useState('')
    const [nuevoidentificacion, setnuevoidentificacion] = useState('')
    const [nuevonombre, setnuevonombre] = useState('')
    const [nuevoapellido, setnuevoapellido] = useState('')
    const [nuevocorreo, setnuevocorreo] = useState('')
    const [nuevotelefono, setnuevotelefono] = useState('')
    const [nuevonombre_usuario, setnuevonombre_usuario] = useState('')
    const [nuevoclave, setnuevoclave] = useState('')
    const [nuevotipo_usuario, setnuevotipo_usuario] = useState('')
    const [nuevofecha_nacimiento, setnuevofecha_nacimiento] = useState('')
    const [nuevotipo_sangre, setnuevotipo_sangre] = useState('')
    const [nuevonombre_eps, setnuevonombre_eps] = useState('')
    const [nuevonombre_hospital, setnuevonombre_hospital] = useState('')


    const cargarDatosUsuario = (usuario) => {
        setnuevotipo_identificacion(usuario.tipo_identificacion);
        setnuevoidentificacion(usuario.identificacion);
        setnuevonombre(usuario.nombre);
        setnuevoapellido(usuario.apellido);
        setnuevocorreo(usuario.correo);
        setnuevotelefono(usuario.telefono);
        setnuevonombre_usuario(usuario.nombre_usuario);
        setnuevotipo_usuario(usuario.tipo_usuario);
    };

    //Funcion para eliminar una especialidad de la base de datos
    const eliminarUsuario = async (id) => {
        console.log(id)
        if (window.confirm("¿Desea eliminar este Usuario?")) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuarios/eliminar/`, {
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


    //Funcion para modificar una especialidad de la base de datos
    const modificarUsuario = async (id) => {
        if (nuevotipo_identificacion === "" || nuevoidentificacion === "" ||
            nuevonombre === "" || nuevoapellido === "" || nuevocorreo === "" ||
            nuevotelefono === "" || nuevonombre_usuario === "") {
            alert('Por favor, ingresa TODOS los campos para agregar a un usuario.');
            return;
        }
        if (nuevoclave === "") {
            if (window.confirm("¿Desea modificar a este usuario?")) {
                //-------Mirar la verificacion de los campos si es necesaria
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuarios/modificar/`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: id,
                        tipo_identificacion: nuevotipo_identificacion,
                        identificacion: nuevoidentificacion,
                        nombre: nuevonombre,
                        apellido: nuevoapellido,
                        correo: nuevocorreo,
                        telefono: nuevotelefono,
                        nombre_usuario: nuevonombre_usuario,
                        tipo_usuario: nuevotipo_usuario,
                    }),

                });

                const data = await res.json();

                if (res.status === 200) {
                    window.alert(data.mensaje)

                    setnuevotipo_identificacion("");
                    setnuevoidentificacion("");
                    setnuevonombre("");
                    setnuevoapellido("");
                    setnuevocorreo("");
                    setnuevotelefono("");
                    setnuevonombre_usuario("");
                    setnuevoclave("");
                    setnuevotipo_usuario("");

                    handleCloseModal();

                } else {
                    window.alert(data.mensaje);
                }
            }
        } else {
            if (window.confirm("¿Desea modificar a este usuario?")) {
                //-------Mirar la verificacion de los campos si es necesaria
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuarios/modificar/`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: id,
                        tipo_identificacion: nuevotipo_identificacion,
                        identificacion: nuevoidentificacion,
                        nombre: nuevonombre,
                        apellido: nuevoapellido,
                        correo: nuevocorreo,
                        telefono: nuevotelefono,
                        nombre_usuario: nuevonombre_usuario,
                        clave: nuevoclave,
                        tipo_usuario: nuevotipo_usuario,
                    }),

                });

                const data = await res.json();

                if (res.status === 200) {
                    window.alert(data.mensaje)

                    setnuevotipo_identificacion("");
                    setnuevoidentificacion("");
                    setnuevonombre("");
                    setnuevoapellido("");
                    setnuevocorreo("");
                    setnuevotelefono("");
                    setnuevonombre_usuario("");
                    setnuevoclave("");
                    setnuevotipo_usuario("");

                    handleCloseModal();

                } else {
                    window.alert(data.mensaje);
                }
            }

        }
        router.refresh();
        setEdit(false);
    };

    const handleOpenModal = (row) => {
        setSelectedRow(row);
        cargarDatosUsuario(row); // Cargar los datos dedel usuario seleccionado
        setEdit(true); // Cambiar a modo de edición
        const modal = new Modal(document.getElementById('modal'), {});
        modal.show();
    };

    const handleCloseModal = () => {
        setSelectedRow(null);
        const modal = Modal.getInstance(document.getElementById('modal'));
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
                            cell: (row) => <button className="font-semibold text-white rounded-md p-2 m-2 bg-red-600" onClick={() => eliminarUsuario(row.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Eliminar</button>,
                            allowOverflow: true,
                            button: true,
                            width: "100px"
                        }
                    ]}
                    data={usuarios}
                    pagination
                    paginationPerPage={6}
                    paginationRowsPerPageOptions={[6, 12, 18, 24, 30, 36]}
                    highlightOnHover
                    noDataComponent={<h2 className=' text-4xl text-red-600'>No hay Hospitales Para Mostrar</h2>}
                    paginationComponentOptions={opcionesPagina}
                    responsive
                />
            </center>

            {/* Modal para mostrar la modificacion del usuario seleccionado */}

            <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title block font-semibold text-gray-500" id="exampleModalLabel">Modificar Usuario</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body">
                            {selectedRow && (
                                <div className=" text-start">
                                    <br />
                                    <h3>Tipo Identificacion:</h3>
                                    <input
                                        className="block font-semibold"
                                        type="text"
                                        name="tipoidentificacion"
                                        value={nuevotipo_identificacion}
                                    //onChange={e => setnuevotipo_identificacion(e.target.value)}
                                    />
                                    <h3>Identificacion:</h3>
                                    <input
                                        className="block font-semibold"
                                        type="number"
                                        name="identificacion"
                                        value={nuevoidentificacion}
                                    //onChange={e => setnuevoidentificacion(e.target.value)}
                                    />
                                    <h3>Nombre:</h3>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={nuevonombre}
                                        onChange={e => setnuevonombre(e.target.value)}
                                    />
                                    <h3>Apellido:</h3>
                                    <input
                                        type="text"
                                        name="apellido"
                                        value={nuevoapellido}
                                        onChange={e => setnuevoapellido(e.target.value)}
                                    />
                                    <h3>Correo:</h3>
                                    <input
                                        type="email"
                                        name="correo"
                                        value={nuevocorreo}
                                        onChange={e => setnuevocorreo(e.target.value)}
                                    />
                                    <h3>Telefono:</h3>
                                    <input
                                        type="number"
                                        name="telefono"
                                        value={nuevotelefono}
                                        onChange={e => setnuevotelefono(e.target.value)}
                                    />
                                    <h3>Nombre Usuario:</h3>
                                    <input
                                        type="text"
                                        name="nombre_usuario"
                                        value={nuevonombre_usuario}
                                        onChange={e => setnuevonombre_usuario(e.target.value)}
                                    />
                                    <h3>Clave:</h3>
                                    <input
                                        type="password"
                                        name="clave"
                                        placeholder={nuevoclave}
                                        onChange={e => setnuevoclave(e.target.value)}
                                    />
                                    <h3>Tipo De Usuario:</h3>
                                    <input
                                        className="block font-semibold"
                                        type="text"
                                        name="tipo_usuario"
                                        placeholder={nuevotipo_usuario}
                                    //onChange={e => setnuevonombre_usuario(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="modal-footer" >
                            <button className="bg-green-500 text-white rounded-md p-2" onClick={() => modificarUsuario(selectedRow.id)}>Guardar Cambios</button>
                            <button className="bg-red-600 text-white rounded-md p-2" onClick={handleCloseModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsuarioCard