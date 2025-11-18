// src/components/StarRating.jsx
export default function StarRating({ note }) {
    const safeNote = Number(note) || 0;
    const fullStars = Math.round(safeNote);
    const max = 5;
  
    return (
      <div aria-label={`Note ${safeNote}/5`}>
        {Array.from({ length: max }).map((_, index) => (
          <span key={index}>
            {index < fullStars ? "★" : "☆"}
          </span>
        ))}
        <span style={{ marginLeft: 8 }}>({safeNote.toFixed(1)}/5)</span>
      </div>
    );
  }
  