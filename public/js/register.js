const avatarInput = document.querySelector('#avatar');
const avatarLabel = document.querySelector('.file-upload label');
const reader = new FileReader();
reader.addEventListener('load', (e) => {
  avatarLabel.style.backgroundImage = `url(${e.target.result})`;
});

avatarInput.addEventListener('change', (e) => {
  reader.readAsDataURL(e.target.files[0]);
  avatarLabel.style.setProperty('--plus', ' ');
  avatarLabel.style.setProperty('--avatar', ' ');
});
