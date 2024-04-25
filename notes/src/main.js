const { invoke } = window.__TAURI__.tauri;

function creerNote() {
  const titre = document.getElementById("titre").value;
  const contenu = document.getElementById("contenu").value;

  const note = document.createElement("div");
  note.classList.add("bg-white", "p-4", "rounded-lg", "note"); // J'ai ajouté 'note' à la classe pour que la fonction supprimerNote fonctionne correctement
  note.innerHTML = `
      <h1 class="font-bold text-lg">${titre}</h1>
      <p>${contenu}</p>
      <button onclick="supprimerNote(this)">Supprimer</button>
  `;
  document.getElementById("savedNotes").appendChild(note);
  insererFichierLocal(titre, contenu); // Passez les valeurs directement à la fonction suivante
}

async function insererFichierLocal(titre, contenu) {
  const note = {
    titre: titre,
    contenu: contenu,
  };

  console.log("Debug note object:", note); // Pour vérifier l'objet

  try {
    const fichier = await invoke("save_note", { note }); // Assurez-vous que l'objet est bien passé en tant que 'note'
    console.log(fichier);
  } catch (error) {
    console.error("Erreur lors de l'invocation de save_note:", error);
  }
}

async function recupererFichiersLocaux() {
  try {
    const fichiers = await invoke("get_notes");
    console.log(fichiers);
    fichiers.forEach((fichier) => {
      const note = document.createElement("div");
      note.classList.add("bg-white", "p-4", "rounded-lg", "note");
      note.innerHTML = `
          <h1 class="font-bold text-lg">${fichier.titre}</h1>
          <p>${fichier.contenu}</p>
          <button onclick="supprimerNote(this)">Supprimer</button>
      `;
      document.getElementById("savedNotes").appendChild(note);
    });
  } catch (error) {
    console.error("Erreur lors de l'invocation de get_notes:", error);
  }
}



// Encapsulation dans une fonction asynchrone auto-invoquée
(async function init() {
  await recupererFichiersLocaux();
})();

function supprimerNote(button) {
  button.parentNode.remove(); // Cela supprime la div de la note entière
}