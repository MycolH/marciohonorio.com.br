// Form: input tel - Verifica se o que foi digitado é telefone.
const tel = document.getElementById('form-tel');

function formatarTelefone(valor) {
  const d = valor.replace(/\D/g, '').slice(0, 11); // só números, máx. 11

  if (d.length === 0) return '';
  if (d.length <= 2)  return `(${d}`;
  if (d.length <= 6)  return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validarTelefone() {
  const digitos = tel.value.replace(/\D/g, '');
  if (/^\d{10,11}$/.test(digitos)) {
    tel.setCustomValidity('');
  } else {
    tel.setCustomValidity('Digite um telefone válido com DDD (10 ou 11 números).');
  }
}

tel.addEventListener('input', function () {
  this.value = formatarTelefone(this.value);
  validarTelefone();
});

validarTelefone();


// Avisa os campos com 'required' que estão vazios.
const form = document.querySelector('form.card');
const campos = form.querySelectorAll('input, textarea');

function mostrarErro(campo) {
    let erro = campo.nextElementSibling;
    if (!erro || !erro.classList.contains('erro')) {
        erro = document.createElement('span');
        erro.className = 'erro';
        campo.after(erro);
    }

    if (campo.validity.valid) {
        erro.textContent = '';
        campo.classList.remove('invalido');
    } else {
        erro.textContent = campo.validationMessage;
        campo.classList.add('invalido');
    }
}

form.addEventListener('submit', function (e) {
    let formValido = true;

    campos.forEach(function (campo) {
        mostrarErro(campo);
        if (!campo.validity.valid) formValido = false;
    });

    if (!formValido) {
        e.preventDefault();
        form.querySelector('.invalido').focus();
    }
});

campos.forEach(function (campo) {
    campo.addEventListener('input', function () {
        if (campo.classList.contains('invalido')) mostrarErro(campo);
    });
});