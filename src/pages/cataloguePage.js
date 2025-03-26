import { authService } from '../services/authService.js';
import { routerService } from '../services/routerService.js';
import { Layout } from '../components/layout/layout.js';

export function cataloguePage(container) {
  const user = authService.getCurrentUser();
  
  const contentHtml = `
    <div class="bg-white shadow rounded-lg p-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">
        Catalogue de la Bibliothèque
      </h1>
      <div class="mb-6">
        <input id="search-input" type="text" placeholder="Rechercher un livre..." class="w-full p-2 border border-gray-300 rounded">
      </div>
      
      <div id="catalogue-list" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Les ouvrages seront chargés dynamiquement -->
        <div class="col-span-3 text-center py-10">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p class="mt-2 text-gray-600">Chargement des livres...</p>
        </div>
      </div>
    </div>
  `;
  
  const layout = Layout(contentHtml);
  container.innerHTML = layout.html;
  layout.attachEvents();

  // Chargement des livres depuis l'API
  loadBooks();
  
  // Fonctionnalité de recherche
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      if (searchTerm.length >= 2) {
        loadBooks(searchTerm);
      } else if (searchTerm.length === 0) {
        loadBooks();
      }
    });
  }
}

async function loadBooks(searchTerm = '') {
  const catalogueList = document.getElementById('catalogue-list');
  const API_URL = 'http://localhost:3001';
  
  try {
    let url = `${API_URL}/livres`;
    if (searchTerm) {
      url += `?q=${searchTerm}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des livres');
    }
    
    const livres = await response.json();
    
    // Afficher les livres
    renderBooks(livres, catalogueList);
  } catch (error) {
    console.error('Erreur:', error);
    catalogueList.innerHTML = `
      <div class="col-span-3 text-center py-10">
        <p class="text-red-500">Erreur lors du chargement des livres. Veuillez réessayer plus tard.</p>
      </div>
    `;
  }
}

function renderBooks(livres, container) {
  if (livres.length === 0) {
    container.innerHTML = `
      <div class="col-span-3 text-center py-10">
        <p class="text-gray-500">Aucun livre trouvé</p>
      </div>
    `;
    return;
  }
  
  const booksHtml = livres.map(livre => `
    <div class="bg-white p-4 shadow rounded">
      <h3 class="font-medium text-lg">${livre.titre}</h3>
      <p class="text-gray-600">${livre.auteur}</p>
      <p class="text-sm text-gray-500 mt-2">${livre.categorie}</p>
      <p class="text-xs text-gray-400">ISBN: ${livre.isbn} (${livre.anneePublication})</p>
      <div class="mt-4 flex justify-between items-center">
        <span class="${livre.disponible ? 'text-green-600' : 'text-red-600'} font-medium">
          ${livre.disponible ? 'Disponible' : 'Indisponible'}
        </span>
        <button 
          class="${livre.disponible ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-700 cursor-not-allowed'} px-3 py-1 rounded text-sm"
          data-livre-id="${livre.id}"
          ${!livre.disponible ? 'disabled' : ''}
        >
          Réserver
        </button>
      </div>
    </div>
  `).join('');
  
  container.innerHTML = booksHtml;
  
  // Ajouter les écouteurs d'événements aux boutons de réservation
  document.querySelectorAll('[data-livre-id]').forEach(button => {
    button.addEventListener('click', () => {
      const livreId = button.getAttribute('data-livre-id');
      if (authService.isAuthenticated()) {
        reserverLivre(livreId);
      } else {
        alert('Veuillez vous connecter pour réserver un livre');
        routerService.navigateTo('/login');
      }
    });
  });
}

function reserverLivre(livreId) {
  const user = authService.getCurrentUser();
  if (!user) return;
  
  // Dans une application réelle, cela ferait un appel API pour réserver le livre
  alert(`Livre ID ${livreId} réservé avec succès!`);
}
