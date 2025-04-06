import { authService } from '../services/authService.js';
import { routerService } from '../services/routerService.js';
import { NavBar } from '../components/layout/navBar.js';

export function loginPage(container) {
  const navbar = NavBar();
  
  const formHtml = `
    <div class="min-h-screen flex flex-col bg-gray-50">
      ${navbar.html}
      <div class="flex flex-1 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
          <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Connexion à la bibliothèque
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
              Veuillez vous connecter pour accéder à votre espace
            </p>
          </div>
          <form id="login-form" class="mt-8 space-y-6">
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="username" class="sr-only">Nom d'utilisateur</label>
                <input id="username" name="username" type="text" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Nom d'utilisateur">
              </div>
              <div>
                <label for="password" class="sr-only">Mot de passe</label>
                <input id="password" name="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Mot de passe">
              </div>
            </div>

            <div>
              <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Se connecter
              </button>
            </div>
            <div id="error-message" class="text-red-500 text-center hidden"></div>
            
            <div class="mt-4 text-center">
              <p class="text-sm text-gray-600">Utilisateurs de test:</p>
              <div class="grid grid-cols-3 gap-2 mt-2 text-xs">
                <div class="border p-2 rounded">
                  <div class="font-semibold">Admin</div>
                  <div>Username: admin</div>
                  <div>Password: admin123</div>
                </div>
                <div class="border p-2 rounded">
                  <div class="font-semibold">Bibliothécaire</div>
                  <div>Username: bibliothecaire</div>
                  <div>Password: biblio123</div>
                </div>
                <div class="border p-2 rounded">
                  <div class="font-semibold">Abonné</div>
                  <div>Username: abonne</div>
                  <div>Password: abonne123</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = formHtml;
  navbar.attachEvents();

  const form = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
      errorMessage.classList.add('hidden');
      const user = await authService.login(username, password);
      
      // Redirection en fonction du rôle
      if (user.role === 'admin') {
        routerService.navigateTo('/admin');
      } else if (user.role === 'bibliothecaire') {
        routerService.navigateTo('/bibliothecaire');
      } else {
        routerService.navigateTo('/catalogue');
      }
    } catch (error) {
      errorMessage.textContent = error.message || 'Erreur lors de la connexion';
      errorMessage.classList.remove('hidden');
    }
  });
}
