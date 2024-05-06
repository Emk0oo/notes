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
