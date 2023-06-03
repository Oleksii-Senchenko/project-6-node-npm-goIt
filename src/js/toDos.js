import refs from './refs';
import localstorageApi from './localstorage';

refs.formEl.addEventListener('submit', onClickSubmit);

const items = [];
const LOCAL_KEY = 'items-to-dos';

function onClickSubmit(ev) {
  ev.preventDefault();

  const input = ev.currentTarget.elements['user-todos'];

  if (input.value.trim() === '') {
    return alert('Todos souldn`t be empty!');
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
}
