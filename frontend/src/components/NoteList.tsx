import React, { useEffect, useState } from 'react';
import { Button, Label, Modal, TextInput } from "flowbite-react";

// This is how you can import services
import { deleteNote, getNotes, updateNote } from '../services/note';
import NoteForm from './NoteForm';

export interface Note {
  id: number;
  content: string;
}

interface SelectedNote {
  id?: number | null;
  content: string;
}

const NoteList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [selectedNote, setSelectedNote] = useState<SelectedNote>({ id: null, content: '' });

  useEffect(() => {
    fetchNotes();
  }, []);

  const onCloseModal = (): void => {
    setOpenModal(false);
    setContent('');
    setSelectedNote({
      id:null, content: ''
    })
  };

  // this function will be called to refetch the get notes api and reset state
  const refresh = () => {
    fetchNotes();
    setMessage('');
    setContent('');
    onCloseModal();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedNote({
      ...selectedNote,
      content:event.target.value
    });
  };

  const fetchNotes = async (): Promise<void> => {
    try {
      const response = await getNotes();
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await deleteNote(id);
      refresh();
    } catch (error: any) {
      console.log(error);
      setMessage(error.message);
      alert(error.message);
    }
  };

  const handleUpdate = async (): Promise<void> => {
    try {
      await updateNote(selectedNote.content, selectedNote.id);
      refresh();
    } catch (error: any) {
      console.log(error);
      setMessage(error.message);
      alert(error.message);
    }
  };

  return (
    <>
      <NoteForm refresh={refresh} />
      <div className='container mx-auto'>
        <div className='mt-10'>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex justify-center">
            <table className="w-[800px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Notes
                  </th>
                  <th scope="col" className="px-3 py-3 text-right ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note) => (
                  <tr key={note.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">
                      {note.content}
                    </td>
                    <td className="px-3 py-4 text-right">
                      <button onClick={() => {
                        setSelectedNote({ id: note.id, content: note.content });
                        setOpenModal(true)
                      }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                      <button onClick={() => { handleDelete(note.id) }} className="font-medium text-red-600 dark:text-red-500 hover:underline ml-5">Delete</button>
                      {message && <i className='text-red-600 font-bold'>{message}</i>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Modal show={openModal} size="md" onClose={onCloseModal} popup>
            <Modal.Header>Edit Note</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="notes" />
                  </div>
                  <TextInput
                    id="notes"
                    value={selectedNote.content}
                    onChange={handleChange}
                  />
                  {message && <i className='text-red-600 font-bold'>{message}</i>}
                </div>
                <div className="w-full">
                  <Button onClick={handleUpdate}>Update</Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>

  );
};

export default NoteList;
