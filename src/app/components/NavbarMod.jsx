"use client"

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Navbar.module.css'; // Estilos CSS para la barra de navegación
import Image from 'next/image';


const BarraNavegacion = () => {

    const router = useRouter();

    const cerrarSesion = () => {
        localStorage.removeItem('user'); // Eliminar el usuario del LocalStorage
        router.push('/'); // Redirigir al usuario a la página de inicio o a la página de autenticación
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoSigmed}>
                <Link href="/crud_solicitudes">
                    <Image className={styles.logoSigmed}
                        src={"/LogoSigmed05.png"}
                        alt={"logo"}
                        width={500}
                        height={125}>
                    </Image>
                </Link>
            </div>
            <div className={styles.contenedorLinks} >
                <button
                    className={styles.linksNav}
                    onClick={cerrarSesion}>
                    Cerrar Sesión</button>
            </div>
        </nav>
    );
};

export default BarraNavegacion;
