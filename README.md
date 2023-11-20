
# innoscripta-news-feed

This is a news aggregator project, that is made only for the case study. It currently uses NewsAPI, The Guardian's API, and New York Times API. It's highly configurable to add more news sources if required.

## Table of Content

- [innoscripta-news-feed](#innoscripta-news-feed)
  - [Table of Content](#table-of-content)
  - [Get Started](#get-started)
    - [Prerequisites](#prerequisites)
    - [Running the Project in Development Environment](#running-the-project-in-development-environment)
  - [Folder Structure](#folder-structure)
  - [Build and Deploy](#build-and-deploy)
    - [Building the Project](#building-the-project)
    - [Deploying with Docker](#deploying-with-docker)
  - [Technologies and Tools](#technologies-and-tools)
  - [Commands](#commands)
  - [Contributing](#contributing)


## Get Started

### Prerequisites
- NodeJS
- NPM
- Docker (for production build)

### Running the Project in Development Environment
1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Folder Structure

```
innoscripta-news-feed/
│
├── public/            # Static resources
│   └── icon.svg       # Application icon
│
├── src/               # Source code
│   ├── assets/        # Static assets
│   ├── components/    # React components
│   │   ├── card.tsx   # Card component
│   │   ├── ...       # Other components
│   ├── const/         # Constants (e.g., news.ts, storage.ts)
│   ├── helpers/       # Helper functions (e.g., formatter.ts)
│   ├── hooks/         # Custom React hooks
│   ├── routes/        # Route components
│   ├── App.css        # Main CSS file
│   ├── App.tsx        # Main App component
│   ├── main.tsx       # Entry point
│   └── ...
│
├── .dockerignore      # Files to ignore in Docker builds
├── .eslintignore      # Files to ignore by ESLint
├── .eslintrc.cjs      # ESLint configuration
├── .gitignore         # Files to ignore in git repositories
├── .prettierrc        # Prettier configuration
├── Dockerfile         # Docker configuration
├── package.json       # Project metadata and dependencies
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite configuration
```

## Build and Deploy

### Building the Project
1. Build the project for production:
   ```
   npm run build
   ```

### Deploying with Docker
1. Build the Docker image:
   ```
   docker build -t innoscripta-news-feed .
   ```
2. Run the Docker container:
   ```
   docker run -p 443:3000 innoscripta-news-feed
   ```

## Technologies and Tools
- **Vite**: Bundling and development server.
- **React**: UI library.
- **TypeScript**: Static typing for JavaScript.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Prettier**: Code formatting.
- **ESLint**: Code linting.

## Commands
These commands can run on the project's directory from a terminal:

| Command                                                | Action                                                |
| :----------------------------------------------------- | :---------------------------------------------------- |
| `npm install`                                          | Installs dependencies                                 |
| `npm run dev`                                          | Starts local dev server at `localhost:5173`           |
| `npm run build`                                        | Build your production site to `./dist/`               |
| `npm run preview`                                      | Preview your build locally, before deploying          |
| `npm run format`                                       | Format the entire project using Prettier              |
| `npm run lint`                                         | Check the project for any linting issues using ESLint |
| `docker build -t innoscripta-news-feed .`              | Build the project for production using Docker         |
| `docker run -p [HOST_PORT]:3000 innoscripta-news-feed` | Run the production build image after build    |

## Contributing
This project is made only for the case study. There are currently no automated tests available. Thus the project is not open to further modifications.

