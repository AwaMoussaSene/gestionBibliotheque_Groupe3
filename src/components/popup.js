import { authService } from './../services/authService.js';
import { routerService } from  './../services/routerService.js';


export function Popup(type, options = {}) {
    let pophtml = "";

    if (type === "livre") {
        const { titre, auteur, code } = options;

        pophtml = `
          <button id="openLivreModalBtn" class="bg-blue-500 text-white px-4 py-2 rounded">Voir details livre</button>
    
          <div id="livreModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 hidden">
            <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full relative">
              <button class="absolute top-2 right-2 text-gray-700 text-xl font-bold close-modal">&times;</button>
              <h2 class="text-2xl font-bold mb-6 text-center">Enregistrer un prêt</h2>
              <div class="text-sm font-semibold space-y-2 text-center">
                <p><strong>Titre :</strong> ${titre}</p>
                <p><strong>Auteur :</strong> ${auteur}</p>
                <p><strong>Code :</strong> ${code}</p>
              </div>
              <div class="mt-6 text-center">
                <button class="bg-blue-600 border text-white px-6 py-2 text-xl font-bold shadow-md rounded-md hover:bg-blue-500">
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        `;
    }

    if (type === "rayon") {
        pophtml = `
          <button id="openRayonModalBtn" class="bg-black text-white px-4 py-2 rounded">Ajouter un rayon</button>
    
          <div id="rayonModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 hidden">
            <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
              <h2 class="text-lg font-bold text-center mb-4">Ajouter rayon:</h2>
              <div class="mb-6">
                <label for="rayonInput" class="block mb-2 font-medium">Rayon :</label>
                <input id="rayonInput" type="text" class="w-full border rounded shadow px-3 py-2" />
              </div>
              <div class="flex justify-between">
                <button id="cancelRayonBtn" class="bg-red-500 text-white px-4 py-2 rounded">Annuler</button>
                <button id="submitRayonBtn" class="bg-blue-600 text-white px-4 py-2 rounded">Ajouter</button>
              </div>
              <button class="absolute top-2 right-2 text-gray-700 text-xl font-bold close-modal">&times;</button>
            </div>
          </div>
        `;
    }

    if (type === "archive") {
        pophtml = `
            <button id="openArchiveModalBtn" class="bg-red-500 text-white px-4 py-2 rounded">Archiver</button>
            
            <div id="confirmArchiveModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 hidden">
              <div class="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full relative">
                <button class="absolute top-2 right-2 text-gray-700 text-xl font-bold close-modal">&times;</button>
                <p class="text-center text-lg font-semibold mb-6">Voulez-vous vraiment archiver ce livre</p>
                <div class="flex justify-between">
                  <button class="bg-black text-white px-4 py-2 rounded">Annuler</button>
                  <button class="bg-black text-white px-4 py-2 rounded">Archiver</button>
                </div>
              </div>
            </div>
           `;
    }

    function attachEvents(openBtnId, modalId) {
        const openBtn = document.getElementById(openBtnId);
        const modal = document.getElementById(modalId);
        const closeBtn = modal?.querySelector(".close-modal");

        if (openBtn && modal) {
            openBtn.addEventListener("click", () => {
                modal.classList.remove("hidden");
            });

            if (closeBtn) {
                closeBtn.addEventListener("click", () => {
                    modal.classList.add("hidden");
                });
            }

            modal.addEventListener("click", (e) => {
                if (e.target === modal) {
                    modal.classList.add("hidden");
                }
            });
        }
    }

    return { pophtml, attachEvents };
}
