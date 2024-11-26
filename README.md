# Hydra Control Bar Starter Template

Users don't need to learn how to use your app!

This is a starter template for adding natural language control to your application using [Hydra AI](https://www.usehydra.ai). It demonstrates how to use a command palette-style control bar that allows users to interact with your application using natural language.

Live demo [here](https://control-bar.usehydra.ai)

![Demo of Hydra Control Bar](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXdoM2g1ZnQ5eHB4dHJrYXVvbG9ncnpwYW02cG1yZGJiczJpdGdncCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tb2TWi1QOs1FhmeGoO/giphy.gif)

Add the control bar to your project with `npx hydra-ai-cli add control-bar`. This will add the control bar component to your project and guide you through Hydra configuration.

## Control Bar Component

The control bar is implemented in `src/components/control-bar.tsx`. It provides a simple, customizable command palette that can be activated with a keyboard shortcut or clicked on the screen.

Copy and paste the control bar component into your project and customize!

## Demo Components

The template includes a sample CRM application with components related to the following tasks:

- Lead Management
- Meeting Scheduling
- Messaging System
- Notes System

They can be used through the control bar, or through the dashboard 'traditional UI'.

## Getting Started

1. First, install the dependencies:

```bash
npm install
```

2. Then, create a `.env.local` file in the root directory and add your Hydra API key (generate one at https://www.usehydra.ai/dashboard):

```bash
NEXT_PUBLIC_HYDRA_API_KEY=your_api_key_here
```

3. Run the development server:

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

## Registering Your Own Components

1. Create your component in the `src/components/searchable-components` directory
2. Register it with Hydra in `src/hydra-config.ts`:

```typescript
await hydra.registerComponent({
    name: "component-name",
    description: "Description of what the component does and when it should be used",
    component: YourComponent,
    propsDefinition: { 
        prop1: "string", 
        prop2: "number" 
    },
    contextTools: [optionalContextTools],
    loadingComponent: LoadingSkeletonComponent
});
```

3. The component will now be available through natural language commands in the Control Bar

## Project Structure

- `/src/components/control-bar.tsx` - Main Control Bar implementation
- `/src/hydra-config.ts` - Hydra AI client configuration and component registration
- `/src/components/searchable-components` - Example components that can be accessed via the Control Bar
- `/src/store` - State management using Zustand
- `/src/services` - API and data services

## Learn More

- [Hydra AI Documentation](https://github.com/michaelmagan/hydraai)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this template for your own projects.
