import { FaTrashAlt } from "react-icons/fa";

const SwipeToDeleteContent = () => {
  return (
    <div
      style={{
        backgroundColor: "#FF3B30",
        border: "none",
        color: "white",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "90%",
        width: "100%",
        paddingRight: "20px",
      }}
    >
      <FaTrashAlt size={18} />
    </div>
  );
};

export default SwipeToDeleteContent;
