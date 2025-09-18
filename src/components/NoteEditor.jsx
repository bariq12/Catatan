import { useState } from "react";

export default function NoteEditor({ note, onBack }) {
  const [text, setText] = useState(note.text);

  const handleBack = () => {
    onBack({ ...note, text });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <button
          onClick={handleBack}
          className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 text-black"
        >
          ⬅ Kembali
        </button>
        <span className="text-gray-400">Catatan</span>
      </div>

      <textarea
        className="flex-1 p-4 bg-gray-900 outline-none resize-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Mulai mengetik..."
      />
    </div>
  );
}
