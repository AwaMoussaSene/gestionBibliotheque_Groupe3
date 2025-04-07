export function tabHeaders(columns = []) {
    return `
      <thead>
        <tr class="bg-gray-100 text-gray-600 uppercase text-sm">
          <th class="py-3 px-6 text-left">
            <input type="checkbox" class="w-4 h-4 rounded border-2 border-blue-500 accent-blue-500">
          </th>
          ${columns.map(col => `
            <th class="py-3 px-6 text-left">${col.title}${col.sortable ? ' ⬍' : ''}</th>
          `).join('')}
        </tr>
      </thead>
    `;
  }