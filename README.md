# The News Gamification

Uma aplicação web para gamificar a leitura de newsletters, incentivando o engajamento dos leitores através de streaks e métricas.

## Funcionalidades

### Painel Administrativo

- **Métricas em Tempo Real**

  - Total de leitores
  - Média de streak
  - Taxa de abertura
  - Leitores ativos

- **Visualização de Dados**

  - Gráfico de evolução de streaks
  - Gráfico de taxa de abertura por dia
  - Lista dos top leitores

- **Sistema de Filtros**

  - Intervalo de tempo personalizado
  - Filtro por data específica de newsletter
  - Filtro por status de streak
  - Reset rápido para valores padrão
  - Feedback visual durante o carregamento

- **Modo de Desenvolvimento**
  - Switch para alternar entre dados reais e mock
  - Dados mock realistas para os últimos 90 dias
  - Perfeito para testes e desenvolvimento

## Tecnologias

- React
- TypeScript
- TailwindCSS
- Headless UI
- Recharts
- React Query
- date-fns

## Instalação

1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/the-news-gamification.git
```

2. Instale as dependências

```bash
cd the-news-gamification
npm install
```

3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
VITE_API_URL=http://sua-api.com
```

4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

## Estrutura do Projeto

```
src/
  ├── components/        # Componentes reutilizáveis
  │   ├── FilterModal/  # Modal de filtros com feedback de loading
  │   ├── MetricCard/   # Cards de métricas
  │   └── Charts/       # Componentes de gráficos
  ├── hooks/            # Custom hooks
  │   └── useAdminStats/# Hook para gerenciar dados admin
  ├── pages/            # Páginas da aplicação
  │   └── Admin/        # Painel administrativo
  ├── services/         # Serviços e API
  ├── types/            # Definições de tipos
  └── mocks/            # Dados mock para desenvolvimento
```

## API

### Endpoints

- `GET /api/stats/admin` - Estatísticas gerais
- `GET /api/stats/admin/top-readers` - Top leitores
- `GET /api/stats/admin/historical` - Dados históricos

### Filtros

Os endpoints aceitam os seguintes parâmetros:

- `startDate`: Data inicial (YYYY-MM-DD)
- `endDate`: Data final (YYYY-MM-DD)
- `newsletterDate`: Data específica da newsletter (opcional)
- `minStreak`: Streak mínimo (opcional)

### Modo Mock

Para desenvolvimento, a aplicação inclui um modo mock que pode ser ativado através de um switch no painel administrativo. Este modo:

- Gera dados realistas para os últimos 90 dias
- Simula variações naturais nas métricas
- Não requer conexão com a API
- Perfeito para desenvolvimento e testes

## Feedback Visual

A aplicação inclui diversos elementos de feedback visual:

- Loading states em todos os componentes
- Animações suaves de transição
- Indicadores de carregamento durante filtros
- Desabilitação de controles durante operações
- Mensagens de erro amigáveis

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
