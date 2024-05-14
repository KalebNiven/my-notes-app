import cn from "classnames";
import { InputHTMLAttributes, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { Note } from "../services/types";



export interface Userload {
  username: string;
}



const SearchInput = ({
  className,
  ...props
}: { className?: string } & InputHTMLAttributes<HTMLInputElement>) => {
 
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);



  

  return (
    <div className={cn("border border-slate-200 rounded-full relative overflow-hidden", className)}>
      <FiSearch className="absolute top-1/2 transform -translate-y-1/2 left-2" />
      <input
        className="w-full h-full p-2 pl-8"
        placeholder={`serach`}
        value={query}
     
        {...props}
      />
     
    </div>
  );
};

export default SearchInput;
