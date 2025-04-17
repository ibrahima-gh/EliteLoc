# EliteLoc

## Présentation du Projet

EliteLoc est une plateforme de location de voitures en ligne, conçue pour offrir une expérience simple, rapide et sécurisée aux utilisateurs. Ce projet a été réalisé en groupe dans le cadre d'un projet Fil Rouge, avec pour objectif de mettre en pratique des compétences en développement web fullstack.

L'application permet aux utilisateurs de :
- Créer un compte et confirmer leur email
- Se connecter à leur espace personnel
- Parcourir les véhicules disponibles
- Effectuer des réservations
- Gérer leur profil et consulter leurs informations

## Technologies Utilisées

### Frontend
- **Vue.js 3** : Framework JavaScript progressif pour construire des interfaces utilisateur
- **Vue Router 4** : Routeur officiel pour la navigation dans l'application Vue
- **Tailwind CSS** : Framework CSS utilitaire pour un développement rapide et responsive
- **Axios** : Client HTTP pour effectuer des requêtes vers le backend

### Backend
- **Node.js** : Environnement d'exécution JavaScript côté serveur
- **Express** : Framework web minimaliste pour Node.js
- **Supabase** : Solution backend open source basée sur PostgreSQL (authentification, base de données)
- **JWT** : JSON Web Tokens pour l'authentification sécurisée

## Installation et Configuration

### Prérequis
- Node.js (version recommandée : 16.x ou supérieure)
- npm (gestionnaire de paquets Node.js)
- Git

### Étapes d'installation

1. Clonez le dépôt GitHub :
```bash
git clone https://github.com/ibrahima-gh/EliteLoc.git
cd EliteLoc
```

2. Installation des dépendances frontend :
```bash
npm install
```

3. Installation des dépendances backend :
```bash
cd eliteloc-backend
npm install
cd ..
```

4. Configuration des variables d'environnement :
   Créez un fichier `.env` dans le dossier `eliteloc-backend` avec les variables suivantes :
```ini
SUPABASE_URL=https://qxxmpgjuarrngnrawrko.supabase.co/
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4eG1wZ2p1YXJybmducmF3cmtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MzM5NzgsImV4cCI6MjA2MDIwOTk3OH0.OSQtJtCSF7UuX2dZg4fqwNoErviKz0IWkBMKTnBY5GI
PORT=3000
```

> **Note importante** : Les clés Supabase fournies ci-dessus sont liées à un projet de démonstration et sont partagées uniquement pour faciliter l'installation et les tests. Dans un contexte de production, nous n'aurions pas partager nos clés Supabase publiquement.

### Démarrer l'application

1. Lancer le serveur backend :
```bash
cd eliteloc-backend
node server.js
```

2. Dans un autre terminal, lancer le frontend :
```bash
# Depuis la racine du projet
npm run dev
```

3. Accédez à l'application dans votre navigateur à l'adresse indiquée (généralement http://localhost:5173)

## Structure du Projet

L'application est divisée en deux parties principales :

- **Frontend** : Application Vue.js dans le dossier racine
- **Backend** : API Express.js dans le dossier `eliteloc-backend`

## Fonctionnalités Principales

- **Authentification** : Inscription, connexion et confirmation d'email
- **Catalogue de véhicules** : Affichage et filtrage des voitures disponibles
- **Système de réservation** : Processus de location de véhicules
- **Gestion de compte** : Profil utilisateur et historique des réservations
- **Interface administrateur** : Gestion des véhicules et des réservations

## Sécurité

- Authentification via Supabase avec JWT
- Confirmation d'email obligatoire
- Hachage sécurisé des mots de passe
- Protection des routes sensibles
