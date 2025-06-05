// Dados simulados para demonstração
const statsData = {
    trends: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
            label: 'Ocorrências de Enchentes',
            data: [12, 19, 15, 25, 22, 30],
            borderColor: 'var(--primary-color)',
            backgroundColor: 'rgba(26, 35, 126, 0.1)',
            tension: 0.4
        }]
    },
    regional: {
        labels: ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
        datasets: [{
            label: 'Precipitação Média (mm)',
            data: [85, 65, 70, 90, 75],
            backgroundColor: [
                'var(--primary-color)',
                'var(--secondary-color)',
                'var(--warning-color)',
                'var(--danger-color)',
                'var(--success-color)'
            ]
        }]
    },
    alerts: {
        labels: ['Crítico', 'Alto', 'Médio', 'Baixo'],
        datasets: [{
            data: [5, 10, 25, 60],
            backgroundColor: [
                'var(--danger-color)',
                'var(--warning-color)',
                'var(--success-color)',
                'var(--primary-color)'
            ]
        }]
    },
    historical: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
            label: '2024',
            data: [45, 52, 38, 45, 58, 62, 55, 48, 42, 38, 45, 50],
            borderColor: 'var(--primary-color)',
            backgroundColor: 'rgba(26, 35, 126, 0.1)',
            tension: 0.4
        }, {
            label: '2023',
            data: [40, 48, 35, 42, 55, 58, 50, 45, 40, 35, 42, 48],
            borderColor: 'var(--secondary-color)',
            backgroundColor: 'rgba(13, 71, 161, 0.1)',
            tension: 0.4
        }]
    }
};

// Função para inicializar os gráficos
function initCharts() {
    // Gráfico de tendências
    new Chart(document.getElementById('trendsChart'), {
        type: 'line',
        data: statsData.trends,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Tendência de Ocorrências',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Número de Ocorrências'
                    }
                }
            }
        }
    });

    // Gráfico regional
    new Chart(document.getElementById('regionalChart'), {
        type: 'bar',
        data: statsData.regional,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Precipitação por Região',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Milímetros (mm)'
                    }
                }
            }
        }
    });

    // Gráfico de alertas
    new Chart(document.getElementById('alertsChart'), {
        type: 'doughnut',
        data: statsData.alerts,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Distribuição de Alertas',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            }
        }
    });

    // Gráfico histórico
    new Chart(document.getElementById('historicalChart'), {
        type: 'line',
        data: statsData.historical,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Precipitação Histórica',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Milímetros (mm)'
                    }
                }
            }
        }
    });
}

// Função para atualizar os gráficos quando o tema muda
function updateChartsTheme() {
    Chart.helpers.each(Chart.instances, (instance) => {
        instance.destroy();
    });
    initCharts();
}

// Event listeners para os filtros
document.getElementById('yearFilter').addEventListener('change', updateChartsTheme);
document.getElementById('regionFilter').addEventListener('change', updateChartsTheme);

// Inicializa os gráficos quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    
    // Adiciona listener para mudança de tema
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setTimeout(updateChartsTheme, 100); // Pequeno delay para garantir que o tema foi aplicado
        });
    });
}); 