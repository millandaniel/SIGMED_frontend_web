"use client"

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal } from 'bootstrap'; // Importa solo el componente Modal de Bootstrap

function FormUsuario() {

    const router = useRouter()
    const [rol, setRol] = useState('administrador');
    const [edit, setEdit] = useState(false);

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
    const [nombresHospitales, setehospitalesNombres] = useState([])
    const [hospitalSeleccionado, setHospitalSeleccionado] = useState('');

    const agregarUsuario = async (e) => {

        if (!nuevotipo_identificacion.trim() || !nuevoidentificacion.trim() ||
            !nuevonombre.trim() || !nuevoapellido.trim() || !nuevocorreo.trim() ||
            !nuevotelefono.trim() || !nuevonombre_usuario.trim() || !nuevoclave.trim()) {
            alert('Por favor, ingresa TODOS los campos para agregar a un usuario.');
            return;
        }
        if (rol.toLowerCase() === "administrador") {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuarios/agregar/`, {
                method: "POST",
                body: JSON.stringify({
                    tipo_identificacion: nuevotipo_identificacion,
                    identificacion: nuevoidentificacion,
                    nombre: nuevonombre,
                    apellido: nuevoapellido,
                    correo: nuevocorreo,
                    telefono: nuevotelefono,
                    nombre_usuario: nuevonombre_usuario,
                    clave: nuevoclave,
                    tipo_usuario: rol
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const data = await res.json();

            if (res.status === 200) {
                window.alert(data.mensaje)
                // Limpiar todos los campos
                setnuevotipo_identificacion('');
                setnuevoidentificacion('');
                setnuevonombre('');
                setnuevoapellido('');
                setnuevocorreo('');
                setnuevotelefono('');
                setnuevonombre_usuario('');
                setnuevoclave('');
                setnuevotipo_usuario('');
                setnuevofecha_nacimiento('');
                setnuevotipo_sangre('');
                setnuevonombre_eps('');
                setnuevonombre_hospital('');
                setHospitalSeleccionado('');
                handleCloseModal();
                router.refresh();


            } else {
                window.alert(data.mensaje);
            }
            console.log(res)
        } else {
            console.log("Identificacion: ", nuevoidentificacion, "Nombre Moderador: ", nuevonombre, "Hospital Asociado: ", hospitalSeleccionado);
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuarios/agregar/`, {
                method: "POST",
                body: JSON.stringify({
                    tipo_identificacion: nuevotipo_identificacion,
                    identificacion: nuevoidentificacion,
                    nombre: nuevonombre,
                    apellido: nuevoapellido,
                    correo: nuevocorreo,
                    telefono: nuevotelefono,
                    nombre_usuario: nuevonombre_usuario,
                    clave: nuevoclave,
                    tipo_usuario: rol,
                    nombre_hospital: hospitalSeleccionado
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const data = await res.json();

            if (res.status === 200) {
                window.alert(data.mensaje)
                // Limpiar todos los campos
                setnuevotipo_identificacion('');
                setnuevoidentificacion('');
                setnuevonombre('');
                setnuevoapellido('');
                setnuevocorreo('');
                setnuevotelefono('');
                setnuevonombre_usuario('');
                setnuevoclave('');
                setnuevotipo_usuario('');
                setnuevofecha_nacimiento('');
                setnuevotipo_sangre('');
                setnuevonombre_eps('');
                setnuevonombre_hospital('');
                setHospitalSeleccionado('');
                router.refresh();
                handleCloseModal();
            } else {
                window.alert(data.mensaje);
            }
            console.log(res)
        }

    }

    const handleHospitalSeleccionado = (e) => {
        setHospitalSeleccionado(e.target.value);
    };

    useEffect(() => {
        const fetchHospitales = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hospitales/`);
                const hospitales = await res.json();

                const listaHospitales = hospitales.map(hospital => hospital.nombre);
                setehospitalesNombres(listaHospitales);
            } catch (error) {
                console.error("Error al obtener los Hospitales:", error);
            }
        };
        fetchHospitales();
    }, []);

    const handleOpenModal = () => {
        const modal = new Modal(document.getElementById('modalAgregar'), {});
        modal.show();
    };

    const handleCloseModal = () => {
        const modal = Modal.getInstance(document.getElementById('modalAgregar'));
        modal.hide();
    };

    return (
        <div>
            <div className=" bg-gray-50 flex justify-between items-center">
                <h2 className=" text-center ml-4 text-5xl">Lista de Usuarios</h2>
                <button className="font-semibold text-white rounded-md p-2 m-2 mr-4" onClick={() => handleOpenModal()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Agregar Un Usuario</button>
            </div>
            <br />
            <div className="modal fade" id="modalAgregar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content align-middle justify-center">
                        <div className="modal-header">
                            <h5 className="modal-title text-2xl font-bold align-middle justify-center" id="exampleModalLabel">Agregar Un Usuario</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body">
                            {(
                                <div className="flex w-full ">
                                    {!edit ? (
                                        <div
                                            className=" p-7 flex w-full "
                                        >
                                            <form onSubmit={agregarUsuario}>
                                                <center>
                                                    <h2>Agregar Administrador</h2>
                                                </center>
                                                <label className=" font-bold" htmlFor="title">
                                                    Ingrese el tipo de usuario
                                                </label>
                                                <br />
                                                <select
                                                    className=" m-3 bg-gray-50"
                                                    name="rol"
                                                    value={rol}
                                                    onChange={e => {

                                                        setRol(e.target.value);
                                                        setEdit(e.target.value === 'moderador');
                                                    }}
                                                >
                                                    <option value="administrador">Administrador</option>
                                                    <option value="moderador">Moderador</option>
                                                </select>
                                                <br />
                                                <label className=" font-bold" htmlFor="title">
                                                    Tipo Identificacion
                                                </label>
                                                <select
                                                    className="block m-3 bg-gray-50"
                                                    name="tipo_identificacion"
                                                    value={nuevotipo_identificacion}
                                                    onChange={e => setnuevotipo_identificacion(e.target.value)}
                                                    defaultValue=""
                                                >
                                                    <option value="">Seleccione una opción</option> {/* Opción vacía */}
                                                    <option value="CC">CC</option>
                                                    {/* <option value="TI">TI</option> */}
                                                    <option value="RC">RC</option>
                                                    <option value="CE">CE</option>
                                                    <option value="CI">CI</option>
                                                    <option value="DNI">DNI</option>
                                                </select>
                                                <label className=" font-bold" htmlFor="title">
                                                    Identificacion
                                                </label>
                                                <input
                                                    className=" block"
                                                    type="number"
                                                    name="identificacion"
                                                    value={nuevoidentificacion}
                                                    onChange={e => setnuevoidentificacion(e.target.value)}
                                                />
                                                <label className=" font-bold" htmlFor="title">
                                                    Nombre
                                                </label>
                                                <input
                                                    className=" block"
                                                    type="text"
                                                    name="nombre"
                                                    value={nuevonombre}
                                                    onChange={e => setnuevonombre(e.target.value)}
                                                />
                                                <label className=" font-bold" htmlFor="title">
                                                    Apellidos
                                                </label>
                                                <input
                                                    className=" block"
                                                    type="text"
                                                    name="apellidos"
                                                    value={nuevoapellido}
                                                    onChange={e => setnuevoapellido(e.target.value)}
                                                />
                                                <label className=" font-bold" htmlFor="title">
                                                    Correo
                                                </label>
                                                <input
                                                    className=" block"
                                                    type="email"
                                                    name="correo"
                                                    value={nuevocorreo}
                                                    onChange={e => setnuevocorreo(e.target.value)}
                                                />
                                                <label className=" font-bold" htmlFor="title">
                                                    Telefono
                                                </label>
                                                <input
                                                    className=" block"
                                                    type="number"
                                                    name="telefono"
                                                    value={nuevotelefono}
                                                    onChange={e => setnuevotelefono(e.target.value)}
                                                />
                                                <label className=" font-bold" htmlFor="title">
                                                    Usuario
                                                </label>
                                                <input
                                                    className=" block"
                                                    type="text"
                                                    name="usuario"
                                                    value={nuevonombre_usuario}
                                                    onChange={e => setnuevonombre_usuario(e.target.value)}
                                                />
                                                <label className=" font-bold" htmlFor="title">
                                                    Clave
                                                </label>
                                                <input
                                                    className=" block"
                                                    type="password"
                                                    name="clave"
                                                    value={nuevoclave}
                                                    onChange={e => setnuevoclave(e.target.value)}
                                                />

                                                {/* <button
                                                    className=" font-semibold text-white rounded-md p-2 block w-full"
                                                >
                                                    Agregar Administrador
                                                </button> */}

                                            </form>
                                        </div>
                                    ) : (
                                        <div
                                            className=" p-7 flex w-full "
                                        >

                                            <form onSubmit={agregarUsuario}>
                                                <center>
                                                    <h2>Agregar Moderador</h2>
                                                </center>
                                                <label className=" font-bold" htmlFor="title">
                                                    Ingrese el tipo de usuario
                                                </label>
                                                <br />
                                                <select
                                                    className=" m-4 bg-gray-50"
                                                    name="rol"
                                                    value={rol}
                                                    onChange={e => {
                                                        setRol(e.target.value);
                                                        setEdit(e.target.value === 'moderador');
                                                    }}
                                                >
                                                    <option value="administrador">Administrador</option>
                                                    <option value="moderador">Moderador</option>
                                                </select>
                                                <br />
                                                <label className=" font-bold" htmlFor="title">
                                                    Tipo Identificacion
                                                </label>
                                                <select
                                                    className="block m-3 bg-gray-50"
                                                    name="tipo_identificacion"
                                                    value={nuevotipo_identificacion}
                                                    onChange={e => setnuevotipo_identificacion(e.target.value)}
                                                    defaultValue=""
                                                >
                                                    <option value="">Seleccione una opción</option> {/* Opción vacía */}
                                                    <option value="CC">CC</option>
                                                    {/* <option value="TI">TI</option> */}
                                                    <option value="RC">RC</option>
                                                    <option value="CE">CE</option>
                                                    <option value="CI">CI</option>
                                                    <option value="DNI">DNI</option>
                                                </select>
                                                <label className=" font-bold" htmlFor="title">
                                                    Identificacion
                                                </label>
                                                <input
                                                    className=" block"
                                                    type="number"
                                                    name="identificacion"
                                                    value={nuevoidentificacion}
                                                    onChange={e => setnuevoidentificacion(e.target.value)}
                                                />
                                                <label className=" font-bold" htmlFor="title">
                                                    Nombre
                                                </label>
                                                <input
                                                    className=" block"
                                                    type="text"
                                                    name="nombre"
                                                    value={nuevonombre}
                                                    onChange={e => setnuevonombre(e.target.value)}
                                                />
                                                <label className=" font-bold" htmlFor="title">
                                                    Apellidos
                                                </label>
                                                <input
                                                    className=" block"
                                                    type="text"
                                                    name="apellidos"
                                                    value={nuevoapellido}
                                                    onChange={e => setnuevoapellido(e.target.value)}
                                                />
                                                <label className=" font-bold" htmlFor="title">
                                                    Correo
                                                </label>
                                                <input
                                                    className=" block"
                                                    type="email"
                                                    name="correo"
                                                    value={nuevocorreo}
                                                    onChange={e => setnuevocorreo(e.target.value)}
                                                />
                                                <label className=" font-bold" htmlFor="title">
                                                    Telefono
                                                </label>
                                                <input
                                                    className=" block"
                                                    type="number"
                                                    name="telefono"
                                                    value={nuevotelefono}
                                                    onChange={e => setnuevotelefono(e.target.value)}
                                                />
                                                <label className=" font-bold" htmlFor="title">
                                                    Usuario
                                                </label>
                                                <input
                                                    className=" block"
                                                    type="text"
                                                    name="usuario"
                                                    value={nuevonombre_usuario}
                                                    onChange={e => setnuevonombre_usuario(e.target.value)}
                                                />
                                                <label className=" font-bold" htmlFor="title">
                                                    Clave
                                                </label>
                                                <input
                                                    className=" block"
                                                    type="password"
                                                    name="clave"
                                                    value={nuevoclave}
                                                    onChange={e => setnuevoclave(e.target.value)}
                                                />
                                                <div>
                                                    <label className="font-bold" htmlFor="selectHospital">Hospital Asociado al Moderador</label>
                                                    <select id="selectHospital" value={hospitalSeleccionado} onChange={handleHospitalSeleccionado}>
                                                        <option value="">Selecciona un hospital</option>
                                                        {nombresHospitales.map((nombreHospital, index) => (
                                                            <option key={index} value={nombreHospital}>{nombreHospital}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {/* <button
                                                    className=" font-semibold text-white rounded-md p-2 block w-full"
                                                >
                                                    Agregar Moderador
                                                </button> */}

                                            </form>
                                        </div>
                                    )}

                                </div>
                            )}
                        </div>
                        <div className="modal-footer" >
                            <button className="bg-green-500 text-white rounded-md p-2" onClick={() => agregarUsuario()}>Agregar Usuario</button>
                            <button className="bg-red-600 text-white rounded-md p-2" onClick={handleCloseModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormUsuario