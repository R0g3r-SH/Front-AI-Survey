import { BounceLoader } from "react-spinners";

const Spinner = ({ message = "Cargando contenido..." }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center px-4">
      <BounceLoader color="#8B5CF6" />
      <p className="mt-4 text-purple-600 text-lg font-semibold animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default Spinner;
