import { BounceLoader } from "react-spinners";

const FullSpinner = ({ message = "Cargando...", overlay = true }) => {
  return (
    <div
    className={`fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-4 ${
      overlay ? "bg-black bg-opacity-50" : ""
    }`}
  >
    <div className="flex flex-col items-center space-y-4">
      <BounceLoader color="#ffffff" size={60} />
  
      <p className="text-white text-lg font-semibold animate-pulse">
        {message}
      </p>
    </div>
  </div>
  
  );
};

export default FullSpinner;