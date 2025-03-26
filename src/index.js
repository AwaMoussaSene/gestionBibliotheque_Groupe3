import { routerService } from './services/routerService.js';
import { loginPage } from './pages/loginPage.js';
import { adminDashboardPage, bibliothecaireDashboardPage } from './pages/dashboardPage.js';
import { cataloguePage } from './pages/cataloguePage.js';
import { authService } from './services/authService.js';

// Initialisation du routeur
document.addEventListener('DOMContentLoaded', () => {
  // Initialiser le routeur avec l'élément conteneur
  routerService.init('app-content');
  
  // Enregistrer les routes
  routerService
    .register('/login', loginPage)
    .register('/admin', adminDashboardPage, true, ['admin'])
    .register('/bibliothecaire', bibliothecaireDashboardPage, true, ['bibliothecaire'])
    .register('/catalogue', cataloguePage)
    .register('/', (container) => {
      // Redirection basée sur l'authentification et le rôle
      const currentUser = authService.getCurrentUser();
      
      if (!currentUser) {
        // Si non connecté, rediriger vers la page de catalogue (publique)
        cataloguePage(container);
      } else {
        // Sinon rediriger selon le rôle
        switch (currentUser.role) {
          case 'admin':
            adminDashboardPage(container);
            break;
          case 'bibliothecaire':
            bibliothecaireDashboardPage(container);
            break;
          default:
            cataloguePage(container);
        }
      }
    })
    .setDefaultRoute('/');
  
  // Gérer la route initiale
  routerService.handleRoute();
});

console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyy");
