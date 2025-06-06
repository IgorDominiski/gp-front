// Dados simulados para demonstração
const cityData = {
    'São Paulo': {
        floodProbability: 65,
        rainfall: [45, 30, 25, 40, 35, 50, 60],
        alertLevel: 'alto',
        description: 'Risco alto de enchentes devido às chuvas intensas dos últimos dias. Mantenha-se alerta e evite áreas de risco.',
        lastUpdate: '2024-03-20 15:30',
        averageRainfall: 43.6
    },
    'Rio de Janeiro': {
        floodProbability: 75,
        rainfall: [55, 40, 35, 50, 45, 60, 70],
        alertLevel: 'crítico',
        description: 'ALERTA CRÍTICO: Chuvas intensas previstas para as próximas horas. Evite áreas de risco e siga as orientações da Defesa Civil.',
        lastUpdate: '2024-03-20 15:30',
        averageRainfall: 50.7
    },
    'Curitiba': {
        floodProbability: 40,
        rainfall: [30, 25, 20, 35, 30, 40, 45],
        alertLevel: 'médio',
        description: 'Risco moderado de enchentes. Mantenha-se informado sobre as condições climáticas.',
        lastUpdate: '2024-03-20 15:30',
        averageRainfall: 32.1
    },
    'Salvador': {
        floodProbability: 55,
        rainfall: [40, 35, 30, 45, 40, 50, 55],
        alertLevel: 'alto',
        description: 'Risco alto de enchentes. Evite áreas baixas e próximas a rios.',
        lastUpdate: '2024-03-20 15:30',
        averageRainfall: 42.1
    }
};

// Função para buscar cidade
function searchCity() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    const resultsSection = document.getElementById('resultados');
    
    if (cityData[city]) {
        resultsSection.classList.remove('hidden');
        updateCharts(city);
        updateAlertStatus(city);
        updateAdditionalInfo(city);
        
        // Scroll suave até os resultados
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Adiciona classe de destaque ao card de alerta
        const alertStatus = document.querySelector('.alert-status');
        alertStatus.classList.add('highlight');
        setTimeout(() => alertStatus.classList.remove('highlight'), 2000);
    } else {
        showError('Cidade não encontrada. Por favor, tente outra cidade.');
    }
}

// Função para mostrar erro
function showError(message) {
    const cityInput = document.getElementById('cityInput');
    cityInput.classList.add('error');
    
    // Cria ou atualiza o elemento de erro
    let errorElement = document.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        cityInput.parentNode.insertBefore(errorElement, cityInput.nextSibling);
    }
    errorElement.textContent = message;
    
    // Remove o erro após 3 segundos
    setTimeout(() => {
        cityInput.classList.remove('error');
        errorElement.remove();
    }, 3000);
}

// Função para atualizar o status de alerta
function updateAlertStatus(city) {
    const alertLevel = document.getElementById('alertLevel');
    const alertIndicator = document.getElementById('alertIndicator');
    const alertDescription = document.getElementById('alertDescription');
    const data = cityData[city];
    
    alertLevel.textContent = data.alertLevel.toUpperCase();
    alertDescription.textContent = data.description;
    
    // Atualiza a cor do indicador baseado no nível de alerta
    switch(data.alertLevel) {
        case 'crítico':
            alertIndicator.style.background = 'var(--gradient-danger)';
            alertLevel.className = 'alert-badge critical';
            break;
        case 'alto':
            alertIndicator.style.background = 'var(--gradient-warning)';
            alertLevel.className = 'alert-badge high';
            break;
        case 'médio':
            alertIndicator.style.background = 'var(--gradient-success)';
            alertLevel.className = 'alert-badge medium';
            break;
        default:
            alertIndicator.style.background = '#ddd';
            alertLevel.className = 'alert-badge';
    }
    
    // Adiciona animação de pulso para alertas críticos
    if (data.alertLevel === 'crítico') {
        alertIndicator.classList.add('pulse');
    } else {
        alertIndicator.classList.remove('pulse');
    }
}

// Função para atualizar informações adicionais
function updateAdditionalInfo(city) {
    const data = cityData[city];
    document.getElementById('lastUpdate').textContent = data.lastUpdate;
    document.getElementById('averageRainfall').textContent = data.averageRainfall.toFixed(1);
}

// Função para atualizar os gráficos
function updateCharts(city) {
    const data = cityData[city];
    
    // Destrói gráficos existentes para evitar sobreposição
    Chart.helpers.each(Chart.instances, (instance) => {
        instance.destroy();
    });
    
    // Gráfico de probabilidade de enchente
    const probabilityCtx = document.getElementById('floodProbabilityChart').getContext('2d');
    new Chart(probabilityCtx, {
        type: 'doughnut',
        data: {
            labels: ['Probabilidade de Enchente', 'Segurança'],
            datasets: [{
                data: [data.floodProbability, 100 - data.floodProbability],
                backgroundColor: [
                    data.alertLevel === 'crítico' ? 'var(--danger-color)' : 
                    data.alertLevel === 'alto' ? 'var(--warning-color)' : 
                    'var(--success-color)',
                    '#e0e0e0'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 14
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Probabilidade de Enchente (%)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        bottom: 20
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });

    // Gráfico de precipitação
    const rainfallCtx = document.getElementById('rainfallChart').getContext('2d');
    const days = ['6 dias atrás', '5 dias atrás', '4 dias atrás', '3 dias atrás', '2 dias atrás', 'Ontem', 'Hoje'];
    
    new Chart(rainfallCtx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [{
                label: 'Precipitação (mm)',
                data: data.rainfall,
                backgroundColor: data.rainfall.map(value => 
                    value > 50 ? 'var(--danger-color)' :
                    value > 35 ? 'var(--warning-color)' :
                    'var(--primary-color)'
                ),
                borderColor: 'var(--secondary-color)',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Milímetros (mm)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Precipitação dos Últimos 7 Dias',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: {
                        bottom: 20
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Adiciona evento de tecla para buscar ao pressionar Enter
document.getElementById('cityInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchCity();
    }
});

// Adiciona evento de input para limpar erro quando o usuário começa a digitar
document.getElementById('cityInput').addEventListener('input', function() {
    this.classList.remove('error');
    const errorMessage = document.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
});

// Função para controlar o menu hamburguer
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // Cria o overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    body.appendChild(overlay);

    // Função para alternar o menu
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Ajusta o overflow do body apenas quando o menu está fechado
        if (!navMenu.classList.contains('active')) {
            body.style.overflow = '';
        }
    }

    // Event listeners
    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Fecha o menu ao redimensionar a janela para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
}

// Função para controlar o tema
function initThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;
    
    // Recupera o tema salvo ou usa o tema padrão (light)
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    themeButtons.forEach(btn => {
        if (btn.dataset.theme === savedTheme) {
            btn.classList.add('active');
        }
    });

    // Adiciona event listeners para os botões de tema
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            
            // Remove a classe active de todos os botões
            themeButtons.forEach(b => b.classList.remove('active'));
            
            // Adiciona a classe active ao botão clicado
            btn.classList.add('active');
            
            // Aplica o tema
            body.setAttribute('data-theme', theme);
            
            // Salva a preferência do usuário
            localStorage.setItem('theme', theme);
            
            // Atualiza os gráficos se estiverem visíveis
            const resultsSection = document.getElementById('resultados');
            if (!resultsSection.classList.contains('hidden')) {
                const cityInput = document.getElementById('cityInput');
                const city = cityInput.value.trim();
                if (cityData[city]) {
                    updateCharts(city);
                }
            }
        });
    });
}

// Quiz functionality
const quizQuestions = [
    {
        question: "Qual é a principal causa de enchentes urbanas?",
        options: [
            "Chuvas intensas",
            "Falta de limpeza das ruas",
            "Impermeabilização do solo",
            "Todas as alternativas acima"
        ],
        correct: 3,
        explanation: "As enchentes urbanas são causadas por uma combinação de fatores, incluindo chuvas intensas, falta de limpeza das ruas e principalmente a impermeabilização do solo devido ao crescimento urbano desordenado."
    },
    {
        question: "O que é um ponto de alagamento?",
        options: [
            "Um local que sempre alaga",
            "Uma área que acumula água durante chuvas",
            "Um sistema de drenagem",
            "Uma estação meteorológica"
        ],
        correct: 1,
        explanation: "Um ponto de alagamento é uma área que acumula água durante períodos de chuva, podendo causar transtornos à população e danos à infraestrutura urbana."
    },
    {
        question: "Qual é a melhor ação durante uma enchente?",
        options: [
            "Dirigir rapidamente para casa",
            "Atravessar áreas alagadas a pé",
            "Procurar abrigo em local seguro e elevado",
            "Nenhuma das alternativas"
        ],
        correct: 2,
        explanation: "Durante uma enchente, a melhor ação é procurar abrigo em um local seguro e elevado, evitando áreas de risco e seguindo as orientações das autoridades."
    },
    {
        question: "O que significa o termo 'drenagem urbana'?",
        options: [
            "Sistema de esgoto",
            "Sistema de captação e escoamento de águas pluviais",
            "Sistema de tratamento de água",
            "Sistema de irrigação"
        ],
        correct: 1,
        explanation: "Drenagem urbana é o sistema responsável pela captação e escoamento das águas pluviais nas cidades, incluindo galerias, canais e outros dispositivos de drenagem."
    },
    {
        question: "Qual é o papel do cidadão na prevenção de enchentes?",
        options: [
            "Apenas observar",
            "Denunciar problemas e manter a cidade limpa",
            "Construir barreiras",
            "Nenhum papel"
        ],
        correct: 1,
        explanation: "O cidadão tem um papel importante na prevenção de enchentes, incluindo a manutenção da limpeza da cidade, denúncia de problemas e participação em ações preventivas."
    }
];

const knowledgeLevels = {
    iniciante: {
        min: 0,
        max: 3,
        title: "Iniciante",
        description: "Você está começando a aprender sobre enchentes urbanas.",
        recommendations: [
            "Leia mais sobre o tema nas seções de prevenção",
            "Acompanhe as atualizações do site",
            "Compartilhe o conhecimento com amigos e familiares"
        ]
    },
    intermediario: {
        min: 4,
        max: 7,
        title: "Intermediário",
        description: "Você tem um bom conhecimento sobre o tema!",
        recommendations: [
            "Aprofunde seus conhecimentos nas seções específicas",
            "Participe de ações preventivas na sua comunidade",
            "Ajude a disseminar informações importantes"
        ]
    },
    avancado: {
        min: 8,
        max: 10,
        title: "Avançado",
        description: "Excelente! Você é um especialista no assunto!",
        recommendations: [
            "Continue se atualizando sobre novas tecnologias e soluções",
            "Colabore com ações preventivas na sua região",
            "Compartilhe seu conhecimento para ajudar outras pessoas"
        ]
    }
};

let quizState = {
    currentQuestion: 0,
    userAnswers: [],
    score: 0
};

function initQuiz() {
    const quizContainer = document.querySelector('.quiz-content');
    const resultContainer = document.querySelector('.resultado-container');
    const progressBar = document.querySelector('#progresso');
    const questionCounter = document.getElementById('contador-perguntas');
    const prevButton = document.getElementById('btn-anterior');
    const nextButton = document.getElementById('btn-proxima');
    const submitButton = document.getElementById('btn-enviar');
    const resultsButton = document.getElementById('btn-resultados');

    if (!quizContainer || !resultContainer) {
        console.error('Quiz containers not found');
        return;
    }

    function displayQuestion() {
        const question = quizQuestions[quizState.currentQuestion];
        const hasAnswered = quizState.userAnswers[quizState.currentQuestion] !== undefined;
        
        // Atualiza o conteúdo da pergunta
        const perguntaContainer = document.getElementById('pergunta-atual');
        if (perguntaContainer) {
            perguntaContainer.innerHTML = `
                <div class="pergunta">${question.question}</div>
                <div class="opcoes-resposta">
                    ${question.options.map((option, index) => `
                        <div class="opcao ${quizState.userAnswers[quizState.currentQuestion] === index ? 'selecionada' : ''}"
                             onclick="selectAnswer(${index})">
                            <div class="opcao-marcador"></div>
                            ${option}
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Atualiza o progresso
        const progress = ((quizState.currentQuestion + 1) / quizQuestions.length) * 100;
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (questionCounter) questionCounter.textContent = `Pergunta ${quizState.currentQuestion + 1} de ${quizQuestions.length}`;

        // Atualiza os botões
        updateQuizButtons();
    }

    function updateQuizButtons() {
        const hasAnswered = quizState.userAnswers[quizState.currentQuestion] !== undefined;
        const isLastQuestion = quizState.currentQuestion === quizQuestions.length - 1;
        const allQuestionsAnswered = quizState.userAnswers.filter(answer => answer !== undefined).length === quizQuestions.length;

        // Atualiza botão anterior
        if (prevButton) {
            prevButton.disabled = quizState.currentQuestion === 0;
            prevButton.style.display = 'inline-block';
        }

        // Atualiza botão enviar
        if (submitButton) {
            if (hasAnswered) {
                submitButton.style.display = 'none';
            } else {
                submitButton.style.display = 'inline-block';
            }
        }

        // Atualiza botão próxima
        if (nextButton) {
            if (hasAnswered) {
                nextButton.style.display = 'inline-block';
                nextButton.textContent = isLastQuestion ? 'Finalizar' : 'Próxima';
            } else {
                nextButton.style.display = 'none';
            }
        }

        // Atualiza botão resultados
        if (resultsButton) {
            resultsButton.style.display = allQuestionsAnswered ? 'inline-block' : 'none';
        }
    }

    function selectAnswer(index) {
        quizState.userAnswers[quizState.currentQuestion] = index;
        
        // Mostra o botão de enviar quando uma resposta é selecionada
        if (submitButton) {
            submitButton.style.display = 'inline-block';
        }
        
        displayQuestion();
    }

    function submitAnswer() {
        const currentAnswer = quizState.userAnswers[quizState.currentQuestion];
        if (currentAnswer !== undefined) {
            const question = quizQuestions[quizState.currentQuestion];
            const options = document.querySelectorAll('.opcao');
            
            options.forEach((option, index) => {
                option.classList.remove('correta', 'incorreta');
                if (index === question.correct) {
                    option.classList.add('correta');
                } else if (index === currentAnswer && index !== question.correct) {
                    option.classList.add('incorreta');
                }
            });

            // Disable option selection after submission
            options.forEach(option => {
                option.style.pointerEvents = 'none';
            });

            updateQuizButtons();
        }
    }

    function calculateScore() {
        let score = 0;
        quizState.userAnswers.forEach((answer, index) => {
            if (answer === quizQuestions[index].correct) {
                score++;
            }
        });
        return score;
    }

    function getKnowledgeLevel(score) {
        for (const [level, data] of Object.entries(knowledgeLevels)) {
            if (score >= data.min && score <= data.max) {
                return { level, ...data };
            }
        }
        return knowledgeLevels.iniciante;
    }

    function showResults() {
        const score = calculateScore();
        const knowledgeLevel = getKnowledgeLevel(score);
        
        quizContainer.style.display = 'none';
        resultContainer.style.display = 'block';
        resultContainer.innerHTML = `
            <h2>Resultado do Quiz</h2>
            <div class="pontuacao-container">
                <div class="pontuacao">${score}</div>
                <div class="pontuacao-maxima">/ ${quizQuestions.length}</div>
            </div>
            <div class="nivel-conhecimento">
                <h3>${knowledgeLevel.title}</h3>
                <p>${knowledgeLevel.description}</p>
            </div>
            <div class="recomendacoes">
                <h3>Recomendações:</h3>
                <ul>
                    ${knowledgeLevel.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
            <div class="botoes-resultado">
                <button onclick="restartQuiz()" class="btn btn-primary">Refazer Quiz</button>
                <button onclick="showExplanations()" class="btn btn-secondary">Ver Explicações</button>
            </div>
        `;
    }

    function showExplanations() {
        const explanationsContainer = document.createElement('div');
        explanationsContainer.className = 'explicacoes-container';
        explanationsContainer.innerHTML = `
            <h3>Explicações das Respostas</h3>
            ${quizQuestions.map((q, index) => `
                <div class="explicacao-item">
                    <h4>Pergunta ${index + 1}: ${q.question}</h4>
                    <p>Sua resposta: ${q.options[quizState.userAnswers[index]]}</p>
                    <p>Resposta correta: ${q.options[q.correct]}</p>
                    <p class="explicacao">${q.explanation}</p>
                </div>
            `).join('')}
            <button onclick="restartQuiz()" class="btn btn-primary">Refazer Quiz</button>
        `;
        
        const resultContainer = document.querySelector('.resultado-container');
        resultContainer.innerHTML = '';
        resultContainer.appendChild(explanationsContainer);
    }

    // Make functions available globally
    window.selectAnswer = selectAnswer;
    window.submitAnswer = submitAnswer;
    window.restartQuiz = () => {
        quizState = {
            currentQuestion: 0,
            userAnswers: [],
            score: 0
        };
        if (resultContainer) resultContainer.style.display = 'none';
        if (quizContainer) quizContainer.style.display = 'block';
        displayQuestion();
    };
    window.showExplanations = showExplanations;

    // Event listeners
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (quizState.currentQuestion > 0) {
                quizState.currentQuestion--;
                displayQuestion();
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (quizState.currentQuestion < quizQuestions.length - 1) {
                quizState.currentQuestion++;
                displayQuestion();
            } else {
                showResults();
            }
        });
    }

    if (submitButton) {
        submitButton.addEventListener('click', submitAnswer);
    }

    if (resultsButton) {
        resultsButton.addEventListener('click', showResults);
    }

    // Inicializa o quiz
    displayQuestion();
}

// Initialize quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initThemeSwitcher();
    document.body.classList.add('loaded');
    initQuiz();
}); 