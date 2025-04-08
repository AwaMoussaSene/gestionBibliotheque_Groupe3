import { tabHeaders } from './tabHeaders.js';
import { tabItem } from './tabItem.js';

export class Table {
  constructor({ title, subtitle, headers, rows, actions = [] }) {
    this.title = title;
    this.subtitle = subtitle;
    this.headers = headers;
    this.rows = rows;
    this.actions = actions;
  }

  renderActionBar() {
    return `
      <div class="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-4">
        <div>
          <h2 class="text-xl font-bold">${this.title} <span class="text-blue-500 text-sm">Simple et direct</span></h2>
          <p class="text-gray-500">${this.subtitle}</p>
        </div>
        <div class="flex space-x-2">
          ${this.actions.map(action => `
            <button class="${action.class}">${action.icon} ${action.text}</button>
          `).join('')}
        </div>
      </div>
    `;
  }

  render() {
    return `
      <div class="p-6 bg-gray-50">
        ${this.renderActionBar()}
        <div class="overflow-x-auto border rounded-lg shadow bg-white">
          <table class="min-w-full border">
            ${tabHeaders(this.headers)}
            <tbody class="text-gray-600 text-sm">
              ${this.rows.map(row => tabItem(row)).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}