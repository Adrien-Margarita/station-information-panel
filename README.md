# Panneau d'information de gare

Une application React qui affiche les arrivées et départs de trains à partir d’un fichier JSON.

## Fonctionnalités

- Lecture du fichier `trains.json`
- Deux tableaux : arrivées et départs
- Affichage du numéro, provenance/destination, heure, retard
- Tri des trains par heure croissante
- Mise en évidence des trains en retard
- Interface responsive et accessible (Tailwind CSS)

## Stack technique

- **React** (Vite)
- **Tailwind CSS** pour le style
- **JavaScript**

## Installation et lancement

1. **Installer les dépendances**

   ```bash
   npm install
   ```

2. **Lancer le serveur de développement**

   ```bash
   npm run dev
   ```

3. **Ouvrir le navigateur**
   - Aller sur [http://localhost:5173](http://localhost:5173)

## trains.json

Le projet utilise le fichier `trains.json` fourni (dans `public/`).  
Il contient deux tableaux : `arrivees` et `depart`, chacun avec 10 trains.

## Choix techniques

- **React** pour la gestion des composants et de l’état.
- **Tailwind CSS** pour un style rapide et responsive.
- **Pas de backend** : l’application lit le JSON directement depuis le dossier `public/`.

## Fonctionnalités supplémentaires

- Tableaux responsives (scroll horizontal sur mobile)
- Accessibilité (caption, scope sur les th)
- Gestion des états de chargement et d’erreur

**Auteur :** Adrien Margarita

**Test technique développeur Full Stack – ACTEAM-IT**
