"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Comprobar si el usuario está autenticado al acceder a una nueva ruta
        const user = JSON.parse(localStorage.getItem('user'));
        //console.log("Usuario Activo: ", user.nombre_hospital)

        // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
        if (!user) {
            //alert("Debe iniciar sesion para acceder a esta pagina")
            router.push('/');
            setIsLoading(false); // Cambia el estado de carga a false
            return;
        }

        // Verificar si el tipo de usuario tiene permiso para acceder a la ruta
        if (!allowedRoles.includes(user.tipo_usuario.toLowerCase())) {
            alert("Su tipo de usuario no esta autorizado para acceder a esta pagina, por seguridad inicie sesion nuevamente")
            localStorage.removeItem('user'); // Eliminar el usuario del LocalStorage por seguridad
            router.push('/');
            setIsLoading(false); // Cambia el estado de carga a false
            return;
        }
        setIsLoading(false); // Cambia el estado de carga a false una vez terminada la verificación
    }, []);

    if (isLoading) {
        return <div>Cargando...</div>; // Puedes mostrar un spinner o un mensaje de carga mientras se realiza la verificación
    }

    return <>{children}</>;
};

export default ProtectedRoute;