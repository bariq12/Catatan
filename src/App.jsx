import { useState, useEffect } from "react";
import NoteList from "./components/Notelist";
import NoteEditor from "./components/NoteEditor";
import "./App.css";

export default function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeNote, setActiveNote] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // ✅ bikin catatan baru kosong, langsung pindah ke editor
  const createNote = () => {
    setActiveNote({ id: Date.now(), text: "" });
  };

  const saveNote = (note) => {
    const trimmed = note.text.trim();

    if (trimmed.length === 0) {
      // 🗑 kalau kosong → delete
      setNotes(notes.filter((n) => n.id !== note.id));
      setActiveNote(null);
      return;
    }

    const existing = notes.find((n) => n.id === note.id);
    if (existing) {
      // update note lama
      setNotes(
        notes.map((n) => (n.id === note.id ? { ...note, text: trimmed } : n))
      );
    } else {
      // tambah note baru
      setNotes([{ ...note, text: trimmed }, ...notes]);
    }
    setActiveNote(null);
  };

  return (
    <div className="w-screen h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/4 border-r border-gray-800 p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Catatan</h1>
          <button
            onClick={createNote}
            className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400"
          >
            +
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <NoteList notes={notes} onSelect={(note) => setActiveNote(note)} />
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        {activeNote ? (
          <NoteEditor note={activeNote} onBack={saveNote} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Pilih catatan atau buat baru
          </div>
        )}
      </div>
    </div>
  );
}
