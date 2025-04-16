import {NavBar} from '../components/layout/navBar.js';
import {Popup} from "../components/popup";
import {Pagination} from "../components/pagination";

export function test(container) {
    const navbar = NavBar();
    // Composant Pagination
    const pagination = Pagination();
    // Popup pour Détails Livre
    const { pophtml: popupLivre, attachEvents: attLivre } = Popup("livre", {
        titre: "Une Si longue lettre",
        auteur: "Mariama Ba",
        code: "C1234T"
    });
    // Popup pour Ajout Rayon
    const {pophtml: popupRayon, attachEvents: attRayon} = Popup("rayon")
    // Popup pour Confirmation Archivage
    const {pophtml: popupArchive, attachEvents: attArchive} = Popup("archive")

    const html = `
    <div>
        ${navbar.html}
        ${popupLivre}
        ${popupRayon}
        ${popupArchive}
        ${pagination.paginationHtml}
    </div>`;

    container.innerHTML = html;

    navbar.attachEvents();
    attLivre('openLivreModalBtn', 'livreModal');
    attRayon('openRayonModalBtn', 'rayonModal');
    attArchive('openArchiveModalBtn', 'confirmArchiveModal');
}
