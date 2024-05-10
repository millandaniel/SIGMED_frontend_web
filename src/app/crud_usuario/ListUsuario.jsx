import UsuarioCard from "./UsuarioCard"

async function cargarUsuarios() {
    const res = await fetch(`${process.env.BACKEND_URL}/usuarios/`)
    const usuarios = await res.json()
    return usuarios
}

async function ListUsuario() {

    const usuarios = await cargarUsuarios()
    console.log(usuarios)

    return (
        <center>
            <div className=" bg-gray-200 p-4 rounded-md inline-block">
                <UsuarioCard usuarios={usuarios} />
            </div>
        </center>
    )
}

export default ListUsuario