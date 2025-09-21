import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import Modal from "./components/Modal";
import "./index.css";

export default function App() {
  const [notes, setNotes] = useLocalStorage("notes-data", []);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [modalNote, setModalNote] = useState(null);

  const addNote = (newNote) => {
    setNotes([
      {
        ...newNote,
        id: Date.now(),
        pinned: false,
        archived: false,
        trashed: false,
      },
      ...notes,
    ]);
  };

  const updateNote = (id, updatedFields) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, ...updatedFields } : note)));
  };

  const moveToTrash = (id) => updateNote(id, { trashed: true, archived: false, pinned: false });
  const restoreNote = (id) => updateNote(id, { trashed: false });
  const deletePermanently = (id) => setNotes(notes.filter((note) => note.id !== id));
  const toggleArchive = (id) =>
    updateNote(id, { archived: !notes.find((n) => n.id === id).archived });

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = filterTag ? note.tags.includes(filterTag) : true;
    return matchesSearch && matchesTag;
  });

  const getNotesByStatus = (status) => {
    switch (status) {
      case "archived":
        return filteredNotes.filter((note) => note.archived && !note.trashed);
      case "trashed":
        return filteredNotes.filter((note) => note.trashed);
      default:
        return filteredNotes.filter((note) => !note.archived && !note.trashed);
    }
  };

  const openModal = (note) => setModalNote(note);
  const closeModal = () => setModalNote(null);

  return (
    <div className="min-h-screen bg-blue-300 " >
    <div className="container mx-auto p-4" >
      <h1 className="text-4xl font-bold text-center my-8">Notes App</h1>

      <NoteForm addNote={addNote} editingNote={editingNote} setEditingNote={setEditingNote} updateNote={updateNote} />

      <div className="my-4 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded flex-grow"
        />
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Tags</option>
          {[...new Set(notes.flatMap((note) => note.tags || []))].map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Active Notes */}
      <NotesList
        notes={getNotesByStatus("active")}
        updateNote={updateNote}
        moveToTrash={moveToTrash}
        toggleArchive={toggleArchive}
        openModal={openModal}
      />

      {/* Archived Notes */}
      <h2 className="text-xl font-bold mt-6">Archived Notes</h2>
      <NotesList
        notes={getNotesByStatus("archived")}
        updateNote={updateNote}
        moveToTrash={moveToTrash}
        toggleArchive={toggleArchive}
        openModal={openModal}
      />

      {/* Trash */}
      <h2 className="text-xl font-bold mt-6 text-red-600">Trash</h2>
      <NotesList
        notes={getNotesByStatus("trashed")}
        restoreNote={restoreNote}
        deletePermanently={deletePermanently}
      />

      {modalNote && <Modal note={modalNote} closeModal={closeModal} updateNote={updateNote} />}
    </div>
    </div>
  );
}
