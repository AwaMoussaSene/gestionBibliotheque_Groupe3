import { NavBar } from './navBar.js';
import { SideBar } from './siteBar.js';
import { authService } from '../../services/authService.js';

export function Card({ imageUrl, title, description }) {
    const html = `
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <img src="${imageUrl}" alt="${title}" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-800">${title}</h3>
          <p class="text-gray-600 mt-2">${description}</p>
        </div>
      </div>
    `;
  
    return { html };
  }
  