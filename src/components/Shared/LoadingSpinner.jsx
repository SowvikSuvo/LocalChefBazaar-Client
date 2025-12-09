import { RingLoader } from "react-spinners";

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={`${
        smallHeight ? "h-[250px]" : "h-[70vh]"
      } flex justify-center items-center `}
    >
      <RingLoader size={90} color="orange" speedMultiplier={1} />
    </div>
  );
};

export default LoadingSpinner;
