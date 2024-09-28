"use client";
import Image from "next/image";
import Head from "next/head";
import AdsDisplay from "../../components/AdsDisplay";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_80px] items-center justify-items-center min-h-screen p-8 pb-5  pt-10 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-100">
      <Head>
        <title>Kiosko de Anuncios</title>
        <meta name="description" content="Visualiza anuncios activos" />
      </Head>
      <AdsDisplay />

      {/* Footer */}
      <footer className="flex items-left justify-center w-full row-start-3 bg-gray-800 text-white text-sm p-0 rounded-lg shadow-inner">
        <div className="flex flex-col sm:flex-row justify-between w-full max-w-4xl items-center">
          <p className="mb-2 sm:mb-0">
            &copy; {new Date().getFullYear()} Kiosko de Anuncios. Todos los
            derechos reservados. JAC 2024
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">
              CityMall Shop
            </a>
            <a href="#" className="hover:underline">
              Contacto
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
