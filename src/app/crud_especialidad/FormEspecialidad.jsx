"use client"

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal } from 'bootstrap'; // Importa solo el componente Modal de Bootstrap

function FormEspecialidad() {

    const router = useRouter()

    const [nombre, setnombre] = useState('')

    const agregarEspecialidad = async (e) => {

        if (nombre.trim() === "") {
            alert("Por favor complete todos los campos obligatorios *")
            return;
        } else {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/especialidades/agregar/`, {
                method: "POST",
                body: JSON.stringify({
                    nombre: nombre
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

                handleCloseModal();
                router.refresh();
            } else {
                window.alert(data.mensaje);
            }
            console.log(res)
        };
    }

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
                <h2 className=" text-center ml-4 text-5xl">Lista de Especialidades</h2>
                <button className="font-semibold text-white rounded-md p-2 m-2 mr-4" onClick={() => handleOpenModal()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Agregar Una Especialidad</button>
            </div>
            <br />
            <div className="modal fade" id="modalAgregar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content align-middle justify-center">
                        <div className="modal-header">
                            <h5 className="modal-title text-2xl font-bold align-middle justify-center" id="exampleModalLabel">Agregar Una Especialidad</h5>
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
                                                    value={nombre}
                                                    onChange={e => setnombre(e.target.value)}
                                                />
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer" >
                            <button className="bg-green-500 text-white rounded-md p-2" onClick={() => agregarEspecialidad()}>Agregar Especialidad</button>
                            <button className="bg-red-600 text-white rounded-md p-2" onClick={handleCloseModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormEspecialidad