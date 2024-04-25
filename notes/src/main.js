const titre = document.getElementById('titre');
const contenu = document.getElementById('contenu');

//Creer une note 
function creerNote(){

  console.log(titre, contenu)
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
        <h1>${titre.value}</h1>
        <p>${contenu.value}</p>
        <button onclick="supprimerNote()">Supprimer</button>
    `;
    document.body.appendChild(note);
} 

function supprimerNote(){
    const notes = document.querySelectorAll('.note');
    notes.forEach(note => {
        note.addEventListener('click', () => {
            note.remove();
        });
    });
}