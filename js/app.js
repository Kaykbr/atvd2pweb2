// Variáveis
let currentInput = document.querySelector('.currentInput');
let answerScreen = document.querySelector('.answerScreen');
let historyScreen = document.querySelector('.historyScreen');
let buttons = document.querySelectorAll('button');
let erasebtn = document.querySelector('#erase');
let clearbtn = document.querySelector('#clear');
let evaluate = document.querySelector('#evaluate');

// Histórico de resultados limitado a 3 entradas
let history = [];
const maxHistoryEntries = 3;
let realTimeScreenValue = '';

// Função para atualizar o visor de resposta
function updateAnswerScreen() {
    try {
        answerScreen.innerHTML = eval(realTimeScreenValue);
    } catch (error) {
        answerScreen.innerHTML = '';
    }
}

// Atualiza o histórico na tela
function updateHistoryScreen() {
    historyScreen.innerHTML = history.join('<br>');
}

// Limpar
clearbtn.addEventListener("click", () => {
    realTimeScreenValue = '';
    updateAnswerScreen();
    currentInput.className = 'currentInput';
    answerScreen.className = 'answerScreen';
    answerScreen.style.color = "rgba(150, 150, 150, 0.87)";
});

// Botão de apagar (remover o último caractere)
erasebtn.addEventListener("click", () => {
    realTimeScreenValue = realTimeScreenValue.slice(0, -1); // Remove o último caractere
    currentInput.innerHTML = realTimeScreenValue;
    updateAnswerScreen();
});


// Função para realizar cálculo e registrar no histórico
function performCalculation() {
    try {
        const result = eval(realTimeScreenValue);
        const operation = `${realTimeScreenValue} = ${result}`;
        history.push(operation);

        // Limita o histórico a 5 entradas
        if (history.length > maxHistoryEntries) {
            history.shift(); // Remove a operação mais antiga
        }

        realTimeScreenValue = String(result);
        updateAnswerScreen();
        updateHistoryScreen();
    } catch (error) {
        answerScreen.innerHTML = '';
    }
}

// Botão de avaliação (=)
evaluate.addEventListener("click", () => {
    performCalculation();
});

// Função anexada a todos os botões
buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (!btn.id.match('erase')) {
            // Mostrar o valor do botão pressionado
            realTimeScreenValue += btn.value;
            currentInput.innerHTML = realTimeScreenValue;
            updateAnswerScreen();
        }
    });
});
