import { NavBar } from './navBar.js';
import { SideBar } from './siteBar.js';
import { authService } from '../../services/authService.js';

export function Pagination(currentPage, totalPages) {
    const createPageButton = (page, isActive) => `
      <button 
        class="px-3 py-1 border rounded ${isActive ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700'}"
        data-page="${page}"
      >
        ${page}
      </button>
    `;
  
    let pageButtons = '';
    for (let i = 1; i <= totalPages; i++) {
      pageButtons += createPageButton(i, i === currentPage);
    }
  
    const html = `
      <div class="flex justify-center space-x-2 mt-6">
        ${pageButtons}
      </div>
    `;
  
    return {
      html
    };
  }
  