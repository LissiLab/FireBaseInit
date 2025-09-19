# FireBaseInit

Ce module permet d’initialiser un projet **Firebase** et de préparer les ressources nécessaires au bon fonctionnement des autres modules du projet (authentification, base de données Firestore, règles de sécurité, etc.).

---

## 1. Créer un projet Firebase

1. Connectez-vous à la [console Firebase](https://console.firebase.google.com/).  
2. Cliquez sur **Ajouter un projet**.  
3. Donnez un nom à votre projet (par exemple : `WORDE`).  
4. Suivez les étapes de configuration (l’Analytics peut être activé ou non selon vos besoins).  
5. Une fois le projet créé, vous aurez accès à son tableau de bord.  

---

## 2. Récupérer une clé d’accès au service (Service Account Key)

Cette clé permettra à vos applications **serveur** (backend ou scripts Node.js) d’accéder à Firebase/Firestore avec les permissions adéquates.

1. Dans la console Firebase, ouvrez **Paramètres du projet** (⚙️ à côté du nom du projet).  
2. Dans la barre latérale, allez dans **Utilisateurs et autorisations**.  
3. Cliquez sur **Paramètres avancés des autorisations** → cela ouvre **IAM & Admin** dans Google Cloud Console.  
4. Dans la barre latérale de Google Cloud, allez dans **Comptes de service**.  
5. Cliquez sur **Créer un compte de service**.  
   - Donnez un nom clair (par ex. : `worde-service-account`).  
   - Assignez-lui le rôle **Propriétaire (Owner)** pour simplifier la configuration initiale.  
6. Une fois le compte créé, cliquez sur son **nom** pour l’ouvrir.  
7. Allez dans l’onglet **Clés**.  
8. Cliquez sur **Ajouter une clé** → **Créer une nouvelle clé** → sélectionnez **JSON**.  
9. Téléchargez le fichier généré et placez-le à la racine de ce projet sous le nom : ```serviceAccountKey.json```

⚠️ **Ne partagez jamais ce fichier publiquement** (il donne un accès complet à vos ressources Firebase).  

---

## 3. Initialiser Firestore (création des collections)

Ce module fournit un script permettant de créer automatiquement les collections Firestore nécessaires pour le projet [WORDE](https://github.com/BUT-INFO-UPEC/SAE5-A-25-01-WORDE).

1. Vérifiez que le fichier `serviceAccountKey.json` est bien présent à la racine du projet.  
2. Installez les dépendances si ce n’est pas déjà fait :  
```bash
npm install
```
3. Lancez l’initialisation :
```bash
node index.js
```