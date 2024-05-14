import axios from "axios";
import { Note } from "./types";
const BASE_URL: string = "http://localhost:3001/api/";

// Services of CRUD APIs

export const getNotes = (userId: string | null) => {
  return axios.get<Note[]>(`${BASE_URL}notes?userId=${userId}`);
};

export const deleteNote = (id: number) => {
  return axios.delete(`${BASE_URL}notes/${id}`);
};

export const createNote = (note: Omit<Note, "id">) => {
  return axios.post(`${BASE_URL}notes`, note);
};

export const updateNote = (note: Note) => {
  return axios.put(`${BASE_URL}notes/${note.id}`, note);
}
