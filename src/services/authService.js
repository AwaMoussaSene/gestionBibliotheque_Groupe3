import { User } from '../models/user.js';

class AuthService {
  constructor() {
    this.API_URL = 'http://localhost:3001';
    this.currentUser = null;
  }

  async login(username, password) {
    try {
      const response = await fetch(`${this.API_URL}/users?username=${username}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la connexion');
      }
      
      const users = await response.json();
      
      if (users.length === 0) {
        throw new Error('Utilisateur non trouvé');
      }
      
      const user = users[0];
      
      if (user.password !== password) {
        throw new Error('Mot de passe incorrect');
      }
      
      // Ne pas stocker le mot de passe dans le currentUser
      const authenticatedUser = User.fromJson(user);
      
      // Stocker les informations utilisateur dans le localStorage
      localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
      this.currentUser = authenticatedUser;
      
      return authenticatedUser;
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  getCurrentUser() {
    if (this.currentUser) {
      return this.currentUser;
    }
    
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      return this.currentUser;
    }
    
    return null;
  }

  isAuthenticated() {
    return this.getCurrentUser() !== null;
  }

  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.role === role;
  }
}

// Export en tant que singleton
export const authService = new AuthService(); 