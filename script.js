const quotes = [
    "Koshish karne walon ki kabhi haar nahi hoti.",
    "Jitne ka maza tab hai jab aap apne sapne ke liye mehnat karte hain.",
    "Agar aap sochte hain ki aap kar sakte hain, toh aap zaroor kar sakte hain.",
    "Samasyaon se bhag kar kuch nahi milta, unka samna karna padta hai.",
    "Har subah ek naya mauka hota hai, is mauke ko kho na do.",
    "Sapne wo nahi jo hum sote waqt dekhte hain, sapne wo hain jo hume sone nahi dete.",
    "Safalta ka rahasya hai, kabhi nahi rukna.",
    "Agar aapne kal nahi kiya, toh aaj zaroor karen.",
    "Sakaratmak soch se hi badi se badi samasya ka hal nikalta hai.",
    "Jo log sapne dekhte hain, wahi unhe poora karne ki himmat rakhte hain."
];

// random quote
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Welcome Message and Random Quote
function displayWelcomeMessage() {
    const rightPanel = document.getElementById("note-form-container");
    rightPanel.innerHTML = `
        <h2>Welcome to Quik<span style="color: blueviolet;">Note!</span></h2>
        <p style="font-style: italic;">"${displayRandomQuote()}"</p>
    `;
}

displayWelcomeMessage();

// Create Note
function showCreateNoteForm() {
    const rightPanel = document.getElementById("note-form-container");
    rightPanel.innerHTML = `
        <h2>Create New Note</h2>
        <input type="text" id="note-title" placeholder="Title" maxlength="50">
        <textarea id="note-text" placeholder="Write your note here..." style="height: 250px;"></textarea>
        <div id="btn-container">
            <button onclick="createNote()">Save Note</button>
            <button id="closeBtn" onclick="clearRightPanel()">Cancel</button>
        </div>
    `;
}

function clearRightPanel() {
    displayWelcomeMessage();
}

// Create and Display Notes
function createNote() {
    const noteTitle = document.getElementById("note-title").value.trim();
    const noteText = document.getElementById("note-text").value.trim();
    
    if (noteTitle && noteText) {
        const note = { id: Date.now(), title: noteTitle, text: noteText };
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
        
        clearRightPanel();
        displayNotes();
        displayRandomQuoteMessage("Note created successfully!");
    }
}

function displayNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const notesList = document.getElementById("notes-list");
    notesList.innerHTML = "";
    
    notes.forEach(note => {
        const listItem = document.createElement("li");
        listItem.onclick = () => showNoteInRightPanel(note.id);
        listItem.innerHTML = `<strong>${note.title}</strong>`;
        notesList.appendChild(listItem);
    });
}

// Show Note
function showNoteInRightPanel(noteId) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const note = notes.find(note => note.id === noteId);
    
    if (note) {
        const rightPanel = document.getElementById("note-form-container");
        rightPanel.innerHTML = `
            <h2>View Note</h2>
            <strong>${note.title}</strong>
            <p>${note.text}</p>
            <div id="btn-container">
                <button onclick="showEditNoteForm(${note.id})">Edit Note</button>
                <button id="deleteBtn" onclick="deleteNote(${note.id})">Delete Note</button>
                <button id="closeBtn" onclick="clearRightPanel()">Close</button>
            </div>
        `;
    }
}

// Show Edit Note
function showEditNoteForm(noteId) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const note = notes.find(note => note.id === noteId);
    
    if (note) {
        const rightPanel = document.getElementById("note-form-container");
        rightPanel.innerHTML = `
            <h2>Edit Note</h2>
            <input type="text" id="note-title" value="${note.title}">
            <textarea id="note-text" style="height: 250px;">${note.text}</textarea>
            <div id="btn-container">
                <button onclick="updateNote(${note.id})">Update Note</button>
                <button id="closeBtn" onclick="clearRightPanel()">Cancel</button>
            </div>
        `;
    }
}

// Update Note 
function updateNote(noteId) {
    const noteTitle = document.getElementById("note-title").value.trim();
    const noteText = document.getElementById("note-text").value.trim();
    
    if (noteTitle && noteText) {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const updatedNotes = notes.map(note => 
            note.id === noteId ? { id: note.id, title: noteTitle, text: noteText } : note
        );
        
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        clearRightPanel();
        displayNotes();
        displayRandomQuoteMessage("Note updated successfully!");
    }
}

// Delete Note 
function deleteNote(noteId) {
    if (confirm("Are you sure you want to delete this note?")) {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const updatedNotes = notes.filter(note => note.id !== noteId);

        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        clearRightPanel();
        displayNotes();
        displayRandomQuoteMessage("Note deleted successfully!");
    }
}

// random quote after user actions
function displayRandomQuoteMessage(message) {
    const rightPanel = document.getElementById("note-form-container");
    rightPanel.innerHTML = `
        <h2>${message}</h2>
        <p style="font-style: italic;">"${displayRandomQuote()}"</p>
    `;
}

// all notes on load
displayNotes();





