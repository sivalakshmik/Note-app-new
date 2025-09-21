export default function NoteCard({
  note,
  updateNote,
  moveToTrash,
  toggleArchive,
  openModal,
  restoreNote,
  deletePermanently,
}) {
  return (
    <div
      className={`border rounded-t-3xl p-7 shadow hover:shadow-lg 
        ${note.trashed ? "bg-red-100" :
          note.archived ? "bg-gray-100" :
          note.pinned ? "bg-yellow-200" : "bg-white"}
      `}
    >
      <h3 className="font-bold text-lg">{note.title}</h3>
      <p className="text-gray-700">{note.description}</p>

      {note.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {note.tags.map((tag, i) => (
            <span key={i} className="bg-gray-200 rounded px-2 py-1 text-sm">{tag}</span>
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-3">
        {!note.trashed && (
          <>
            <button onClick={() => updateNote(note.id, { pinned: !note.pinned })} className="btn btn-pin"> 📌 Pin</button>
            <button onClick={() => toggleArchive(note.id)} className="btn btn-archive">📂 Archive</button>
            <button onClick={() => moveToTrash(note.id)} className="btn btn-trash">🗑️ Trash</button>
            <button onClick={() => openModal(note)} className="btn btn-edit"> ✏️ Edit</button>
          </>
        )}

        {note.trashed && (
          <>
            <button onClick={() => restoreNote(note.id)} className="btn btn-restore">Restore</button>
            <button onClick={() => deletePermanently(note.id)} className="btn btn-delete">Delete</button>
          </>
        )}
      </div>
    </div>
  );
}
