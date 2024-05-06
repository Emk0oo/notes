# Tauri Notes App

Une application de prise de notes développée avec Tauri et Rust. Cette application vous permet de créer, modifier et supprimer des notes tout en offrant une interface utilisateur simple et intuitive.

## Fonctionnalités

- **Ajouter de nouvelles notes :** Ajoutez de nouvelles notes en fournissant un titre et un contenu.
- **Modifier les notes existantes :** Modifiez le titre et le contenu de n'importe quelle note existante.
- **Supprimer des notes :** Supprimez les notes de la base de données.
- **Afficher toutes les notes :** Affichez toutes les notes enregistrées avec leur titre et leur contenu.

## Technologies utilisées

- **Tauri :** Framework multiplateforme pour créer des applications de bureau natives.
- **Rust :** Langage de programmation système moderne.
- **Rusqlite :** Wrapper SQLite pour Rust, afin de gérer le stockage persistant.
- **HTML/CSS/JavaScript :** Conception et comportement du frontend pour l'interface utilisateur.

## Prise en main

### Prérequis

- Langage de programmation Rust : [Installer Rust](https://www.rust-lang.org/tools/install)
- Prérequis pour Tauri : [Vérifier la configuration Tauri](https://tauri.app/v1/guides/getting-started/prerequisites)

### Installation

1. Clonez ce dépôt.
2. Installez les dépendances :
   ```bash
   cargo install tauri-cli
3. Lancer l'app :
   ```bash
   cd notes
   cargo tauri dev

### Utilisation

1. **Lancez l'application :** L'écran principal intitulé "Notes" s'ouvrira.

#### Ajouter une note

1. Naviguez vers la section "Ajouter une note".
2. Entrez un titre dans le champ "Titre" et un contenu dans le champ "Contenu".
3. Cliquez sur le bouton "Ajouter une note" pour enregistrer la note.
4. La nouvelle note apparaîtra dans la section "Mes notes enregistrées".

#### Modifier une note

1. Trouvez la note que vous souhaitez modifier dans la section "Mes notes enregistrées".
2. Cliquez sur le bouton "Editer" à côté de cette note.
3. Le titre et le contenu de la note apparaîtront dans la section "Editer la note".
4. Modifiez le titre et le contenu comme souhaité.
5. Cliquez sur "Enregistrer" pour sauvegarder les modifications.

#### Supprimer une note

1. Trouvez la note que vous souhaitez supprimer dans la section "Mes notes enregistrées".
2. Cliquez sur le bouton "Supprimer" à côté de cette note.
3. La note sera définitivement supprimée de la base de données.

