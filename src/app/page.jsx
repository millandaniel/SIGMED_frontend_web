/* eslint-disable @next/next/no-img-element */
import Navbar from "./components/NavbarLogin"
import Image from "next/image"
import Head from 'next/head';
import styles from './components/Home.module.css';
import Presentacion from "./HomePage";

function HomePage() {


  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <div
        className=" container mx-auto"
      >
        <br />
        <center>
          <Presentacion />
        </center>

      </div>
    </div>
  );
}

export default HomePage