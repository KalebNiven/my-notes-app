import React from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import axios from 'axios';
const App = () => {
  const initialValues = {
    content: '',
  };
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axios.post('http://localhost:3001/api/notes', values);
      resetForm();

    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div class=" py-8">
      <h1 class="text-center text-3xl font-bold mb-8">Notes App</h1>
        <NoteForm />
        <NoteList />
    </div>
  );
};
export default App;