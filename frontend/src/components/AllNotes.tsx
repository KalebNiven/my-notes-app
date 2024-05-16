import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import cn from "classnames";
import { Note } from "../services/types";
import moment from "moment";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AllNotes = ({
  notes = [],
  handleOpenEditModal,
  className,
  onAddNote,
  onDeleteNote,
}: {
  notes?: Note[];
  onAddNote: VoidFunction;
  handleOpenEditModal: (note: Note) => void;
  className?: string;
  onDeleteNote: (id: number) => void;
}) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const user = await axios.get(`${BASE_URL}user/${userId}`);
        setUsername(user.data.data.username);
      } else {
        console.error("User ID is null");
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="w-full">
      <h1
        className="text-3xl mb-3 "
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Hi @{username}
      </h1>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">All notes</h2>
        <LogoutButton className="block md:hidden" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="rounded-lg bg-yellow-300 p-4 h-[200px] border border-slate-200 relative flex flex-col justify-between"
          >
            <div className="line-clamp-4 h-[96px]">{note.content}</div>
            <div className="flex items-center justify-between">
              <div className="text-xs">
                {moment(note.createdAt).format("DD MMM YYYY")}
              </div>
              <div className="flex gap-2">
                <button
                  className={cn(
                    "w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80",
                    className
                  )}
                  onClick={() => handleOpenEditModal(note)}
                >
                  <FiEdit2 size={14} />
                </button>
                <button
                  className={cn(
                    "w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80",
                    className
                  )}
                  onClick={() => onDeleteNote(note.id)}
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div
          className="rounded-lg bg-slate-100 p-4 h-[200px] flex items-center justify-center cursor-pointer border border-slate-200 hover:border-slate-300"
          onClick={onAddNote}
        >
          <div className="flex items-center justify-center text-neutral-600 flex-col">
            <div className="text-lg">Add note</div>
            <FiPlus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllNotes;
