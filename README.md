# LexiGrow - Learn English Words Effectively

![LexiGrow Banner](https://repository-images.githubusercontent.com/926311848/23aade93-f4d5-46e0-a7c1-6f95ddabb85d)

LexiGrow is a web application designed to help Ukrainian speakers build and expand their English vocabulary. The application offers an intuitive interface for adding, organizing, and learning new words through a systematic approach to vocabulary acquisition.

## Features

- **Personal Dictionary**: Create and manage your own customized dictionary of English words
- **Word Management**:
  - Add new words with translations
  - Categorize words (nouns, verbs, adjectives, etc.)
  - Special handling for regular and irregular verbs
  - Track learning progress
- **Word Discovery**: Browse words added by other users and add them to your dictionary
- **Smart Training System**:
  - Practice translating words in both directions (English to Ukrainian, Ukrainian to English)
  - Track progress for each word
  - Receive immediate feedback on your answers
- **User Experience**:
  - Responsive design that works on mobile (375px), tablet (768px), and desktop (1440px)
  - Interactive UI with animations and visual feedback
  - Comprehensive search and filtering capabilities

## Tech Stack

- **Frontend Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Component Library**: [shadcn/ui](https://ui.shadcn.com/) built on [Radix UI](https://www.radix-ui.com/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/)
- **Form Validation**: [Yup](https://github.com/jquense/yup)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Table Management**: [TanStack Table](https://tanstack.com/table/v8) (formerly React Table)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Cookie Management**: [js-cookie](https://github.com/js-cookie/js-cookie)

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Backend API access (provided by GoIT)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/cel3ntano/LexiGrow.git
```

2. Navigate to the project directory:

```bash
cd lexigrow
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env.local` file in the root directory based on `.env.example`:

```env
NEXT_PUBLIC_API_BASE_URL=https://vocab-builder-backend.p.goit.global
```

5. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
lexigrow/
├─ public/                # Static assets
│  ├─ images/             # Images and illustrations
│  ├─ sprite.svg          # SVG sprite for icons
│  └─ fonts/              # Font files
├─ src/
│  ├─ app/                # Next.js pages and layouts
│  │  ├─ (auth)/          # Authentication routes
│  │  ├─ (protected)/     # Protected routes
│  ├─ components/         # React components
│  │  ├─ auth/            # Authentication components
│  │  ├─ common/          # Reusable UI components
│  │  ├─ dictionary/      # Dictionary feature components
│  │  ├─ forms/           # Form components
│  │  ├─ training/        # Training feature components
│  │  └─ ui/              # Base UI components from shadcn
│  ├─ hooks/              # Custom React hooks
│  ├─ lib/                # Utility functions and configurations
│  │  ├─ constants/       # Application constants
│  │  ├─ schemas/         # Validation schemas
│  │  ├─ types/           # TypeScript type definitions
│  │  └─ utils/           # Utility functions
│  ├─ providers/          # React context providers
│  ├─ redux/              # Redux store configuration
│  │  ├─ features/        # Redux slices and operations
│  ├─ services/           # API service layer
│  └─ styles/             # Global styles
```

## Features in Detail

### Authentication

- User registration with email, password, and name
- Login system with form validation
- Token-based authentication
- Protected routes for authenticated users

### Dictionary Management

- Add, edit, and delete words from your personal dictionary
- Categorize words and mark verbs as regular or irregular
- Search functionality with debounced input
- Category filtering
- Progress tracking for each word
- Pagination for large dictionaries

### Word Recommendations

- Browse words added by other users
- Add interesting words to your personal dictionary
- Same filtering and search capabilities as in the personal dictionary

### Training System

- Practice translating words in both directions
- Track progress with a visual progress bar
- Submit answers and receive immediate feedback
- View training results with correct answers and mistakes

### Responsive Design

- Mobile-first approach
- Breakpoints at 375px, 768px, and 1440px
- Burger menu on mobile and tablet versions

## Backend API

The application uses a pre-built backend API available at:
https://vocab-builder-backend.p.goit.global/api-docs/

## Author

Developed by Andrii Zhygalko
