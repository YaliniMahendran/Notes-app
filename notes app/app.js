document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notes');
    const createNoteBtn = document.getElementById('createNoteBtn');
    const noteModal = document.getElementById('noteModal');
    const closeModalBtn = document.querySelector('.close');
    const saveNoteBtn = document.getElementById('saveNoteBtn');
    const noteText = document.getElementById('noteText');

    // Load notes from localStorage
    const loadNotes = () => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notesContainer.innerHTML = '';

        if (notes.length === 0) {
            notesContainer.innerHTML = '<p>No notes available. Create your first note using the button above.</p>';
        } else {
            notes.forEach((note, index) => {
                const noteDiv = document.createElement('div');
                noteDiv.classList.add('note');

                const noteContent = document.createElement('p');
                noteContent.textContent = note;

                const deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = '🗑️';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.addEventListener('click', () => deleteNote(index));

                noteDiv.appendChild(noteContent);
                noteDiv.appendChild(deleteBtn);
                notesContainer.appendChild(noteDiv);
            });
        }
    };

    const createNote = () => {
        noteText.value = '';
        noteModal.style.display = 'flex';
    };

    const saveNote = () => {
        const note = noteText.value.trim();
        if (note) {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes.push(note);
            localStorage.setItem('notes', JSON.stringify(notes));
            loadNotes();
            noteModal.style.display = 'none';
        }
    };

    const deleteNote = (index) => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    };

    createNoteBtn.addEventListener('click', createNote);
    saveNoteBtn.addEventListener('click', saveNote);
    closeModalBtn.addEventListener('click', () => noteModal.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target == noteModal) {
            noteModal.style.display = 'none';
        }
    });

    loadNotes();
});

