"use client";

import Head from "next/head";
import AdsDisplay from "../../components/AdsDisplay";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kiosko de Anuncios</title>
        <meta name="description" content="Visualiza anuncios activos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Main content: Ads section */}

      <main className="flex items-center justify-around bg-black min-h-screen w-full h-screen">
        <AdsDisplay />
      </main>
    </>
  );
}
