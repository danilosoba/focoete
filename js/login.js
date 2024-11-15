// Validação do formulário
const form = document.querySelector('#loginForm');
const email = document.getElementById('inputEmail');
const password = document.getElementById('inputPassword');

// Validação simples
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors();

    let isValid = true;

    if (!checkInputEmail()) isValid = false;
    if (!checkInputPassword()) isValid = false;

    if (isValid) {
        await loginUser(email.value, password.value);
    }
});

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.innerText = '');
}

function checkInputEmail() {
    const value = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value === "" || !emailPattern.test(value)) {
        erroInput(email, "Digite um email válido.");
        return false;
    }
    return true;
}

function checkInputPassword() {
    const value = password.value.trim();
    if (value === "" || value.length < 6) {
        erroInput(password, "A senha deve ter pelo menos 6 caracteres.");
        return false;
    }
    return true;
}

function erroInput(input, message) {
    const formItem = input.parentElement;
    let errorMessage = formItem.querySelector('.error-message');

    if (!errorMessage) {
        errorMessage = document.createElement('span');
        errorMessage.className = 'error-message';
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '0.8rem';
        errorMessage.style.marginTop = '0.5rem';
        formItem.appendChild(errorMessage);
    }

    errorMessage.innerText = message;
    
}

// Função para fazer o login do usuário
async function loginUser(email, password) {
    const querySnapshot = await getDocs(query(collection(db, "usuarios"), where("emailCad", "==", email)));

    if (querySnapshot.empty) {
        alert("Usuário não encontrado.");
        return;
    }

    querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.senhaCad === password) {
            alert("Login realizado com sucesso!");
            // Redirecionar para a página desejada após o login
            window.location.href = "index.html"; // Altere para a página desejada
        } else {
            alert("Senha incorreta.");
        }
    });
} 
