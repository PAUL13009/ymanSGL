import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Protéger les routes /admin/* sauf /admin/login
  // La vérification réelle de l'authentification se fait côté client dans les pages
  // Le middleware laisse passer et laisse les pages vérifier l'authentification
  // car Supabase stocke la session dans localStorage, pas dans les cookies HTTP
  
  // Si l'utilisateur essaie d'accéder à /admin/login alors qu'il est déjà connecté,
  // on peut le rediriger, mais on laisse les pages gérer la vérification de session
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

