const select = (e) => document.querySelector(e);

select('.entrar-conta-btn').addEventListener('click', () => {
  //user
  let user = select('#name-ipt').value;
  let userInput = select('#name-ipt');
  //password
  let password = select('#password-ipt').value;
  let passwordInput= select('#password-ipt');
  //confirmpassword
  let confirmPassword = select('#confirm-password-ipt').value;
  let confirmPasswordInput = select('#confirm-password-ipt');
  //classe alerta
  let alert = select('.alerta');

  if (user == '' || password == '' || confirmPassword == '') {
    userInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';

    alert.style.display = 'flex';
    alert.textContent = 'Preencha os campos vazios!';
  } else if (password !== confirmPassword) {
    passwordInput.value = '';
    confirmPasswordInput.value = '';
    alert.style.display = 'flex';
    alert.textContent = 'As senhas não se coincidem!'
  } else {
    window.location.href = '../index.html'
  }
});

document.addEventListener('DOMContentLoaded', function() {
  select('#mostrar-senha').addEventListener('change', function() {
    let passwordInput= select('#password-ipt');
    let confirmPasswordInput = select('#confirm-password-ipt');
    if (this.checked) {
      passwordInput.type = 'text';
      confirmPasswordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
      confirmPasswordInput.type = 'password';
    }
  });
});