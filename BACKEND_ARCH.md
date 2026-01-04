# Architecture Backend DESPACIO — "Vibes, not promises"

Ce document définit la structure technique robuste, scalable et sécurisée nécessaire pour soutenir l'expérience premium de DESPACIO.

## 1. Stack Technique Recommandée

*   **Langage/Framework** : **Node.js avec NestJS** (TypeScript). Offre une structure modulaire, une scalabilité native et une excellente gestion des WebSockets.
*   **API Layer** : **GraphQL (Apollo Server)**. Idéal pour le feed de découverte (récupération sélective des données) et les relations complexes (profils/matches).
*   **Temps Réel** : **WebSockets (Socket.io)** pour le chat éphémère et les notifications de "Résonance".
*   **Authentification** : **JWT (JSON Web Tokens)** avec rafraîchissement, sécurisé par des cookies `HttpOnly`.

## 2. Stratégie de Base de Données

*   **PostgreSQL (Primaire)** : Pour les données structurées et relationnelles.
    *   *Profiles* : Données utilisateurs, intentions, préférences.
    *   *Matches/Résonances* : Table pivot pour les connexions.
    *   *Settings* : Préférences de confidentialité et notifications.
*   **Redis (Cache & Temps Réel)** :
    *   *Ephemeral Chat* : Stockage ultra-rapide des messages avec TTL (Time To Live) de 24h.
    *   *Presence* : Statut en ligne/hors ligne.
    *   *Rate Limiting* : Protection contre le spam de swipes/messages.
*   **MinIO / AWS S3** : Stockage des photos de profil (optimisées en WebP via un micro-service).

## 3. Architecture des Services (Modules)

*   **Auth Service** : Inscription, Connexion (Email/Magic Link), Gestion des sessions.
*   **Discovery Engine** : Algorithme de feed basé sur la proximité (PostGIS), les intentions communes et la réciprocité.
*   **Communication Hub** : Gestion des WebSockets, distribution des messages, suppression automatique après 24h.
*   **Moderation Engine** : Pipeline de traitement des signalements, intégration avec l'Admin Back-Office.
*   **Analytics worker** : Agrégation anonymisée des métriques d'engagement (swipes, matches).

## 4. Sécurité & Conformité (RGPD)

*   **Chiffrement** :
    *   Données au repos : AES-256 pour les informations sensibles.
    *   En transit : TLS 1.3 obligatoire.
    *   Mots de passe : Hachage via **Argon2**.
*   **RGPD Compliant** :
    *   *Droit à l'oubli* : Suppression réelle et définitive (pas seulement un flag `is_deleted`) lors de la suppression du compte.
    *   *Portabilité* : API d'exportation des données utilisateur en JSON.
    *   *Minimisation* : Aucune donnée non essentielle collectée (ex: pas de tracking publicitaire tiers).
*   **Confidentialité** : Mode incognito implémenté côté serveur (filtrage des requêtes de découverte).

## 5. Scalabilité & Déploiement

*   **Containerisation** : Docker + Kubernetes pour l'orchestration.
*   **Load Balancing** : Nginx ou Ingress Controller pour répartir la charge.
*   **Horizontal Scaling** : Les services sont stateless, permettant d'ajouter des instances Node.js dynamiquement lors des pics de charge.
*   **CDN** : Cloudflare pour la mise en cache des assets et la protection DDOS.

## 6. Intégration Admin Dashboard

Le backend exposera des endpoints protégés par des rôles (`AdminOnly`) pour :
*   Consommer les logs techniques en temps réel via WebSockets.
*   Manager le pipeline de modération (CRUD sur les signalements).
*   Visualiser les agrégations de métriques via des requêtes optimisées sur les tables d'analytics.
