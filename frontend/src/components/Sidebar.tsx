import AddNoteButton from "./AddNoteButton";
import LogoutButton from "./LogoutButton";

const Sidebar = ({ onAddNote }: { onAddNote: VoidFunction }) => {
  return (
    <div className="hidden md:flex w-[100px] border-r border-slate-200 text-center py-4 flex flex-col justify-between items-center">
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold mb-8">Notes</h2>
        <AddNoteButton onClick={onAddNote} />
      </div>
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
