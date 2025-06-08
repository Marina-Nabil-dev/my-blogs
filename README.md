# My Blog

A modern, multilingual blog built with Next.js 14, featuring dark mode support and internationalization.

## Features

- 🌐 Internationalization (English & Arabic)
- 🌙 Dark mode support
- 📱 Responsive design
- 🔍 Search functionality
- 🏷️ Post categorization with tags
- 👤 User authentication
- 💖 Favorites system
- 📝 Rich text content
- 🖼️ Image support for posts

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Prisma with PostgreSQL
- **Authentication:** NextAuth.js
- **Internationalization:** next-intl
- **State Management:** React Query
- **Icons:** React Icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/my-blog.git
cd my-blog
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/myblog"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see your blog.

## Project Structure

```
src/
├── app/                 # App router pages and layouts
├── components/         # Reusable components
├── i18n/              # Internationalization config
├── lib/               # Utility functions and configurations
├── messages/          # Translation files
└── styles/            # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
