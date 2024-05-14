import { Modal } from "flowbite-react";
import { FormEvent, useEffect, useState } from "react";
import { createNote, updateNote } from "../services/note";
import { Note } from "../services/types";

const EditNoteModal = ({
  activeNote,
  onRefresh,
  openModal,
  onCloseModal,
}: {
  activeNote?: Note;
  openModal?: boolean;
  onCloseModal: VoidFunction;
  className?: string;
  onRefresh: VoidFunction;
}) => {
  const [content, setContent] = useState(activeNote?.content || "");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!openModal) {
      setIsLoading(false);
      setContent("");
    }
  }, [openModal]);

  useEffect(() => {
    if (activeNote) {
      setContent(activeNote?.content);
    }
  }, [activeNote]);
  const submit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const userId = localStorage.getItem("userId") as string;
      if (activeNote) {
        await updateNote({ ...activeNote, content });
      } else {
        await createNote({ content, userId });
      }
      onRefresh();
    } catch (error: any) {
      console.error("Error saving note:", error);
      setMessage(error);
      alert(error);
    }
    setIsLoading(false);
  };
  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header className="mx-4 border-b mb-4">
        {activeNote ? "Edit note" : "Add a new note"}
      </Modal.Header>
      <Modal.Body>
        <form className="max-w-sm mx-auto" onSubmit={submit}>
          <label
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Notes Content
          </label>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className="block w-full p-4 min-h-[200px] text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {message ? (
            <i></i>
          ) : (
            <i className="text-red-600 font-bold">{message}</i>
          )}
          <button
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
            type="submit"
          >
            Submit
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditNoteModal;
