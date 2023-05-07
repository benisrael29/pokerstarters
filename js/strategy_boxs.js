const toggleButtons = document.querySelectorAll('.toggle-button');

toggleButtons.forEach(button => {
  button.addEventListener('click', () => {
    const toggleableContent = button.parentElement.parentElement.querySelector('.toggleable-content');
    toggleableContent.classList.toggle('collapsed');
    button.classList.toggle('collapsed');
  });
});