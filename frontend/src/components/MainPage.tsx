import { useEffect, useMemo, useState } from "react";
import AllNotes from "./AllNotes";
import Sidebar from "./Sidebar";
import { Note } from "../services/types";
import { getNotes } from "../services/note";
import EditNoteModal from "./EditNoteModal";
import SearchInput from "./SearchInput";

const MainPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeNote, setActiveNote] = useState<Note | undefined>();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async (): Promise<void> => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await getNotes(userId);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleOpenEditModal = (note: Note) => {
    setShowEditModal(true);
    setActiveNote(note);
  };
  const refresh = () => {
    fetchNotes();
    setShowEditModal(false);
    setActiveNote(undefined);
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((note) =>
      note.content.toLowerCase().includes(search.toLowerCase())
    );
  }, [notes, search]);

  return (
    <div className="flex h-full w-full">
      <Sidebar onAddNote={() => setShowEditModal(true)} />
      <div className="w-full md:w-[calc(100%-100px)]  p-4 w-full h-full">
        <SearchInput
          className="mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <AllNotes
          notes={filteredNotes}
          handleOpenEditModal={handleOpenEditModal}
          onAddNote={() => setShowEditModal(true)}
        />
      </div>
      <EditNoteModal
        activeNote={activeNote}
        onRefresh={refresh}
        openModal={showEditModal}
        onCloseModal={() => {
          setShowEditModal(false);
          setActiveNote(undefined);
        }}
      />
    </div>
  );
};

export default MainPage;
