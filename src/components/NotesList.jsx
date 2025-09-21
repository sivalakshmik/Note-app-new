import NoteCard from "./NoteCard";

export default function NotesList(props) {
  const { notes } = props;

  if (!notes || notes.length === 0) return <p className="text-gray-500 mt-2">No notes found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} {...props} />
      ))}
    </div>
  );
}
