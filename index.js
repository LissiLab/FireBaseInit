import fs from 'fs';
import path from 'path';
import readline from 'readline';
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
const collectionsPath = path.join(__dirname, 'collections');

async function importCollections() {
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
}

async function exportCollections() {
	const collections = await db.listCollections();
	for (const collection of collections) {
		const snapshot = await collection.get();
		const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
		const filePath = path.join(collectionsPath, `${collection.id}.json`);
		fs.writeFileSync(filePath, JSON.stringify(docs, null, 2), 'utf8');
		console.log(`📤 Collection '${collection.id}' exportée dans ${filePath}`);
	}
}

function showMenu() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.question('Que voulez-vous faire ? (1: Importer, 2: Exporter) : ', async (answer) => {
		if (answer === '1') {
			console.log('--- Import des collections ---');
			await importCollections();
		} else if (answer === '2') {
			console.log('--- Export des collections ---');
			await exportCollections();
		} else {
			console.log('Choix invalide.');
		}
		rl.close();
	});
}

showMenu();
