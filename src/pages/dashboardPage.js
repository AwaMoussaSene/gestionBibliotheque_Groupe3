import { authService } from '../services/authService.js';
import { routerService } from '../services/routerService.js';
import { Layout } from '../components/layout/layout.js';

// Dashboard pour admin
export function adminDashboardPage(container) {
  const user = authService.getCurrentUser();
  
  const contentHtml = `
    <div class="bg-white shadow rounded-lg p-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">
        Dashboard Administrateur
      </h1>
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4">Fonctionnalités administrateur</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white p-4 shadow rounded border-l-4 border-blue-500">
            <h3 class="font-medium">Gestion des utilisateurs</h3>
            <p class="text-gray-600">Gérer les comptes utilisateurs</p>
            <div class="mt-3">
              <a href="#" data-route="/admin/users" class="text-blue-500 hover:underline">Gérer →</a>
            </div>
          </div>
          <div class="bg-white p-4 shadow rounded border-l-4 border-green-500">
            <h3 class="font-medium">Statistiques</h3>
            <p class="text-gray-600">Consulter les statistiques</p>
            <div class="mt-3">
              <a href="#" data-route="/admin/stats" class="text-blue-500 hover:underline">Consulter →</a>
            </div>
          </div>
          <div class="bg-white p-4 shadow rounded border-l-4 border-purple-500">
            <h3 class="font-medium">Configuration</h3>
            <p class="text-gray-600">Paramètres système</p>
            <div class="mt-3">
              <a href="#" data-route="/admin/settings" class="text-blue-500 hover:underline">Configurer →</a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-8">
        <h2 class="text-xl font-semibold mb-4">Statistiques rapides</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-indigo-100 p-4 rounded shadow">
            <div class="text-indigo-700 text-2xl font-bold">152</div>
            <div class="text-indigo-600">Utilisateurs actifs</div>
          </div>
          <div class="bg-green-100 p-4 rounded shadow">
            <div class="text-green-700 text-2xl font-bold">86</div>
            <div class="text-green-600">Prêts en cours</div>
          </div>
          <div class="bg-yellow-100 p-4 rounded shadow">
            <div class="text-yellow-700 text-2xl font-bold">23</div>
            <div class="text-yellow-600">Réservations</div>
          </div>
          <div class="bg-red-100 p-4 rounded shadow">
            <div class="text-red-700 text-2xl font-bold">7</div>
            <div class="text-red-600">Retards</div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  const layout = Layout(contentHtml);
  container.innerHTML = layout.html;
  layout.attachEvents();
}

// Dashboard pour bibliothécaire
export function bibliothecaireDashboardPage(container) {
  const user = authService.getCurrentUser();
  
  const contentHtml = `
    <div class="bg-white shadow rounded-lg p-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">
        Dashboard Bibliothécaire
      </h1>
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-4">Fonctionnalités bibliothécaire</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white p-4 shadow rounded border-l-4 border-blue-500">
            <h3 class="font-medium">Gestion des prêts</h3>
            <p class="text-gray-600">Gérer les prêts en cours</p>
            <div class="mt-3">
              <a href="#" data-route="/bibliothecaire/prets" class="text-blue-500 hover:underline">Gérer →</a>
            </div>
          </div>
          <div class="bg-white p-4 shadow rounded border-l-4 border-green-500">
            <h3 class="font-medium">Catalogue</h3>
            <p class="text-gray-600">Gérer le catalogue</p>
            <div class="mt-3">
              <a href="#" data-route="/bibliothecaire/livres" class="text-blue-500 hover:underline">Gérer →</a>
            </div>
          </div>
          <div class="bg-white p-4 shadow rounded border-l-4 border-purple-500">
            <h3 class="font-medium">Demandes</h3>
            <p class="text-gray-600">Gérer les demandes</p>
            <div class="mt-3">
              <a href="#" data-route="/bibliothecaire/demandes" class="text-blue-500 hover:underline">Gérer →</a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-8">
        <h2 class="text-xl font-semibold mb-4">Activités récentes</h2>
        <div class="bg-white shadow overflow-hidden rounded-lg">
          <ul class="divide-y divide-gray-200">
            <li class="p-4 hover:bg-gray-50">
              <div class="flex items-center space-x-4">
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">Retour du livre "1984" par Jean Martin</p>
                  <p class="text-sm text-gray-500">Il y a 10 minutes</p>
                </div>
              </div>
            </li>
            <li class="p-4 hover:bg-gray-50">
              <div class="flex items-center space-x-4">
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">Emprunt du livre "Harry Potter" par Sophie Dubois</p>
                  <p class="text-sm text-gray-500">Il y a 45 minutes</p>
                </div>
              </div>
            </li>
            <li class="p-4 hover:bg-gray-50">
              <div class="flex items-center space-x-4">
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">Nouvelle réservation pour "L'Étranger"</p>
                  <p class="text-sm text-gray-500">Il y a 2 heures</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `;
  
  const layout = Layout(contentHtml);
  container.innerHTML = layout.html;
  layout.attachEvents();
}
