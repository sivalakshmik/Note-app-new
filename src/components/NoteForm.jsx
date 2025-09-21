import { useState, useEffect } from "react";

export default function NoteForm({ addNote, editingNote, setEditingNote, updateNote }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setDescription(editingNote.description);
      setTags((editingNote.tags || []).join(","));
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const noteData = { title, description, tags: tags.split(",").map((t) => t.trim()) };
    if (editingNote) {
      updateNote(editingNote.id, noteData);
      setEditingNote(null);
    } else {
      addNote(noteData);
    }
    setTitle("");
    setDescription("");
    setTags("");
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded p-4 shadow mb-6">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button type="submit" className="btn btn-edit">{editingNote ? "Update Note" : "Add Note"}</button>
    </form>
  );
}
