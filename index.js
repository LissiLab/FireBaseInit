import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Setup ESM (__dirname workaround)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Init Firebase Admin
initializeApp({
	credential: cert('./serviceAccountKey.json')
});

const db = getFirestore();

// Path du dossier de collections
const collectionsPath = path.join(__dirname, 'collections');

// Lecture du dossier
fs.readdirSync(collectionsPath).forEach(file => {
	if (file.endsWith('.json')) {
		const collectionName = path.basename(file, '.json');
		const filePath = path.join(collectionsPath, file);
		const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

		const docRef = db.collection(collectionName).doc('EXAMPLE');
		docRef.set(content)
			.then(() => {
				console.log(`✅ Collection '${collectionName}' initialisée avec le document EXAMPLE.`);
			})
			.catch(error => {
				console.error(`❌ Erreur sur '${collectionName}':`, error);
			});
	}
});
