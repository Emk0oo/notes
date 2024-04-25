const { invoke } = window.__TAURI__.tauri;
let id = 0;

async function checkId() {
  let tab = await invoke("get_notes");
  tab.forEach((fichier) => {
    if (fichier.id > id) {
      id = fichier.id;
    }
  });
}

function creerNote() {
  const titre = document.getElementById("titre").value;
  const contenu = document.getElementById("contenu").value;
  id++; // Incrémentez l'ID pour chaque nouvelle note

  const note = document.createElement("div");
  note.classList.add("bg-white", "p-4", "rounded-lg", "note"); // J'ai ajouté 'note' à la classe pour que la fonction supprimerNote fonctionne correctement
  note.innerHTML = `
      <h1 class="font-bold text-lg">${titre}</h1>
      <p display="none">${id}</p>
      <p>${contenu}</p>
      <button onclick="supprimerNote(${id})">Supprimer</button>
      <button onclick="editer(${id})">Editer</button>
  `;
  document.getElementById("savedNotes").appendChild(note);
  insererFichierLocal(id, titre, contenu); // Passez les valeurs directement à la fonction suivante
}

async function editer(id) {
  let notes = await invoke("get_notes");
  let found = false;
  notes.forEach((fichier) => {
    if (fichier.id == id) {
      fichier.titre = document.getElementById("titre").value;
      fichier.contenu = document.getElementById("contenu").value;
      found = true;
      console.log(fichier);
    }
  });

  if (!found) {
    console.log("Aucune note trouvée avec cet ID");
    return;
  }

  console.log(notes);
  try {
    await invoke("edit", { notes }); // Assurez-vous d'envoyer un vecteur de notes
    console.log("Note éditée et sauvegardée :", notes);
  } catch (error) {
    console.error("Erreur lors de l'invocation de edit:", error);
  }
}

async function insererFichierLocal(id, titre, contenu) {
  const note = {
    id: id,
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
    fichiers.forEach((fichier) => {
      const note = document.createElement("div");
      note.classList.add("bg-white", "p-4", "rounded-lg", "note");
      note.innerHTML = `
          <h1 class="font-bold text-lg">${fichier.titre}</h1>
          <p>${fichier.contenu}</p>
          <button onclick="supprimerNote(${fichier.id})">Supprimer</button>
          <button onclick="editer(${fichier.id})">Editer</button>

      `;
      document.getElementById("savedNotes").appendChild(note);
    });
  } catch (error) {
    console.error("Erreur lors de l'invocation de get_notes:", error);
  }
}

// Encapsulation dans une fonction asynchrone auto-invoquée
(async function init() {
  await checkId();
  await recupererFichiersLocaux();
})();

async function supprimerNote(id) {
  try {
    console.log(id)

    await invoke("delete_note", { id: parseInt(id) });
    console.log("Note supprimée avec succès");

    // Suppression de la div de la note du DOM, ajustez selon votre implémentation spécifique
    const noteElement = document.querySelector(`#note-${id}`);
    if (noteElement) {
      noteElement.remove();
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la note:", error);
  }
}

// async function supprimerNote(id, buttonElement) {
//   console.log("ID reçu pour suppression:", id); // Vérifiez ce qui est effectivement reçu

//   // Convertir id en nombre
//   const numericId = Number(id);
//   console.log("ID numérique pour suppression:", numericId, typeof numericId);

//   if (isNaN(numericId)) {
//     console.error("L'ID fourni n'est pas un nombre valide:", id);
//     return; // Arrêter l'exécution si l'ID n'est pas valide
//   }

//   let notes = await invoke("get_notes");
//   console.log("Notes avant suppression:", notes);

//   // Filtrer pour enlever la note avec l'ID numérique correspondant
//   const filteredNotes = notes.filter(fichier => fichier.id !== numericId);
//   console.log("Notes après suppression:", filteredNotes);

//   // Mettre à jour les notes sur le serveur ou en local
//   try {
//     await invoke("edit", { notes: filteredNotes });
//     console.log("Notes mises à jour après suppression");
//   } catch (error) {
//     console.error("Erreur lors de la mise à jour des notes:", error);
//   }

//   // Suppression de la div de la note du DOM
//   if (buttonElement && buttonElement.parentNode) {
//     buttonElement.parentNode.remove();
//   }
// }
