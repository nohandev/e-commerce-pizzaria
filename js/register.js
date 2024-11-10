const select = (e) => document.querySelector(e);

select('.criar-conta-btn').addEventListener('click', () => {
  //user
  let user = select('#name-ipt').value;
  let userInput = select('#name-ipt');
  //email
  let email = select('#email-ipt').value;
  let emailInput = select('#email-ipt');
  //password
  let password = select('#password-ipt').value;
  let passwordInput= select('#password-ipt');
  //confirmpassword
  let confirmPassword = select('#confirm-password-ipt').value;
  let confirmPasswordInput = select('#confirm-password-ipt');
  //classe alerta
  let alert = select('.alerta');
  //checkbox dos Termos & Condições
  let checkboxTermos = select('#verificar-termos');

  if (user == '' || email == '' || password == '' || confirmPassword == '') {
    userInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';

    alert.style.display = 'flex';
    alert.textContent = 'Preencha os campos vazios!';
  } else if (password !== confirmPassword) {
    passwordInput.value = '';
    confirmPasswordInput.value = '';
    alert.style.display = 'flex';
    alert.textContent = 'As senhas não se coincidem!'
  } else if (!checkboxTermos.checked) {
    alert.style.display = 'flex';
    alert.textContent = 'Você precisa aceitar os Termos & Condições'
  } else {
    window.location.href = 'login.html'
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