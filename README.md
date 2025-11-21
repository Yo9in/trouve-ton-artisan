# 🛠️ Trouve Ton Artisan  
Projet réalisé dans le cadre de ma formation, visant à développer une application web complète permettant de rechercher un artisan selon une catégorie, une spécialité ou un nom.

---

## 🎓 Contexte pédagogique

Ce projet a été développé dans le cadre du module **Développement Web (Front-end & Back-end)**.  
L’objectif principal était de concevoir une application fonctionnelle mettant en pratique :

- la création d’une interface utilisateur professionnelle,
- la gestion d’un backend sécurisé,
- la structuration d’une base de données,
- et l’interaction entre le frontend et une API REST.

Le projet permet de simuler une plateforme régionale de mise en relation entre artisans et utilisateurs.

---

## 🎯 Objectifs pédagogiques

### 🔹 **1. Maîtriser React et la construction d’un front moderne**
- gestion des composants
- navigation avec React Router
- intégration de données reçues d’une API
- utilisation de Bootstrap et SCSS pour le design
- structuration propre d’un projet React

### 🔹 **2. Développer une API complète en Node / Express**
- définition de routes REST
- structuration du code backend
- gestion des erreurs et réponses JSON
- mise en place d’un serveur sécurisé

### 🔹 **3. Manipuler une base de données relationnelle**
- création d’un schéma de données
- relations via un ORM (Sequelize)
- requêtes SQL via modèles
- gestion des migrations (si activées)

### 🔹 **4. Gérer la communication front ↔ API**
- appels fetch
- gestion des états (loading, errors)
- filtres via paramètres d’URL
- récupération des catégories, artisans, détails, etc.

### 🔹 **5. Appliquer des notions essentielles de sécurité web**
- validation des données
- limites CORS
- prévention des injections SQL via Sequelize
- gestion des erreurs backend
- veille régulière sur les vulnérabilités (npm audit)

---

## ✨ Fonctionnalités principales

- ✔️ Page d’accueil avec étapes explicatives  
- ✔️ Catégories dynamiques (Bâtiment, Fabrication, Services, Alimentation)  
- ✔️ Recherche d’artisans via `?q=`  
- ✔️ Filtrage par catégorie via `?categorie=`  
- ✔️ Liste des artisans en cartes  
- ✔️ Fiche artisan complète (note, spécialité, ville, contact, photo)  
- ✔️ Formulaire de contact  
- ✔️ Page 404 personnalisée  
- ✔️ Header / Footer communs  
- ✔️ Design basé sur la charte graphique fournie (police Graphik + palette couleurs)

---

## 🔧 Prérequis

Avant d'installer le projet, vous devez avoir :

- **Node.js (version ≥ 16)**  
- **MySQL ou MariaDB** (pour la base de données)  
- **Git** (pour cloner le projet)

---

## ▶️ Installation

Cloner le dépôt :

```bash
git clone https://github.com/TON-UTILISATEUR/trouve-ton-artisan.git
cd trouve-ton-artisan
