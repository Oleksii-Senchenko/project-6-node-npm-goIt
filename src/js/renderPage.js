import refs from './refs';

export function renderPage(items) {
  const markup = items
    .map(el => {
      return `
        <li>
        <span class="text${el.done ? 'done' : ''}">${el.text}</span>
        <div>
          <button type="button" data-id="${
            el.id
          }" class="delete">Видалити</button>
          
        </div>
        </li>
      `;
    })
    .join('');

  refs.listEl.innerHTML = markup;
}
