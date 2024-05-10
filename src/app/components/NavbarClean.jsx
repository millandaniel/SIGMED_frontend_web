import Link from 'next/link';
import styles from './Navbar.module.css'; // Estilos CSS para la barra de navegación
import Image from 'next/image';

const BarraNavegacion = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logoSigmed}>
                <Link href="/">
                    <Image className={styles.logoSigmed}
                        src={"/LogoSigmed05.png"}
                        alt={"logo"}
                        width={500}
                        height={125}>
                    </Image>
                </Link>
            </div>
        </nav>
    );
};

export default BarraNavegacion;