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

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    setApiUrl(url);
    if (!url) {
      setError(`La URL del API no está definida o es inválida. URL: "${url}"`);
      setLoading(false);
    }
  }, []);

  const fetchAds = async () => {
    if (!apiUrl) return;
    setIsFetching(true);
    try {
      const response = await axios.get<Ad[]>(apiUrl);
      if (JSON.stringify(ads) !== JSON.stringify(response.data)) {
        setAds(response.data);
        setCurrentAdIndex(0);
      }
    } catch (err) {
      setError(`Error al cargar los anuncios desde la API: ${apiUrl}`);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (apiUrl) {
      fetchAds();
      const intervalId = setInterval(fetchAds, 45000);
      return () => clearInterval(intervalId);
    }
  }, [apiUrl]);

  useEffect(() => {
    if (ads.length === 0) return;
    setTimeRemaining(ads[currentAdIndex]?.duration || 5);

    const adChangeInterval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, ads[currentAdIndex]?.duration * 1000);

    const countdownInterval = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(adChangeInterval);
      clearInterval(countdownInterval);
    };
  }, [ads, currentAdIndex]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-white text-2xl">
        Cargando anuncios...
      </div>
    );
  }
  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-red-500 text-2xl">
        {error}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center h-screen w-screen">
      {ads.length === 0 ? (
        <div className="flex items-center justify-center text-red text-2xl">
          No hay anuncios activos. URL del API: {apiUrl}
        </div>
      ) : (
        <div className="relative w-full h-full max-w-[100vw] max-h-[100vh]">
          {ads[currentAdIndex].ad_type === "video" ? (
            <video
              key={ads[currentAdIndex].id}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls={true}
            >
              <source src={ads[currentAdIndex].file} type="video/mp4" />
              Tu navegador no soporta video.
            </video>
          ) : (
            <img
              className="w-full h-full object-contain"
              src={ads[currentAdIndex].file}
              alt={ads[currentAdIndex].title}
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <p className="text-lg md:text-2xl font-bold mb-2">
              {ads[currentAdIndex].title}
            </p>
            <p className="text-sm md:text-base">
              ID: {ads[currentAdIndex].id} - Próximo anuncio en: {timeRemaining}{" "}
              segundos
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdsDisplay;
