import { authService } from '../../services/authService.js';
import { routerService } from '../../services/routerService.js';

export function NavBar() {
  const currentUser = authService.getCurrentUser();
  
  const html = `
    <nav class="bg-indigo-600 text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <span class="text-xl font-bold">BiblioTech</span>
            </div>
            <div class="hidden md:ml-6 md:flex md:space-x-8">
              <a href="#" data-route="/" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Accueil</a>
              <a href="#" data-route="/catalogue" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Catalogue</a>
              ${currentUser && currentUser.role === 'admin' ? 
                `<a href="#" data-route="/admin" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Administration</a>` : ''}
              ${currentUser && currentUser.role === 'bibliothecaire' ? 
                `<a href="#" data-route="/bibliothecaire" class="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Gestion</a>` : ''}
            </div>
          </div>
          <div class="flex items-center">
            ${currentUser ? 
              `<div class="relative mr-4">
                <span class="text-sm mr-2">${currentUser.prenom} ${currentUser.nom} (${currentUser.role})</span>
              </div>
              <button id="logout-btn" class="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                Déconnexion
              </button>` : 
              `<a href="#" data-route="/login" class="px-3 py-1 bg-indigo-500 text-white rounded text-sm hover:bg-indigo-400">
                Connexion
              </a>`
            }
          </div>
        </div>
      </div>
    </nav>
  `;
  
  return {
    html,
    attachEvents: () => {
      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          authService.logout();
          routerService.navigateTo('/login');
        });
      }
    }
  };
}
