import { FiPlus } from "react-icons/fi";
import cn from "classnames";

const AddNoteButton = ({
  onClick,
  className,
}: {
  onClick: VoidFunction;
  className?: string;
}) => {
  return (
    <button
      className={cn(
        "w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90",
        className
      )}
      onClick={onClick}
    >
      <FiPlus size={20} />
    </button>
  );
};

export default AddNoteButton;
