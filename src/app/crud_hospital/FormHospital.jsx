"use client"

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal } from 'bootstrap'; // Importa solo el componente Modal de Bootstrap
import MultiSelectCheckboxDropdown from "../components/MultiSelectCheckboxDropdown";

// eslint-disable-next-line @next/next/no-async-client-component
function FormHospital() {

    const router = useRouter()

    const [nombre, setnombre] = useState('')
    const [latitud, setlatitud] = useState('')
    const [longitud, setlongitud] = useState('')
    const [especialidades, setespecialidades] = useState([])
    const [listaeps, setlistaeps] = useState([])
    const [especialidadesDisponibles, setEspecialidadesDisponibles] = useState([]);
    const [epsDisponibles, setEpsDisponibles] = useState([]);
    const [especialidadesDB, setespecialidadesDB] = useState([])
    const [listaepsDB, setlistaepsDB] = useState([])

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

    const agregarHospital = async (e) => {
        //e.preventDefault();
        if (nombre === "" || latitud === "" || longitud === "") {
            alert("Por favor complete todos los campos obligatorios *")
            return;
        } else {
            console.log(nombre, latitud,
                longitud, especialidadesDB, listaepsDB);
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hospitales/agregar/`, {
                method: "POST",
                body: JSON.stringify({
                    nombre: nombre, latitud: latitud, longitud: longitud,
                    especialidades: especialidadesDB, listaeps: listaepsDB
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await res.json()

            if (res.status === 200) {
                window.alert(data.mensaje);
                // Restablecer los inputs
                setnombre('');
                setlatitud('');
                setlongitud('');
                // Restablecer los estados de especialidades y EPS seleccionadas
                setespecialidades([]);
                setlistaeps([]);
                handleCloseModal();
                router.refresh();
            } else {
                window.alert(data.mensaje);
            }
            console.log(res)
        };
    }

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
                <h2 className=" text-center ml-4 text-5xl">Lista de Hospitales</h2>
                <button className="font-semibold text-white rounded-md p-2 m-2 mr-4" onClick={() => handleOpenModal()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Agregar Un Hospital</button>
            </div>
            <br />
            <div className="modal fade" id="modalAgregar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content align-middle justify-center">
                        <div className="modal-header">
                            <h5 className="modal-title text-2xl font-bold align-middle justify-center" id="exampleModalLabel">Agregar Un Hospital</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                        </div>
                        <div className="modal-body">
                            {(
                                <div className="bg-gray-100 p-4 rounded-md">
                                    <div>
                                        <div
                                            className=" p-7 flex w-full "
                                        >
                                            <form >
                                                <label className=" font-bold" htmlFor="title">
                                                    Nombre*
                                                </label>
                                                <input
                                                    className=" block"
                                                    type="text"
                                                    name="nombre"
                                                    onChange={e => setnombre(e.target.value)}
                                                />

                                                {/* <label className=" font-bold" htmlFor="title">
                        Codigo*
                    </label>
                    <input
                        className=" block"
                        type="text"
                        name="codigo"
                        onChange={e => setcodigo_registro(e.target.value)}
                    /> */}

                                                <label className=" font-bold" htmlFor="title">
                                                    Latitud*
                                                </label>
                                                <input
                                                    className=" block"
                                                    type="text"
                                                    name="latitud"
                                                    onChange={e => setlatitud(e.target.value)}
                                                />

                                                <label className=" font-bold" htmlFor="title">
                                                    Longitud*
                                                </label>
                                                <input
                                                    className=" block"
                                                    type="text"
                                                    name="longitud"
                                                    onChange={e => setlongitud(e.target.value)}
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
                                                {/* <button
                        className=" font-semibold text-white rounded-md p-2 block w-full"
                    >
                        Agregar
                    </button> */}

                                            </form>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer" >
                            <button className="bg-green-500 text-white rounded-md p-2" onClick={() => agregarHospital()}>Agregar Hospital</button>
                            <button className="bg-red-600 text-white rounded-md p-2" onClick={handleCloseModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormHospital