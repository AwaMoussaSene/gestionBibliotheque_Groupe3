export function tabItem(cells = [], options = {}) {
    return `
      <tr class="border-b border-gray-200 ${options.class || ''}">
        <td class="py-3 px-6">
          <input type="checkbox" class="w-4 h-4 accent-blue-500">
        </td>
        ${cells.map(cell => `
          <td class="py-3 px-6">${cell}</td>
        `).join('')}
      </tr>
    `;
  }