# Newsletter Gamification

A gamification system for newsletter engagement tracking and rewards.

## 🚀 Features

- Track newsletter reads and engagement
- Real-time statistics
- User engagement metrics
- Integration with newsletter platforms

## 🛠️ Technologies

- React + TypeScript
- Vite
- Axios for API requests
- Cloudflare Workers for backend
- TanStack Query for data fetching

## 🏁 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Cloudflare account (for the API)

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/newsletter-gamification.git
cd newsletter-gamification
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

```bash
cp .env.example .env
```

Edit the `.env` file and add your API URL:

```
VITE_API_URL=your_api_url_here
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

## 🔧 Configuration

The application requires the following environment variables:

- `VITE_API_URL`: The URL of your Cloudflare Workers API

## 📚 API Documentation

The API endpoints available are:

- `GET /api/reads` - Get newsletter read statistics
- More endpoints coming soon...

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by newsletter engagement needs
