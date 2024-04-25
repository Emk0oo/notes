// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::{self, Read, Write}; // Ajout de `Read` et `io` pour résoudre les erreurs
use serde_json;

#[derive(Serialize, Deserialize)]
struct Note {
    id: i32,
    titre: String,
    contenu: String,
}

#[tauri::command]
fn save_note(note: Note) {
    let mut previous_notes = read_notes().unwrap_or_else(|err| {
        eprintln!("Erreur lors de la lecture des notes: {}", err);
        Vec::new() // Si une erreur se produit lors de la lecture des notes, créer une nouvelle liste vide
    });

    previous_notes.push(note);

    let mut file = File::create("notes.json").expect("La création du fichier a échoué");
    let notes_json = serde_json::to_string(&previous_notes).expect("La sérialisation JSON a échoué");
    file.write_all(notes_json.as_bytes())
        .expect("L'écriture dans le fichier a échoué");
}

fn read_notes() -> Result<Vec<Note>, io::Error> {
    let mut file = File::open("notes.json")?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?; // Cette méthode est maintenant disponible avec `std::io::Read`
    let notes: Vec<Note> = serde_json::from_str(&contents)?;
    Ok(notes)
}

#[tauri::command]
fn get_notes() -> Vec<Note> {
    read_notes().unwrap_or_else(|err| {
        eprintln!("Erreur lors de la lecture des notes: {}", err);
        Vec::new()
    })
}


#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, save_note, get_notes])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
