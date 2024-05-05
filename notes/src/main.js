const { invoke } = window.__TAURI__.tauri;
let id = 0;
let editingNoteId = null; // Keeps track of the note being edited

// Check the highest existing note ID
async function checkId() {
  const tab = await invoke("get_notes");
  tab.forEach((fichier) => {
    if (fichier.id > id) {
      id = fichier.id;
    }
  });
}

// Create a new note
function creerNote() {
  const titre = document.getElementById("titre").value;
  const contenu = document.getElementById("contenu").value;
  id++;

  const noteElement = createNoteElement(id, titre, contenu);
  document.getElementById("savedNotes").appendChild(noteElement);

  insererFichierLocal(id, titre, contenu);
}

// Helper function to create note elements
function createNoteElement(id, titre, contenu) {
  const note = document.createElement("div");
  note.id = `note-${id}`;
  note.classList.add("bg-white", "p-4", "rounded-lg", "note");
  note.innerHTML = `
    <h1 class="font-bold text-lg">${titre}</h1>
    <p>${contenu}</p>
    <button onclick="supprimerNote(${id})">Supprimer</button>
    <button onclick="preEdit(${id}, '${titre}', '${contenu}')">Editer</button>
  `;
  return note;
}

// Prepare for editing a specific note
function preEdit(id, titre, contenu) {
  editingNoteId = id;
  document.getElementById("editTitre").value = titre;
  document.getElementById("editContenu").value = contenu;
}

// Save the edited note
async function saveEdit() {
  const newTitre = document.getElementById("editTitre").value;
  const newContenu = document.getElementById("editContenu").value;

  // Fetch the existing notes
  const notes = await invoke("get_notes");

  // Update the specific note with the new content
  const updatedNotes = notes.map((note) => {
    if (note.id === editingNoteId) {
      return { ...note, titre: newTitre, contenu: newContenu };
    }
    return note;
  });

  // Save the updated notes
  await invoke("edit", { notes: updatedNotes });

  // Update the content in the DOM
  const noteElement = document.querySelector(`#note-${editingNoteId}`);
  if (noteElement) {
    noteElement.querySelector("h1").innerText = newTitre;
    noteElement.querySelector("p").innerText = newContenu;
  }

  // Optionally clear the form fields after editing
  document.getElementById("editTitre").value = "";
  document.getElementById("editContenu").value = "";
  editingNoteId = null;
}

// Insert a new note into the database
async function insererFichierLocal(id, titre, contenu) {
  const note = { id, titre, contenu };

  try {
    await invoke("save_note", { note });
  } catch (error) {
    console.error("Erreur lors de l'invocation de save_note:", error);
  }
}

// Retrieve and display existing notes
async function recupererFichiersLocaux() {
  try {
    const fichiers = await invoke("get_notes");
    fichiers.forEach((fichier) => {
      const note = createNoteElement(fichier.id, fichier.titre, fichier.contenu);
      document.getElementById("savedNotes").appendChild(note);
    });
  } catch (error) {
    console.error("Erreur lors de l'invocation de get_notes:", error);
  }
}

// Delete a note
async function supprimerNote(id) {
  try {
    await invoke("delete_note", { id: parseInt(id) });
    const noteElement = document.querySelector(`#note-${id}`);
    if (noteElement) {
      noteElement.remove();
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la note:", error);
  }
}

// Initialize by checking IDs and loading notes
(async function init() {
  await checkId();
  await recupererFichiersLocaux();
})();
