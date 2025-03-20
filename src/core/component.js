export class Component {
    constructor(props = {}) {
      this.props = props;
      this.state = {};
      this.element = null;
    }
  
  
    setState(newState) {
      this.state = { ...this.state, ...newState };
      this.render();
    }
  
  
    template() {
      return '';
    }
  
    
    addEventListeners() {}
  
  
    removeEventListeners() {}
  
  
    render(container = this.element?.parentElement) {
      if (!container) return;
  
      // Sauvegarder les écouteurs d'événements existants
      if (this.element) {
        this.removeEventListeners();
      }
  
      // Créer un élément temporaire
      const temp = document.createElement('div');
      temp.innerHTML = this.template();
      
      // Remplacer l'élément existant ou ajouter un nouveau
      if (this.element) {
        container.replaceChild(temp.firstElementChild, this.element);
      } else {
        container.appendChild(temp.firstElementChild);
      }
      
      // Mettre à jour la référence à l'élément
      this.element = container.lastElementChild;
      
      // Ajouter les écouteurs d'événements
      this.addEventListeners();
      
      return this.element;
    }
  
  
    destroy() {
      if (this.element) {
        this.removeEventListeners();
        this.element.remove();
        this.element = null;
      }
    }
  }