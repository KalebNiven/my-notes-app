import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button,  Label, Modal, TextInput } from "flowbite-react";
const NoteList = () => {
  const [notes, setNotes] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [content, setcontent] = useState('');
  const [message, setMessage] = useState('');

  function onCloseModal() {
    setOpenModal(false);
    setcontent('');
  }
  const handleChange = (event) => {
    setcontent(event.target.value);
  };
  useEffect(() => {
    fetchNotes();
  }, []);
  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
    
  };
  const Delete=async(id)=>{
    try {
      await axios.delete(`http://localhost:3001/api/delete/notes/${id}`,
      );
      window.location.reload();
      
      
      
      
    } catch (error) {
      console.log(error);
      setMessage(error);
      alert(error)
      
    }
  }
  const update=async(id)=>{
    try {
      await axios.post(`http://localhost:3001/api/update/notes/${id}`,{
        "content":content
      });
      window.location.reload();
      
      
      
    } catch (error) {
      console.log(error);
      setMessage(error);
      alert(error)
      
    }

  }

  return (
    <div className='mt-10'>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg flex justify-center">
        <table class="w-[800px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Notes
              </th>
              <th scope="col" class="px-3 py-3 text-right ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4">
                  {note.content}
                </td>
                <td class="px-3 py-4 text-right">
                  <button onClick={() => setOpenModal(true)}  class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                  <button onClick={()=>{
                    Delete(note.id)
                  }} class="font-medium text-red-600 dark:text-red-500 hover:underline ml-5">Delete</button>
                  {message && <i className='text-red-600 font bold'>{message}</i>}
                </td>
                
              </tr>
              
            ))}
          </tbody>
        </table>
      </div>
      
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          {notes.map((item)=>{
            return(
              <div className="space-y-6">
             
             <div>
               <div className="mb-2 block">
                 <Label htmlFor="notes"  />
               </div>
               <TextInput
                 id="notes"
                 placeholder={item.content}
                 value={content}
                 
                 onChange={handleChange}
                 
               />
               {message && <i className='text-red-600 font bold'>{message}</i>}
             </div>
            
             <div className="w-full">
               <Button onClick={()=>{
                update(item.id)
               }}>Updated</Button>
             </div>
            
           </div>
            );
             

          })}
         
        </Modal.Body>
      </Modal>
    

    </div>
  );
};
export default NoteList;