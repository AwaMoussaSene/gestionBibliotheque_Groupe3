import { NavBar } from './navBar.js';
import { SideBar } from './siteBar.js';
import { authService } from '../../services/authService.js';

export function Layout(contentHtml) {
  const currentUser = authService.getCurrentUser();
  const navbar = NavBar();
  const sidebar = SideBar();
  const showSidebar = currentUser && (currentUser.role === 'admin' || currentUser.role === 'bibliothecaire');
  
  const html = `
    <div class="min-h-screen bg-gray-100 flex flex-col">
      ${navbar.html}
      <div class="flex flex-1">
        ${showSidebar ? sidebar.html : ''}
        <main class="flex-1 p-6">
          <div class="max-w-7xl mx-auto">
            ${contentHtml}
          </div>
        </main>
      </div>
    </div>
  `;
  
  return {
    html,
    attachEvents: () => {
      navbar.attachEvents();
      if (showSidebar) {
        sidebar.attachEvents();
      }
    }
  };
}
