import refs from './refs';
import localstorageApi from './localstorage';
import { renderPage } from './renderPage';

refs.formEl.addEventListener('submit', onClickSubmit);
const LOCAL_KEY = 'items-to-dos';
let items = localstorageApi.load(LOCAL_KEY) || [];
renderPage(items);
refs.listEl.addEventListener('click', onClickDeleteBtn);

function onClickSubmit(ev) {
  ev.preventDefault();

  const input = ev.currentTarget.elements['user-todos'];

  if (input.value.trim() === '') {
    return alert('Todos shouldn`t be empty!');
  }

  if (input.value.trim() !== '') {
    const existingItem = items.find(el => el.text === input.value.trim());
    if (existingItem) {
      return alert('This task already is in to dos');
    }
  }

  const toDos = {
    id: Date.now(),
    text: input.value,
  };

  items.push(toDos);

  localstorageApi.save(LOCAL_KEY, items);

  input.value = '';
  renderPage(items);
}

function onClickDeleteBtn(evt) {
  console.log(evt.target.nodeName);
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }
  const todosId = Number(evt.target.dataset.id);
  items = items.filter(el => el.id !== todosId);
  renderPage(items);
  localstorageApi.save(LOCAL_KEY, items);
}
