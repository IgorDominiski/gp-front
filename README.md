# HydroSafe - Sistema de Alertas de Enchentes

Um sistema web moderno para monitoramento e alerta de enchentes em diferentes cidades, desenvolvido com HTML, CSS e JavaScript.

## Funcionalidades

- 🎯 Busca de cidades para verificar o risco de enchentes
- 📊 Visualização de estatísticas em tempo real
- 📈 Gráficos interativos mostrando:
  - Probabilidade de enchentes
  - Precipitação dos últimos 7 dias
- ⚠️ Sistema de alerta visual com níveis de risco
- 📱 Interface responsiva para desktop e mobile
- 🌓 Sistema de temas (Claro, Escuro e Azul)
- 🎮 Quiz interativo sobre prevenção de enchentes
- 📚 Seções informativas sobre:
  - O Problema
  - Tecnologias Utilizadas
  - Objetivos
  - Público-Alvo
  - Benefícios
  - Impacto Diário

## Como Usar

1. Abra o arquivo `index.html` em seu navegador
2. Explore as diferentes seções através do menu de navegação
3. Para verificar o risco de enchentes:
   - Digite o nome de uma cidade no campo de busca
   - Clique em "Buscar" ou pressione Enter
   - Visualize as estatísticas e alertas da cidade selecionada
4. Para testar seus conhecimentos:
   - Acesse a seção "Quiz" no menu
   - Responda às perguntas sobre prevenção de enchentes
   - Receba seu resultado e recomendações personalizadas

## Cidades Disponíveis (Dados de Demonstração)

- São Paulo
- Rio de Janeiro
- Curitiba
- Salvador

## Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS e temas)
- JavaScript (ES6+)
- Chart.js para visualização de dados
- Fontes do Google (Inter)
- Ícones emoji para elementos visuais

## Estrutura do Projeto

```
.
├── index.html              # Página principal
├── styles.css              # Estilos CSS globais
├── script.js              # Lógica JavaScript principal
├── pages/                 # Páginas adicionais
│   ├── monitoramento/     # Páginas de monitoramento
│   │   ├── estatisticas.html
│   │   └── prevencao.html
│   ├── quiz/             # Páginas do quiz
│   │   └── quiz.html
│   └── sobre/            # Páginas informativas
│       ├── problema.html
│       ├── tecnologias.html
│       ├── objetivos.html
│       ├── publico.html
│       ├── beneficios.html
│       └── impacto.html
├── assets/               # Recursos estáticos
│   ├── css/             # Estilos CSS adicionais
│   └── js/              # Scripts JavaScript adicionais
└── README.md            # Documentação
```

## Características Técnicas

- Design responsivo com mobile-first approach
- Sistema de temas com suporte a modo claro, escuro e azul
- Menu de navegação responsivo com animações
- Gráficos interativos e responsivos
- Quiz interativo com sistema de pontuação
- Animações suaves e transições
- Armazenamento local de preferências do usuário
- Interface moderna e intuitiva

## Contribuição

Este é um projeto de demonstração. Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Notas

- Os dados apresentados são simulados para fins de demonstração
- Em um ambiente de produção, seria necessário integrar com uma API de dados meteorológicos reais
- O sistema pode ser expandido para incluir mais cidades e funcionalidades
- O quiz pode ser atualizado com mais perguntas e categorias
- Novos temas podem ser adicionados facilmente através do sistema de variáveis CSS

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes. 
