let totalQuestions = 0;
let totalCorrect = 0;
let totalWrong = 0;
const maxAttempts = 5;

// Banco de perguntas e respostas
const questionBank = [
    {
        question: "Qual figura de linguagem é usada na frase: 'Ela chorou rios de lágrimas'?",
        answers: [
            { text: "Metáfora", correct: false },
            { text: "Hipérbole", correct: true },
            { text: "Metonímia", correct: false }
        ]
    },
    {
        question: "Qual figura de linguagem é usada na frase: 'O vento cantava uma melodia triste'?",
        answers: [
            { text: "Personificação", correct: true },
            { text: "Antítese", correct: false },
            { text: "Paradoxo", correct: false }
        ]
    },
    {
        question: "Qual figura de linguagem é usada na frase: 'Ela é tão bela quanto a lua'?",
        answers: [
            { text: "Comparação", correct: true },
            { text: "Ironia", correct: false },
            { text: "Eufemismo", correct: false }
        ]
    },
    {
        question: "Qual figura de linguagem é usada na frase: 'É um doce dizer que ela partiu'?",
        answers: [
            { text: "Eufemismo", correct: true },
            { text: "Hipérbole", correct: false },
            { text: "Paradoxo", correct: false }
        ]
    },
    {
        question: "Qual figura de linguagem é usada na frase: 'A paz armada'?",
        answers: [
            { text: "Antítese", correct: true },
            { text: "Ironia", correct: false },
            { text: "Comparação", correct: false }
        ]
    },
    // Adicione mais perguntas conforme necessário
];

// Seleção de elementos
const submitBtn = document.getElementById('submitBtn');
const nextBtn = document.getElementById('nextBtn');
const backBtn = document.getElementById('backBtn');
const questionsContainer = document.getElementById('questionsContainer');
const resultDiv = document.getElementById('result');
const finalResultDiv = document.getElementById('finalResult');

// Event Listeners
submitBtn.addEventListener('click', submitQuiz);
nextBtn.addEventListener('click', loadNextQuestions);
backBtn.addEventListener('click', () => {
    window.location.href = 'questões4.html'; // Redireciona para a nova página
});

// Função para embaralhar as perguntas
function shuffle(array) {
    for (let i = array.length -1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para carregar perguntas
let currentQuestions = [];
function loadQuestions() {
    questionsContainer.innerHTML = '';
    const shuffledQuestions = shuffle([...questionBank]);
    currentQuestions = shuffledQuestions.slice(0, 3); // Seleciona 3 perguntas aleatórias

    currentQuestions.forEach((q, index) => {
        let questionHTML = `<div class="question"><p>${index + 1}. ${q.question}</p>`;
        shuffle(q.answers).forEach(answer => { // Embaralha as respostas
            questionHTML += `<label><input type="radio" name="q${index}" value="${answer.text}"> ${answer.text}</label>`;
        });
        questionHTML += `</div>`;
        questionsContainer.innerHTML += questionHTML;
    });
}

// Função para submeter o quiz
function submitQuiz() {
    const form = document.getElementById("quizForm");
    const formData = new FormData(form);
    let resultHTML = "";
    let score = 0;

    currentQuestions.forEach((q, index) => {
        const correctAnswer = q.answers.find(answer => answer.correct).text;
        const userAnswer = formData.get(`q${index}`);
        
        if (userAnswer === correctAnswer) {
            resultHTML += `<p class='correct'>${index + 1}. Você acertou! (${correctAnswer})</p>`;
            score++;
        } else if (userAnswer) {
            resultHTML += `<p class='incorrect'>${index + 1}. Você errou. Resposta correta: ${correctAnswer}</p>`;
        } else {
            resultHTML += `<p class='incorrect'>${index + 1}. Não respondeu. Resposta correta: ${correctAnswer}</p>`;
        }
    });

    totalQuestions++;
    totalCorrect += score;
    totalWrong += (currentQuestions.length - score);

    resultDiv.innerHTML = `<h2>Resultado: ${score} de ${currentQuestions.length}</h2>` + resultHTML;
    resultDiv.classList.remove("hidden");
    resultDiv.classList.add("show");

    // Esconde o botão "Pronto" e mostra o botão "Próximo"
    submitBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');

    // Verifica se atingiu o número máximo de tentativas
    if (totalQuestions >= maxAttempts) {
        finalResultDiv.innerHTML = `<h2>Total de acertos: ${totalCorrect} | Total de erros: ${totalWrong}</h2>`;
        finalResultDiv.classList.remove("hidden");
        nextBtn.classList.add('hidden');
    }
}

// Função para carregar a próxima tentativa
function loadNextQuestions() {
    // Limpa o formulário e os resultados
    document.getElementById('quizForm').reset();
    resultDiv.classList.add('hidden');
    resultDiv.classList.remove('show');
    finalResultDiv.classList.add('hidden');
    nextBtn.classList.add('hidden');
    submitBtn.classList.remove('hidden');

    // Carrega novas perguntas
    loadQuestions();
}

// Carrega perguntas ao iniciar
window.onload = loadQuestions;
