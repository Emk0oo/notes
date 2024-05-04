// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rusqlite::{params, Connection, Result};
use serde::{Deserialize, Serialize};
use tauri::command;

#[derive(Serialize, Deserialize)]
struct Note {
    id: i32,
    titre: String,
    contenu: String,
}

fn init_db() -> Result<Connection> {
    let conn = Connection::open("notes.db")?;
    conn.execute(
        "CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY,
            titre TEXT NOT NULL,
            contenu TEXT NOT NULL
        )",
        [],
    )?;
    Ok(conn)
}

#[command]
fn save_note(note: Note) {
    let conn = init_db().expect("Failed to initialize database");
    conn.execute(
        "INSERT INTO notes (titre, contenu) VALUES (?1, ?2)",
        params![note.titre, note.contenu],
    )
    .expect("Failed to save note");
}

#[command]
fn get_notes() -> Vec<Note> {
    let conn = init_db().expect("Failed to initialize database");
    let mut stmt = conn
        .prepare("SELECT id, titre, contenu FROM notes")
        .expect("Failed to prepare statement");
    let notes_iter = stmt
        .query_map([], |row| {
            Ok(Note {
                id: row.get(0)?,
                titre: row.get(1)?,
                contenu: row.get(2)?,
            })
        })
        .expect("Failed to query notes");

    notes_iter
        .map(|note| note.expect("Failed to read note"))
        .collect()
}

#[command]
fn edit(notes: Vec<Note>) {
    let conn = init_db().expect("Failed to initialize database");
    for note in notes {
        conn.execute(
            "UPDATE notes SET titre = ?1, contenu = ?2 WHERE id = ?3",
            params![note.titre, note.contenu, note.id],
        )
        .expect("Failed to update note");
    }
}

#[command]
fn delete_note(id: i32) {
    let conn = init_db().expect("Failed to initialize database");
    conn.execute("DELETE FROM notes WHERE id = ?1", params![id])
        .expect("Failed to delete note");
}

#[command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            save_note,
            get_notes,
            edit,
            delete_note
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
