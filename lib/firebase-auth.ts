import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User,
  Auth
} from 'firebase/auth'
import app from './firebase'

// Obtenir l'instance d'authentification avec gestion d'erreur
let authInstance: ReturnType<typeof getAuth> | null = null

// Obtenir l'instance d'authentification
try {
  if (!app) {
    throw new Error('Firebase app not initialized')
  }
  authInstance = getAuth(app)
} catch (error) {
  console.error('Error initializing Firebase Auth:', error)
  // Si erreur, essayer quand même
  if (app) {
    try {
      authInstance = getAuth(app)
    } catch (retryError) {
      console.error('Retry failed:', retryError)
    }
  }
}

// Vérifier que l'instance est valide
if (!authInstance) {
  console.error('Firebase Auth instance is null — attempting fallback')
  try {
    authInstance = getAuth(app)
  } catch (e) {
    console.error('Fallback getAuth failed:', e)
  }
}

export const auth = authInstance!

// Interface pour l'utilisateur Firebase (similaire à Supabase User)
export interface FirebaseUser {
  uid: string
  email: string | null
  emailVerified: boolean
}

// Convertir Firebase User en format similaire à Supabase User
export const convertFirebaseUser = (user: User | null): FirebaseUser | null => {
  if (!user) return null
  
  return {
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified
  }
}

// Connexion avec email et mot de passe
export const signInAdmin = async (email: string, password: string): Promise<FirebaseUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = convertFirebaseUser(userCredential.user)
    if (!user) {
      throw new Error('Erreur lors de la conversion de l\'utilisateur')
    }
    return user
  } catch (error: any) {
    console.error('Erreur de connexion:', error)
    throw error
  }
}

// Déconnexion
export const signOutAdmin = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error: any) {
    console.error('Erreur de déconnexion:', error)
    throw error
  }
}

// Obtenir l'utilisateur actuel
export const getCurrentUser = (): User | null => {
  return auth.currentUser
}

// Obtenir l'utilisateur actuel (format converti)
export const getCurrentUserConverted = (): FirebaseUser | null => {
  return convertFirebaseUser(auth.currentUser)
}

// Écouter les changements d'état d'authentification
export const onAuthStateChange = (
  callback: (user: FirebaseUser | null) => void
): (() => void) => {
  try {
    return onAuthStateChanged(auth, (user) => {
      callback(convertFirebaseUser(user))
    })
  } catch (error) {
    console.error('onAuthStateChange error:', error)
    // Retourner un noop unsubscribe pour éviter les crashs
    return () => {}
  }
}

// Attendre que l'authentification soit initialisée (avec timeout)
export const waitForAuthInit = (): Promise<FirebaseUser | null> => {
  return new Promise((resolve) => {
    // Timeout de sécurité pour éviter un chargement infini
    const timeout = setTimeout(() => {
      console.warn('waitForAuthInit: timeout atteint (10s), résolution avec null')
      resolve(null)
    }, 10000)

    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        clearTimeout(timeout)
        unsubscribe()
        resolve(convertFirebaseUser(user))
      })
    } catch (error) {
      clearTimeout(timeout)
      console.error('waitForAuthInit error:', error)
      resolve(null)
    }
  })
}

// Vérifier si l'utilisateur est connecté
export const isAuthenticated = (): boolean => {
  return auth.currentUser !== null
}
