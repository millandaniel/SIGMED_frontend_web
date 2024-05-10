"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import { useUser } from './UserContext';
import Image from 'next/image';

function FormAutenticacion() {

    const router = useRouter();

    const [rol, setRol] = useState('');
    const [usuario, setusuario] = useState('')
    const [password, setpassword] = useState('')
    const [tipo_usuario, settipo_usuario] = useState('')
    const [id_hospital, setid_hospital] = useState('')


    const iniciarSesion = async (e) => {
        e.preventDefault();
        console.log(usuario, password);
        if (!usuario.trim() || password === "") {
            alert('Por favor, completa todos los campos');
            return;
        } else {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuarios/login/`, {
                method: "POST",
                body: JSON.stringify({
                    acceso: usuario, clave: password
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const data = await res.json();
            console.log(data);

            if (res.status === 200) {
                window.alert(data.mensaje)
                localStorage.setItem('user', JSON.stringify(data)); // Almacenar el usuario en el LocalStorage
                if (data.tipo_usuario.toLowerCase() === "moderador") {
                    console.log(data.nombre_hospital)
                    router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/crud_solicitudes/`);
                } else if (data.tipo_usuario.toLowerCase() === "administrador") {
                    router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/full_solicitudes/`);
                }
            } else {
                window.alert(data.mensaje);
            }
            console.log(res)
        }

    }

    const obtenerUsuarioLocalStorage = () => {
        const usuario = localStorage.getItem('user');
        return usuario ? JSON.parse(usuario) : null;
    }

    return (
        <div className=" px-4 py-3 mb-2 rounded-md flex justify-between">
            <div
                className=" p-7 text-center gap-x-10 "
            >

                <center>
                    <Image className=" w-52 h-52 bg-center"
                        src={"/LogoInicioSesion.png"}
                        alt={"logomano"}
                        width={500}
                        height={500}
                    />
                </center>
                <form onSubmit={iniciarSesion} >
                    <center>
                        <h2 className=" text-7xl">Bienvenido a Sigmed</h2>
                    </center>
                    <label className=" font-bold text-xs" htmlFor="title">
                        Ingresa su nombre de usuario o correo electronico
                    </label>
                    <input
                        className=" block text-center"
                        type="text"
                        name="usuario"
                        onChange={e => setusuario(e.target.value)}
                    />
                    <label className=" font-bold text-xs" htmlFor="title">
                        Ingresa su contraseña
                    </label>
                    <input
                        className=" block text-center"
                        type="password"
                        name="password"
                        onChange={e => setpassword(e.target.value)}
                    />
                    <button
                        className=" font-semibold text-white rounded-md p-2 block w-full"
                    >
                        Ingresar
                    </button>

                </form>
            </div>

        </div>
    )
}

export default FormAutenticacion