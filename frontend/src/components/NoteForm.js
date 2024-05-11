import React,{useState} from 'react';
import axios from 'axios';

const NoteForm = () => {

  const [content, setcontent] = useState("");
  const [message, setMessage] = useState('');
  const handleChange = (event) => {
    setcontent(event.target.value);
  };
  const submit= async()=>{
    try {
      await axios.post('http://localhost:3001/api/notes',{
        "content":content
      });
     
    } catch (error) {
      console.error('Error saving note:', error);
     setMessage(error);
     alert(error)
    } }

  return (
   <>
   
<form class="max-w-sm mx-auto">
  <div class="mb-5">
      <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes Content</label>
      <input onChange={handleChange} type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
      {message ?<i></i> : <i className='text-red-600 font bold'>{message}</i>}

      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3' onClick={submit}>Submit</button>
  </div>
 
</form>


   
   
   </>
    
  );
};
export default NoteForm;