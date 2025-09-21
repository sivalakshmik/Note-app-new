import React, { useState, useEffect } from "react";

export default function Modal({ note, closeModal, updateNote }) {
  const [title, setTitle] = useState(note.title);
  const [description, setDescription] = useState(note.description);
  const [tags, setTags] = useState((note.tags || []).join(", "));

  // Update local state when note changes
  useEffect(() => {
    setTitle(note.title);
    setDescription(note.description);
    setTags((note.tags || []).join(", "));
  }, [note]);

  const handleSave = () => {
    updateNote(note.id, {
      title,
      description,
      tags: tags.split(",").map((t) => t.trim()).filter((t) => t !== ""),
    });
    closeModal();
  };

  return (
    
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-11/12 md:w-1/2 lg:w-1/3 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Note</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border rounded mb-3"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          className="w-full p-2 border rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="btn btn-trash"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn btn-edit"
          >
            Save
          </button>
        </div>
      </div>
    </div>
    
  );
}
