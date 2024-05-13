import React, { useState, ChangeEvent, FormEvent } from 'react';
import { createNote } from '../services/note';

const NoteForm = ({refresh}: any) => {
  const [content, setContent] = useState<string>("");
  const [message, setMessage] = useState<string>('');
  const [isSubmitDisabled, setSubmitDisabled] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setContent(event.target.value);
  };

  const submit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      setSubmitDisabled(true);

      // extracting userid from localstorage to create a note
      const userId = localStorage.getItem('userId');

      await createNote(content, userId);
      setSubmitDisabled(false);

      // refreshing the list after creating a note
      refresh();
    } catch (error:any) {
      console.error('Error saving note:', error);
      setMessage(error);
      alert(error);
      setSubmitDisabled(false);
    }
  }

  return (
    <>
      <form className="max-w-sm mx-auto" onSubmit={submit}>
        <div className="mb-5">
          <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes Content</label>
          <input onChange={handleChange} type="text" id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          {message ? <i></i> : <i className='text-red-600 font-bold'>{message}</i>}
          <button disabled={isSubmitDisabled} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3' type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default NoteForm;
