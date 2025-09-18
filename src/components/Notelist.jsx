export default function Notelist({ notes, onSelect }) {
  if (notes.length === 0) {
    return <p className="text-gray-400">Belum ada catatan</p>;
  }

  return (
    <div className="space-y-2">
      {notes.map((note) => (
        <div
          key={note.id}
          onClick={() => onSelect(note)}
          className="p-3 bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
        >
          <p className="truncate">{note.text || "(kosong)"}</p>
          <small className="text-gray-400">
            {new Date(note.id).toLocaleDateString()}
          </small>
        </div>
      ))}
    </div>
  );
}
