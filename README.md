# Tauri Notes App

A note-taking application built using Tauri and Rust. This application allows you to create, edit, and delete notes while providing a simple and intuitive user interface.

## Features

- **Add New Notes:** Add new notes by providing a title and content.
- **Edit Existing Notes:** Modify any existing note's title and content.
- **Delete Notes:** Remove notes from the database.
- **View All Notes:** Display all saved notes with their titles and contents.

## Technologies Used

- **Tauri:** Cross-platform framework for building native desktop applications.
- **Rust:** Modern systems programming language.
- **Rusqlite:** SQLite database wrapper for Rust to handle persistent storage.
- **HTML/CSS/JavaScript:** Frontend design and behavior for the user interface.

## Getting Started

### Prerequisites

- Rust programming language: [Install Rust](https://www.rust-lang.org/tools/install)
- Tauri prerequisites: [Check Tauri Setup](https://tauri.app/v1/guides/getting-started/prerequisites)

### Installation

1. Clone this repository.
2. Install dependencies:
   ```bash
   cargo install tauri-cli
3. Launch app:
   ```bash
   cd notes
   cargo tauri dev

### Usage

1. **Launch the application:** The main screen labeled "Notes" will open.

#### Adding a Note

1. Navigate to the "Ajouter une note" (Add Note) section.
2. Enter a title in the "Titre" field and content in the "Contenu" field.
3. Click the "Ajouter une note" button to save the note.
4. The new note will appear in the "Mes notes enregistrées" section.

#### Editing a Note

1. Locate the note you wish to edit in the "Mes notes enregistrées" section.
2. Click the "Editer" button next to that note.
3. The note's title and content will appear in the "Editer la note" (Edit Note) section.
4. Modify the title and content as desired.
5. Click "Enregistrer" to save changes.

#### Deleting a Note

1. Locate the note you wish to delete in the "Mes notes enregistrées" section.
2. Click the "Supprimer" button next to that note.
3. The note will be permanently removed from the database.

### Code Structure

- **HTML/CSS/JavaScript:** Located in the `index.html` and `main.js` files for the user interface.
- **Rust Backend:**
  - `save_note` to insert a new note.
  - `get_notes` to retrieve saved notes.
  - `edit` to update notes.
  - `delete_note` to remove notes.

### Future Enhancements

- **Search Feature:** Filter notes based on keywords.
- **Rich Text Editor:** Add support for rich text formatting in note content.

### Contributing

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

### License

This project is licensed under the MIT License.

### Hotkey Suggestions
- **Z**: Save the README to a file and create a downloadable link.
- **T**: Provide test cases for the app.
- **E**: Expand on the app's technical architecture or database details.
- **W**: Confirm if the README meets your requirements or request edits.

