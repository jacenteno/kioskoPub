// components/StatusBar.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface StatusBarProps {
  status: string;
  countdown: number; // Número de segundos para la cuenta regresiva
}

const StatusBar: React.FC<StatusBarProps> = ({ status, countdown }) => {
  const [visible, setVisible] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(countdown);

  useEffect(() => {
    if (status) {
      setVisible(true);
      setTimeLeft(countdown);

      const interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      const timer = setTimeout(() => {
        setVisible(false);
        clearInterval(interval);
      }, (countdown + 1) * 1000); // Ocultar después del tiempo de espera

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [status, countdown]);

  return (
    <>
      {visible && (
        <motion.div
          className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 text-center shadow-lg"
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          style={{
            filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.7))",
          }}
        >
          <span className="font-bold text-lg">{status}</span>
          {timeLeft > 0 ? (
            <span className="ml-2 font-semibold text-lg">
              | Siguiente en: {timeLeft}s
            </span>
          ) : (
            <span className="ml-2 font-semibold text-lg">
              | ¡Listo para el próximo anuncio!
            </span>
          )}
        </motion.div>
      )}
    </>
  );
};

export default StatusBar;
