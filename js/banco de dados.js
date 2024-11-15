function validateForm(event) {
  var nome = document.getElementById("inputNome").value;
  var email = document.getElementById("inputEmail").value;
  var senha = document.getElementById("inputPassword").value;
  var valid = true;

  // Impede o envio do formulário
  event.preventDefault();

  if (nome === "") {
    alert("Por favor, insira o nome.");
    valid = false;
  }

  if (email === "" || !validateEmail(email)) {
    alert("Por favor, insira um email válido.");
    valid = false;
  }

  if (senha.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres.");
    valid = false;
  }

  // Se tudo estiver válido, exiba uma mensagem de sucesso e cadastre o usuário
  if (valid) {
    cadastrar(nome, email, senha);
  }
}

// Função para validar o formato do email
function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Função para cadastrar o usuário
async function cadastrar(nome, email, senha) {
  try {
    // Adiciona um novo documento no Firestore
    await addDoc(collection(db, "usuarios"), {
      nomeCad: nome,
      emailCad: email,
      senhaCad: senha,
    });

    alert("Cadastro realizado com sucesso!");

    // Redirecionar após um tempo, se necessário
    setTimeout(() => {
      window.location.href = "Login.html";
    }, 1000);
  } catch (error) {
    console.error("Erro ao cadastrar usuário: ", error);
    alert("Erro ao cadastrar usuário.");
  }
}
