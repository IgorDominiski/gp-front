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
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
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

// Inicializa o menu mobile quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    document.body.classList.add('loaded');
}); 