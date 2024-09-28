import React, { useEffect, useState } from "react";
import axios from "axios";

interface Ad {
  id: number;
  title: string;
  file: string;
  ad_type: "image" | "video";
  duration: number;
}

const AdsDisplay: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentAdIndex, setCurrentAdIndex] = useState<number>(0);
  const [apiUrl, setApiUrl] = useState<string | undefined>(undefined);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // Set API URL from environment variables
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    setApiUrl(url);
    if (!url) {
      setError(`La URL del API no está definida o es inválida. URL: "${url}"`);
      setLoading(false);
    }
  }, []);

  // Fetch ads from API
  const fetchAds = async () => {
    if (!apiUrl) return;
    setIsFetching(true);
    try {
      const response = await axios.get<Ad[]>(apiUrl);
      console.log("Anuncios recibidos de la API:", response.data); // Log del array de anuncios completo

      if (JSON.stringify(ads) !== JSON.stringify(response.data)) {
        const prevIndex = currentAdIndex;
        const newAds = response.data;

        // Mantener el índice si es válido para los nuevos anuncios
        if (prevIndex < newAds.length) {
          setAds(newAds);
        } else {
          // Si el índice actual está fuera de rango (cuando se eliminan anuncios)
          setAds(newAds);
          setCurrentAdIndex(0); // Solo reiniciar si los nuevos anuncios no cubren el índice actual
        }
      }
    } catch (err) {
      setError(`Error al cargar los anuncios desde la API: ${apiUrl}`);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  // Fetch ads periodically
  useEffect(() => {
    if (apiUrl) {
      fetchAds();
      const intervalId = setInterval(fetchAds, 45000); // Fetch every 45 seconds
      return () => clearInterval(intervalId);
    }
  }, [apiUrl]);

  // Handle ad transitions
  useEffect(() => {
    if (ads.length === 0) return;

    console.log("Mostrando anuncio con ID:", ads[currentAdIndex]?.id); // Log del ID del anuncio actual
    console.log("Duración del anuncio:", ads[currentAdIndex]?.duration); // Log de la duración del anuncio actual
    console.log("Índice actual:", currentAdIndex); // Log del índice del anuncio actual

    setTimeRemaining(ads[currentAdIndex]?.duration || 5); // Set time remaining based on ad duration

    const adChangeInterval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % ads.length;
        console.log("Cambiando a siguiente anuncio, nuevo índice:", newIndex); // Log de cuando se cambia de anuncio
        return newIndex;
      });
    }, ads[currentAdIndex]?.duration * 1000); // Change ad based on duration

    const countdownInterval = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(adChangeInterval);
      clearInterval(countdownInterval);
    };
  }, [ads, currentAdIndex]);

  if (loading) return <p>Cargando anuncios...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      {ads.length === 0 ? (
        <p>No hay anuncios activos. URL del API: {apiUrl}</p>
      ) : (
        <div className="w-full h-full relative pt-0 sm:pt-12 flex flex-col items-center justify-center bg-white shadow-lg rounded-lg overflow-hidden">
          {ads[currentAdIndex].ad_type === "video" ? (
            <video
              key={ads[currentAdIndex].id} // Unique key to force re-render
              className="w-[1024px] h-[800px] sm:w-[400px] sm:h-[300px] object-cover rounded-e-full"
              autoPlay
              muted
              loop={false} // No loop, as we want to control the timing
              playsInline
            >
              <source src={ads[currentAdIndex].file} type="video/mp4" />
              Tu navegador no soporta video.
            </video>
          ) : (
            <img
              className="w-[1024px] h-[600px] sm:w-[400px] sm:h-[300px] object-cover rounded-full"
              src={ads[currentAdIndex].file}
              alt={ads[currentAdIndex].title}
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-45 text-slate-950 p-3">
            <p className="text-sm font-medium">{ads[currentAdIndex].title}</p>
            <p className="text-xs">
              id: {ads[currentAdIndex].id} - Próximo anuncio en: {timeRemaining}{" "}
              segundos
            </p>
          </div>
        </div>
      )}
      <style jsx>{`
        @media (max-width: 640px) {
          .ad-content {
            max-height: 400px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdsDisplay;
