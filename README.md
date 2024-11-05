# Hydra Control Bar Starter Template

This is a starter template for building applications with natural language control using [Hydra AI](https://github.com/michaelmagan/hydraai). It demonstrates how to use a command palette-style control bar that allows users to interact with your application using natural language.

## Control Bar Component

The control bar is implemented in `src/components/control-bar.tsx`. It provides a simple, customizable command palette that can be activated with a keyboard shortcut or clicked on the screen.

Copy and paste the control bar component into your project and customize!

## Demo Components

The template includes a sample CRM application with the following components:

- Lead Management
- Meeting Scheduling
- Messaging System
- Notes System

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, create a `.env.local` file in the root directory and add your Hydra API key:

```bash
NEXT_PUBLIC_HYDRA_API_KEY=your_api_key_here
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Using the Control Bar

The Control Bar can be activated in two ways:
1. Click the control bar 
2. Press `⌘K` (Mac) or `Ctrl+K` (Windows/Linux)

Try these example commands:
- "Add a new lead"
- "Show me all my leads"
- "Schedule a meeting"
- "Create a new message"

## Implementing Your Own Components

1. Create your component in the `src/components/searchable-components` directory
2. Register it with Hydra in `src/hydra-client.ts`:

```typescript
await hydra.registerComponent(
    "component-name",
    "Description of what the component does",
    YourComponent,
    { prop1: "string", prop2: "number" },
    [optionalContextTools]
);
```

3. The component will now be available through natural language commands in the Control Bar

## Project Structure

- `/src/components/control-bar.tsx` - Main Control Bar implementation
- `/src/hydra-client.ts` - Hydra AI client configuration and component registration
- `/src/components/searchable-components` - Example components that can be accessed via the Control Bar
- `/src/store` - State management using Zustand
- `/src/services` - API and data services

## Learn More

- [Hydra AI Documentation](https://github.com/michaelmagan/hydraai)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this template for your own projects.
