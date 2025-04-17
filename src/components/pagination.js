import { authService } from '../services/authService.js';
import { routerService } from '../services/routerService.js';
import { NavBar } from '../components/layout/navBar.js';

export function Pagination(totalPages = 3, initialPage = 1) {
    let currentPage = initialPage;

    const paginationHtml = `
        <div id="pagination" class="flex gap-2 justify-center my-4">
            ${renderButtons()}
        </div>
    `;

    function renderButtons() {
        let html = `
            <button id="prevBtn" class="border px-3 py-1 rounded ${currentPage === 1 ? 'opacity-50 cursor-default' : ''}">◀</button>
        `;

        for (let i = 1; i <= totalPages; i++) {
            html += `
                <button 
                    class="border px-3 py-1 rounded ${i === currentPage ? 'bg-blue-600 text-white' : ''}" 
                    data-page="${i}">
                    ${i}
                </button>
            `;
        }

        html += `
            <button id="nextBtn" class="border px-3 py-1 rounded ${currentPage === totalPages ? 'opacity-50 cursor-default' : ''}">▶</button>
        `;

        return html;
    }

    function attachEvents(containerId, onPageChange = () => {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = paginationHtml;
        updateListeners();

        function updateListeners() {
            // Numéros de page
            container.querySelectorAll("[data-page]").forEach(btn => {
                btn.addEventListener("click", () => {
                    currentPage = parseInt(btn.getAttribute("data-page"));
                    container.innerHTML = `<div id="pagination" class="flex gap-2 justify-center my-4">${renderButtons()}</div>`;
                    updateListeners();
                    onPageChange(currentPage);
                });
            });

            // Précédent
            container.querySelector("#prevBtn")?.addEventListener("click", () => {
                if (currentPage > 1) {
                    currentPage--;
                    container.innerHTML = `<div id="pagination" class="flex gap-2 justify-center my-4">${renderButtons()}</div>`;
                    updateListeners();
                    onPageChange(currentPage);
                }
            });

            // Suivant
            container.querySelector("#nextBtn")?.addEventListener("click", () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    container.innerHTML = `<div id="pagination" class="flex gap-2 justify-center my-4">${renderButtons()}</div>`;
                    updateListeners();
                    onPageChange(currentPage);
                }
            });
        }
    }

    return { paginationHtml, attachEvents };
}
