# Newsletter Gamification

[English](#newsletter-gamification) | [Português](#newsletter-gamification-pt)

A gamified newsletter reading tracking system built with React, TypeScript, and Tailwind CSS. The application helps users track their reading streaks, compete with other readers, and maintain engagement with newsletter content.

## Features

- 📊 User Dashboard

  - Current and highest reading streaks
  - Reading history visualization
  - Personal statistics
  - Real-time reading rate tracking

- 👥 Admin Dashboard

  - Total readers overview
  - Average engagement metrics
  - Top readers leaderboard
  - Historical data visualization

- 🎮 Gamification Elements
  - Daily streaks
  - Achievement badges
  - Reader rankings
  - Performance metrics

## Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Icons**: Heroicons
- **Charts**: Recharts
- **Routing**: React Router
- **API Integration**: Axios

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/newsletter-gamification.git
cd newsletter-gamification
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:

```env
VITE_API_URL=https://api-gamification.api-gamification.workers.dev/
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

## Test Accounts

### Admin Access

- Email: admin@example.com
- Password: (contact repository owner)
- Features: Full access to admin dashboard and analytics

### Test User

1. First, create a read record using this link:

```
https://api-gamification.api-gamification.workers.dev/?email=test@example.com&id=98349839498349
```

2. Then use these credentials:

- Email: test@example.com
- Password: (contact repository owner)
- Features: Regular user dashboard access

## Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/         # React contexts
├── hooks/           # Custom hooks
├── pages/           # Page components
├── services/        # API and other services
├── types/           # TypeScript type definitions
│   ├── api.ts
│   ├── auth.ts
│   └── components/
├── utils/           # Utility functions
└── App.tsx         # Root component
```

## Key Components

- `StatsCard`: Displays metric information with trends
- `TopReaders`: Shows leaderboard of top readers
- `ReadingHistory`: Visualizes reading activity
- `MetricCard`: Presents individual metrics with icons
- `Icons`: Centralized icon management system

## Environment Variables

| Variable     | Description  | Required |
| ------------ | ------------ | -------- |
| VITE_API_URL | API base URL | Yes      |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Heroicons](https://heroicons.com/) for the icon set
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [React Query](https://react-query.tanstack.com/) for data fetching
- [Recharts](https://recharts.org/) for chart components

## Contact

Your Name - your.email@example.com
Project Link: [https://github.com/your-username/newsletter-gamification](https://github.com/your-username/newsletter-gamification)

---





# Newsletter Gamification (PT)

Um sistema gamificado de rastreamento de leitura de newsletter construído com React, TypeScript e Tailwind CSS. A aplicação ajuda os usuários a acompanharem suas sequências de leitura, competirem com outros leitores e manterem o engajamento com o conteúdo da newsletter.

## Funcionalidades

- 📊 Dashboard do Usuário

  - Sequências atual e máxima de leituras
  - Visualização do histórico de leitura
  - Estatísticas pessoais
  - Acompanhamento em tempo real da taxa de leitura

- 👥 Dashboard Administrativo

  - Visão geral total de leitores
  - Métricas médias de engajamento
  - Ranking dos melhores leitores
  - Visualização de dados históricos

- 🎮 Elementos de Gamificação
  - Sequências diárias
  - Medalhas de conquistas
  - Classificação de leitores
  - Métricas de desempenho

## Stack Tecnológica

- **Frontend**: React + TypeScript
- **Estilização**: Tailwind CSS
- **Gerenciamento de Estado**: React Query
- **Ícones**: Heroicons
- **Gráficos**: Recharts
- **Roteamento**: React Router
- **Integração com API**: Axios

## Como Começar

### Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/your-username/newsletter-gamification.git
cd newsletter-gamification
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Crie um arquivo `.env` no diretório raiz:

```env
VITE_API_URL=https://api-gamification.api-gamification.workers.dev/
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

## Contas de Teste

### Acesso Administrativo

- Email: admin@example.com
- Senha: (contate o proprietário do repositório)
- Funcionalidades: Acesso completo ao dashboard administrativo e análises

### Usuário de Teste

1. Primeiro, crie um registro de leitura usando este link:

```
https://api-gamification.api-gamification.workers.dev/?email=test@example.com&id=98349839498349
```

2. Depois use estas credenciais:

- Email: test@example.com
- Senha: (contate o proprietário do repositório)
- Funcionalidades: Acesso ao dashboard de usuário regular

## Estrutura do Projeto

```
src/
├── components/        # Componentes UI reutilizáveis
├── contexts/         # Contextos React
├── hooks/           # Hooks personalizados
├── pages/           # Componentes de página
├── services/        # Serviços e API
├── types/           # Definições de tipos TypeScript
│   ├── api.ts
│   ├── auth.ts
│   └── components/
├── utils/           # Funções utilitárias
└── App.tsx         # Componente raiz
```

## Componentes Principais

- `StatsCard`: Exibe informações métricas com tendências
- `TopReaders`: Mostra ranking dos melhores leitores
- `ReadingHistory`: Visualiza atividade de leitura
- `MetricCard`: Apresenta métricas individuais com ícones
- `Icons`: Sistema centralizado de gerenciamento de ícones

## Variáveis de Ambiente

| Variável     | Descrição       | Obrigatório |
| ------------ | --------------- | ----------- |
| VITE_API_URL | URL base da API | Sim         |

## Como Contribuir

1. Faça um fork do repositório
2. Crie sua branch de feature (`git checkout -b feature/RecursoIncrivel`)
3. Faça commit de suas mudanças (`git commit -m 'Adiciona algum recurso incrível'`)
4. Faça push para a branch (`git push origin feature/RecursoIncrivel`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Agradecimentos

- [Heroicons](https://heroicons.com/) pelo conjunto de ícones
- [Tailwind CSS](https://tailwindcss.com/) pelo sistema de estilização
- [React Query](https://react-query.tanstack.com/) pelo gerenciamento de dados
- [Recharts](https://recharts.org/) pelos componentes de gráficos

## Contato

Seu Nome - seu.email@example.com
Link do Projeto: [https://github.com/your-username/newsletter-gamification](https://github.com/your-username/newsletter-gamification)
