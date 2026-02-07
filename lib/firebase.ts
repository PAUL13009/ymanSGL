import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'
import { firebaseConfig } from './firebase-config'

// Initialiser Firebase (une seule fois)
let app: FirebaseApp
let db: Firestore

try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }
  db = getFirestore(app)
} catch (error) {
  console.error('Error initializing Firebase:', error)
  // Si erreur, essayer de récupérer une app existante
  if (getApps().length > 0) {
    app = getApps()[0]
    db = getFirestore(app)
  } else {
    // Dernier recours : réinitialiser avec la config
    app = initializeApp(firebaseConfig)
    db = getFirestore(app)
  }
}

export { db }
export default app
