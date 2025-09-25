# AI Development Guide for Issue Tracking App

## Project Overview
This is a React + TypeScript + Vite application for issue tracking, built using Power SDK. The app follows a clean architecture with clear separation of concerns between components, services, and types.

## Power SDK Integration

### CLI Commands
```bash
# Initialize a new app
pac code init -n <app name> -env <environmentId>

# Add a data source
pac code add-data-source -a <apiId> -c <connectionId>

# Add data source with table/dataset
pac code add-data-source -a <apiId> -c <connectionId> -t <tableName> -d <datasetName>

# Build and publish
npm run build
pac code push
```

## Key Architecture Patterns

### Data Models and Types
- Core types are defined in `src/types/` - see `Issue.ts` for the main data model
- Use TypeScript enums/unions for constrained fields (e.g., status, priority)
- Models should include proper type definitions and interfaces

### Service Layer Pattern 
- Services follow the Singleton pattern (see `IssueService.ts`)
- Services handle data fetching, filtering, and state management
- API calls are centralized in service classes
- Use type-safe method signatures and return types

### Component Structure
- Components are in `src/components/`
- Each component focuses on a single responsibility
- Props are properly typed with TypeScript interfaces
- Use functional components with React hooks

### State Management
- Local component state for UI-specific state
- Service layer for data management
- Props drilling is acceptable for shallow hierarchies
- Consider context for deeply nested state

## Project Conventions

### File Organization
- Components: `src/components/`
- Services: `src/services/`
- Types: `src/types/`
- Assets: `src/assets/`
- Models/Services: `.power/schemas/` for Power SDK schemas

### Type Safety
- Prefer TypeScript interfaces over types
- Use strict type checking
- Avoid `any` - use proper type definitions
- Leverage union types for enums

### Component Guidelines
- Keep components focused and small
- Use TypeScript for props and state
- Implement error boundaries where needed
- Follow React hooks rules

### Error Handling
- Use try-catch in service methods
- Log errors with appropriate context
- Provide user-friendly error messages
- Handle loading and error states in UI

## Key Files
- `src/types/Issue.ts` - Core data model
- `src/services/IssueService.ts` - Data management
- `src/PowerProvider.tsx` - SDK initialization
- `vite.config.ts` - Build configuration