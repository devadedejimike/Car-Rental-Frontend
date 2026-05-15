import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="px-4 py-2 border rounded-lg hover:bg-gray-100 mb-5"
    >
      ← Back
    </button>
  );
};

export default BackButton;