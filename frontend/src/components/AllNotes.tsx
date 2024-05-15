import { FiEdit2, FiPlus } from "react-icons/fi";
import cn from "classnames";
import { Note } from "../services/types";
import moment from "moment";
import LogoutButton from "./LogoutButton";
import { MdCancel } from "react-icons/md";
import { deleteNote, createNote, updateNote } from "../services/note"; // Import updateNote function
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const userid = localStorage.getItem('userId');

const AllNotes = ({ notes = [], handleOpenEditModal, className, onAddNote }: { notes?: Note[]; onAddNote: VoidFunction; handleOpenEditModal: (note: Note) => void; className?: string; }) => {
  const [username, setUsername] = useState("");
  const [allNotes, setAllNotes] = useState<Note[]>(notes);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [noteContent, setNoteContent] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (userid) {
        const user = await axios.get(`${BASE_URL}user/${userid}`);
        setUsername(user.data.data.username);
      }
    };
    fetchUser();
  }, []);

  const deletenotesbutton = async (id: number) => {
    try {
      await deleteNote(id);
      setAllNotes(allNotes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting the note:', error);
    }
  }

  const handleCreateNote = async () => {
    if (userid) {
      try {
        const newNote = await createNote({
          userId: userid,
          content: 'New Note',
          createdAt: new Date().toISOString()
        });
        setAllNotes([...allNotes, newNote.data]);
      } catch (error) {
        console.error('Error creating the note:', error);
      }
    } else {
      console.error('User ID is null');
    }
  }

  const handleEditNote = (note: Note) => {
    setCurrentNote(note);
    setNoteContent(note.content);
    setIsEditModalOpen(true);
  }

  const handleSaveNote = async () => {
    if (currentNote) {
      try {
        const updatedNote = await updateNote({ ...currentNote, content: noteContent });
        setAllNotes(allNotes.map(note => note.id === currentNote.id ? updatedNote.data : note));
        setIsEditModalOpen(false);
      } catch (error) {
        console.error('Error updating the note:', error);
      }
    }
  }

  const truncateContent = (content: any) => {
    return content.length > 30 ? content.substring(0, 30) + '.........' : content;
  };

  return (
    <div className="w-full h-full ">
      <h1 className="text-3xl mb-3 " style={{ fontFamily: "Poppins, sans-serif" }}>Hi @{username}</h1>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">All notes</h2>
        <LogoutButton className="block md:hidden" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4">
        {allNotes.map((note) => (
          <div key={note.id} className="rounded-lg bg-yellow-300 p-4 h-[200px] border border-slate-200 relative flex flex-col justify-between">
            <div className="line-clamp-5">{truncateContent(note.content)}</div>
            <div className="flex items-center justify-between">
              <div className="text-xs">
                {moment(note.createdAt).format("DD MMM YYYY")}
              </div>
              <button
                className={cn("w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80", className)}
                onClick={() => handleEditNote(note)}
              >
                <FiEdit2 size={14} />
              </button>
              <button
                className={cn("w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80", className)}
                onClick={() => deletenotesbutton(note.id)}
              >
                <MdCancel size={14} />
              </button>
            </div>
          </div>
        ))}
        <div
          className="rounded-lg bg-slate-100 p-4 h-[200px] flex items-center justify-center cursor-pointer border border-slate-200 hover:border-slate-300"
          onClick={handleCreateNote}
        >
          <div className="flex items-center justify-center text-neutral-600 flex-col">
            <div className="text-lg">Add note</div>
            <FiPlus />
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl mb-4">Edit Note</h2>
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
              onClick={handleSaveNote}
            >
              Save
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllNotes;
