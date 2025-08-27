# TaskFlow Frontend

A React + Next.js frontend for TaskFlow, featuring:

- Task board with drag-and-drop (Todo / In Progress / Done)
- Redux Toolkit for state management
- Real-time notifications via Socket.IO
- Search/filter with debouncing
- Shadcn/UI for components
- Framer Motion animations
- Fully responsive design

## Installation

```bash
# Clone repo
git clone <frontend-repo-url>
cd frontend

# Install dependencies
npm install      # or yarn / pnpm install

# Run development server
npm run dev
```

## Environment Variables

Create a .env.local file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Features

- Drag & drop tasks across columns

- Search tasks with debounce

- Real-time notifications with type-based icons

- Notifications auto-remove after 8 seconds

- Mark notifications as read / mark all as read

- Socket.IO integration with backend task events

## Scripts

```bash
npm run dev       # start development server
npm run build     # build production
npm run start     # run production server
```

## Tech Stack

- Vite + React

- Redux Toolkit

- Socket.IO-client

- Shadcn/UI

- Framer Motion
