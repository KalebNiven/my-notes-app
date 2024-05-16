import cn from "classnames";
import { InputHTMLAttributes } from "react";
import { FiSearch } from "react-icons/fi";
export interface Userload {
  username: string;
}

const SearchInput = ({
  className,
  ...props
}: { className?: string } & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div
      className={cn(
        "border border-slate-200 rounded-full relative overflow-hidden",
        className
      )}
    >
      <FiSearch className="absolute top-1/2 transform -translate-y-1/2 left-2" />
      <input
        className="w-full h-full p-2 pl-8"
        placeholder="Search..."
        {...props}
      />
    </div>
  );
};

export default SearchInput;
