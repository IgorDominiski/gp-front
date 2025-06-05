// Perguntas do quiz
const perguntas = [
    {
        pergunta: "Qual é a principal causa de enchentes urbanas?",
        opcoes: [
            "Chuvas intensas",
            "Vazamento de água",
            "Poluição do ar",
            "Aquecimento global"
        ],
        respostaCorreta: 0,
        explicacao: "Chuvas intensas são a principal causa de enchentes urbanas, especialmente quando o sistema de drenagem não consegue absorver o volume de água."
    },
    {
        pergunta: "Qual medida NÃO é eficaz na prevenção de enchentes?",
        opcoes: [
            "Construção de piscinões",
            "Desmatamento de áreas verdes",
            "Manutenção de bueiros",
            "Sistema de alerta"
        ],
        respostaCorreta: 1,
        explicacao: "O desmatamento de áreas verdes é prejudicial, pois reduz a capacidade natural de absorção de água do solo."
    },
    {
        pergunta: "O que significa o termo 'ilha de calor' em relação a enchentes?",
        opcoes: [
            "Áreas com temperaturas mais altas que dificultam a drenagem",
            "Ilhas que sofrem com enchentes",
            "Pontos de alagamento em formato de ilha",
            "Áreas de refúgio durante enchentes"
        ],
        respostaCorreta: 0,
        explicacao: "Ilhas de calor são áreas urbanas com temperaturas mais altas que o entorno, o que pode intensificar chuvas e dificultar a drenagem."
    },
    {
        pergunta: "Qual tecnologia é mais eficaz para prever enchentes?",
        opcoes: [
            "Redes sociais",
            "Sensores de nível d'água",
            "Câmeras de vigilância",
            "GPS"
        ],
        respostaCorreta: 1,
        explicacao: "Sensores de nível d'água são fundamentais para monitorar e prever enchentes em tempo real."
    },
    {
        pergunta: "O que é um piscinão?",
        opcoes: [
            "Piscina pública",
            "Reservatório para armazenar água da chuva",
            "Área de lazer",
            "Ponto de coleta de lixo"
        ],
        respostaCorreta: 1,
        explicacao: "Piscinões são grandes reservatórios construídos para armazenar temporariamente a água da chuva e evitar enchentes."
    },
    {
        pergunta: "Qual é o papel da vegetação na prevenção de enchentes?",
        opcoes: [
            "Apenas decorativo",
            "Absorver água e reduzir erosão",
            "Aumentar a velocidade da água",
            "Nenhum papel relevante"
        ],
        respostaCorreta: 1,
        explicacao: "A vegetação ajuda a absorver água e reduzir a erosão do solo, sendo fundamental na prevenção de enchentes."
    },
    {
        pergunta: "O que significa 'drenagem urbana'?",
        opcoes: [
            "Limpeza de ruas",
            "Sistema de coleta e escoamento de água da chuva",
            "Tratamento de esgoto",
            "Abastecimento de água"
        ],
        respostaCorreta: 1,
        explicacao: "Drenagem urbana é o sistema responsável por coletar e escoar a água da chuva nas cidades."
    },
    {
        pergunta: "Qual é o impacto do asfalto nas enchentes?",
        opcoes: [
            "Nenhum impacto",
            "Reduz a ocorrência de enchentes",
            "Aumenta a velocidade da água e reduz infiltração",
            "Aumenta a infiltração de água"
        ],
        respostaCorreta: 2,
        explicacao: "O asfalto impermeabiliza o solo, aumentando a velocidade da água e reduzindo sua infiltração, contribuindo para enchentes."
    },
    {
        pergunta: "O que é um sistema de alerta de enchentes?",
        opcoes: [
            "Apenas um aplicativo de celular",
            "Sistema que monitora e avisa sobre riscos de enchente",
            "Sistema de limpeza de ruas",
            "Sistema de iluminação pública"
        ],
        respostaCorreta: 1,
        explicacao: "Sistemas de alerta monitoram condições climáticas e níveis de água para avisar a população sobre riscos de enchente."
    },
    {
        pergunta: "Qual é a melhor ação durante uma enchente?",
        opcoes: [
            "Dirigir rapidamente para casa",
            "Subir para locais elevados e seguros",
            "Nadar para áreas mais altas",
            "Ficar em casa mesmo com água subindo"
        ],
        respostaCorreta: 1,
        explicacao: "Durante uma enchente, a ação mais segura é buscar locais elevados e seguros, evitando áreas de risco."
    }
];

// Níveis de conhecimento baseados na pontuação
const niveisConhecimento = [
    {
        titulo: "Iniciante",
        descricao: "Você está começando a aprender sobre enchentes. Continue estudando!",
        recomendacoes: [
            "Leia mais sobre prevenção de enchentes",
            "Conheça os pontos de risco em sua região",
            "Aprenda sobre medidas de segurança básicas"
        ]
    },
    {
        titulo: "Intermediário",
        descricao: "Você tem um bom conhecimento sobre o tema, mas ainda pode aprender mais!",
        recomendacoes: [
            "Aprofunde seus conhecimentos sobre tecnologias de prevenção",
            "Participe de ações comunitárias de prevenção",
            "Compartilhe seu conhecimento com outras pessoas"
        ]
    },
    {
        titulo: "Avançado",
        descricao: "Excelente! Você tem um conhecimento sólido sobre enchentes e prevenção!",
        recomendacoes: [
            "Ajude a conscientizar outras pessoas",
            "Participe ativamente de projetos de prevenção",
            "Mantenha-se atualizado sobre novas tecnologias e soluções"
        ]
    }
];

// Estado do quiz
let estadoQuiz = {
    perguntaAtual: 0,
    respostas: [],
    pontuacao: 0
};

// Elementos do DOM
const elementos = {
    quiz: document.getElementById('quiz'),
    perguntaAtual: document.getElementById('pergunta-atual'),
    botaoAnterior: document.getElementById('botao-anterior'),
    botaoProximo: document.getElementById('botao-proximo'),
    contadorPerguntas: document.getElementById('contador-perguntas'),
    progressoAtual: document.getElementById('progresso-atual'),
    resultado: document.getElementById('resultado'),
    pontuacaoNumero: document.getElementById('pontuacao-numero'),
    nivelTitulo: document.getElementById('nivel-titulo'),
    nivelDescricao: document.getElementById('nivel-descricao'),
    listaRecomendacoes: document.getElementById('lista-recomendacoes'),
    botaoReiniciar: document.getElementById('botao-reiniciar')
};

// Funções do quiz
function iniciarQuiz() {
    estadoQuiz = {
        perguntaAtual: 0,
        respostas: new Array(perguntas.length).fill(null),
        pontuacao: 0
    };
    mostrarPergunta();
    atualizarBotoes();
    atualizarProgresso();
}

function mostrarPergunta() {
    const pergunta = perguntas[estadoQuiz.perguntaAtual];
    const opcoesHTML = pergunta.opcoes.map((opcao, index) => `
        <div class="opcao ${estadoQuiz.respostas[estadoQuiz.perguntaAtual] === index ? 'selecionada' : ''}" 
             data-index="${index}">
            <div class="opcao-marcador"></div>
            ${opcao}
        </div>
    `).join('');

    elementos.perguntaAtual.innerHTML = `
        <div class="pergunta">${pergunta.pergunta}</div>
        <div class="opcoes-resposta">${opcoesHTML}</div>
    `;

    // Adicionar eventos de clique nas opções
    document.querySelectorAll('.opcao').forEach(opcao => {
        opcao.addEventListener('click', () => selecionarResposta(parseInt(opcao.dataset.index)));
    });
}

function selecionarResposta(index) {
    estadoQuiz.respostas[estadoQuiz.perguntaAtual] = index;
    mostrarPergunta(); // Atualiza a visualização
    atualizarBotoes();
}

function atualizarBotoes() {
    elementos.botaoAnterior.disabled = estadoQuiz.perguntaAtual === 0;
    elementos.botaoProximo.textContent = 
        estadoQuiz.perguntaAtual === perguntas.length - 1 ? 'Finalizar' : 'Próxima';
}

function atualizarProgresso() {
    const progresso = ((estadoQuiz.perguntaAtual + 1) / perguntas.length) * 100;
    elementos.progressoAtual.style.width = `${progresso}%`;
    elementos.contadorPerguntas.textContent = 
        `Pergunta ${estadoQuiz.perguntaAtual + 1} de ${perguntas.length}`;
}

function calcularPontuacao() {
    return perguntas.reduce((pontuacao, pergunta, index) => {
        return pontuacao + (estadoQuiz.respostas[index] === pergunta.respostaCorreta ? 1 : 0);
    }, 0);
}

function mostrarResultado() {
    const pontuacao = calcularPontuacao();
    const nivel = pontuacao < 4 ? niveisConhecimento[0] :
                 pontuacao < 8 ? niveisConhecimento[1] :
                 niveisConhecimento[2];

    elementos.pontuacaoNumero.textContent = pontuacao;
    elementos.nivelTitulo.textContent = nivel.titulo;
    elementos.nivelDescricao.textContent = nivel.descricao;
    elementos.listaRecomendacoes.innerHTML = nivel.recomendacoes
        .map(rec => `<li>${rec}</li>`)
        .join('');

    elementos.quiz.style.display = 'none';
    elementos.resultado.style.display = 'block';
}

// Event Listeners
elementos.botaoAnterior.addEventListener('click', () => {
    if (estadoQuiz.perguntaAtual > 0) {
        estadoQuiz.perguntaAtual--;
        mostrarPergunta();
        atualizarBotoes();
        atualizarProgresso();
    }
});

elementos.botaoProximo.addEventListener('click', () => {
    if (estadoQuiz.respostas[estadoQuiz.perguntaAtual] === null) {
        alert('Por favor, selecione uma resposta antes de continuar.');
        return;
    }

    if (estadoQuiz.perguntaAtual < perguntas.length - 1) {
        estadoQuiz.perguntaAtual++;
        mostrarPergunta();
        atualizarBotoes();
        atualizarProgresso();
    } else {
        mostrarResultado();
    }
});

elementos.botaoReiniciar.addEventListener('click', () => {
    elementos.resultado.style.display = 'none';
    elementos.quiz.style.display = 'block';
    iniciarQuiz();
});

// Iniciar o quiz quando a página carregar
document.addEventListener('DOMContentLoaded', iniciarQuiz); 