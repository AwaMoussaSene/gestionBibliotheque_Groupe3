import { authService } from './authService.js';

class RouterService {
  constructor() {
    this.contentElement = document.getElementById('app-content');
    this.routes = {};
    this.defaultRoute = '';
    this.protectedRoutes = {};
  }

  init(contentElementId) {
    this.contentElement = document.getElementById(contentElementId);
    window.addEventListener('popstate', () => this.handleRoute());
    
    // Intercepter les clics sur les liens pour les gérer via le routeur
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-route]')) {
        e.preventDefault();
        this.navigateTo(e.target.getAttribute('data-route'));
      }
    });
  }
// 
  register(path, component, requiresAuth = false, allowedRoles = []) {
    this.routes[path] = component;
    
    if (requiresAuth) {
      this.protectedRoutes[path] = { requiresAuth, allowedRoles };
    }
    
    return this;
  }

  setDefaultRoute(path) {
    this.defaultRoute = path;
    return this;
  }

  navigateTo(path) {
    window.history.pushState({}, path, window.location.origin + path);
    this.handleRoute();
  }

  handleRoute() {
    const path = window.location.pathname || this.defaultRoute;
    
    // Vérification d'authentification pour les routes protégées
    if (this.protectedRoutes[path]) {
      const { requiresAuth, allowedRoles } = this.protectedRoutes[path];
      
      if (requiresAuth && !authService.isAuthenticated()) {
        // Rediriger vers la page de connexion
        return this.navigateTo('/login');
      }
      
      if (allowedRoles.length > 0) {
        const currentUser = authService.getCurrentUser();
        if (!currentUser || !allowedRoles.includes(currentUser.role)) {
          // Rediriger vers la page d'accueil appropriée selon le rôle
          return this.redirectBasedOnRole();
        }
      }
    }
    
    const component = this.routes[path] || this.routes[this.defaultRoute];
    
    if (component && this.contentElement) {
      this.contentElement.innerHTML = '';
      component(this.contentElement);
    }
  }

  redirectBasedOnRole() {
    const currentUser = authService.getCurrentUser();
    
    if (!currentUser) {
      return this.navigateTo('/login');
    }
    
    switch (currentUser.role) {
      case 'admin':
        return this.navigateTo('/admin');
      case 'bibliothecaire':
        return this.navigateTo('/bibliothecaire');
      case 'abonne':
        return this.navigateTo('/catalogue');
      default:
        return this.navigateTo('/login');
    }
  }
}

// Export en tant que singleton
export const routerService = new RouterService(); 