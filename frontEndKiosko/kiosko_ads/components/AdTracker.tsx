import React, { useEffect } from "react";

interface AdTrackerProps {
  currentAdId: number;
}

const AdTracker: React.FC<AdTrackerProps> = ({ currentAdId }) => {
  useEffect(() => {
    console.log(`El ID del anuncio ha cambiado a: ${currentAdId}`);
  }, [currentAdId]); // Efecto que solo se dispara cuando el ID cambia

  return (
    <p className="text-sm text-gray-600">Anuncio Actual ID: {currentAdId}</p>
  );
};

export default AdTracker;
