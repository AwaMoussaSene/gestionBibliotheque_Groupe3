import { authService } from '../../services/authService.js';

export function SideBar() {
  const currentUser = authService.getCurrentUser();
   
  if (!currentUser) {
    return {
      html: '',
      attachEvents: () => {}
    };
  }
  
  // Déterminer les liens selon le rôle
  let menuItems = [];
  
  if (currentUser.role === 'admin') {
    menuItems = [
      { route: '/admin', icon: 'fa-home', label: 'Tableau de bord' },
      { route: '/admin/users', icon: 'fa-users', label: 'Utilisateurs' },
      { route: '/admin/stats', icon: 'fa-chart-line', label: 'Statistiques' },
      { route: '/admin/settings', icon: 'fa-cog', label: 'Paramètres' }
    ];
  } else if (currentUser.role === 'bibliothecaire') {
    menuItems = [
      { route: '/bibliothecaire', icon: 'fa-home', label: 'Tableau de bord' },
      { route: '/bibliothecaire/prets', icon: 'fa-book', label: 'Prêts' },
      { route: '/bibliothecaire/livres', icon: 'fa-list', label: 'Livres' },
      { route: '/bibliothecaire/demandes', icon: 'fa-bell', label: 'Demandes' }
    ];
  } else {
    menuItems = [
      { route: '/abonne', icon: 'fa-home', label: 'Mon espace' },
      { route: '/abonne/prets', icon: 'fa-book', label: 'Mes prêts' },
      { route: '/abonne/reservations', icon: 'fa-bookmark', label: 'Mes réservations' }
    ];
  }
  
  const menuItemsHtml = menuItems.map(item => `
    <a href="#" data-route="${item.route}" class="flex items-center px-4 py-3 hover:bg-gray-700 rounded-lg my-1">
      <span class="mr-3">📌</span>
      <span>${item.label}</span>
    </a>
  `).join('');
  
  const html = `
    <aside class="w-64 bg-gray-800 text-white hidden md:block">
      <div class="h-screen p-4">
        <div class="flex flex-col">
          <div class="mb-6 pt-3">
            <div class="px-4 py-3 bg-gray-700 rounded-lg">
              <div class="font-bold">${currentUser.prenom} ${currentUser.nom}</div>
              <div class="text-sm opacity-80">${currentUser.role}</div>
            </div>
          </div>
          <nav>
            ${menuItemsHtml}
          </nav>
        </div>
      </div>
    </aside>
  `;
  
  return {
    html,
    attachEvents: () => {}
  };
}
