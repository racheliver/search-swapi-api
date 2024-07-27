# Star Wars Search Application

This is a Star Wars-themed search application built using React, TypeScript, and Vite. The application allows users to search for Star Wars characters, planets, and other entities. The project includes categorized search results and a detailed category page.

## Features

- Star Wars-themed design
- Search with autocomplete functionality
- Categorized search results
- Detailed category pages with tables
- Add, edit, and delete characters locally

## Technologies Used

- React
- TypeScript
- Vite
- Material-UI
- Redux
- React Router
- Testing Library
- Vitest

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/racheliver/search-swapi-api.git
    ```
2. Navigate into the project directory:
    ```bash
    cd star-wars-search
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Run the tests:
    ```bash
    npm test
    ```

## Usage
1. Start the development server:
    ```bash
    npm run dev
    ```
2. Open `http://localhost:5173` in your browser to view the application.

## Features
- **Search Functionality**: Allows users to search for Star Wars characters, planets, films, species, starships, and vehicles. Results are displayed with highlighted query terms.
- **Dynamic Header**: Includes a Star Wars-themed header with a rotating image carousel.
- **Category Management**: View and manage entities in categories such as People, Planets, Films, Species, Starships, and Vehicles.
- **CRUD Operations**: Create, update, and delete entities with form management.
- **Error Handling**: Snackbar notifications for API errors.
- **Responsive Design**: Designed with Material-UI and styled-components to be responsive across devices.

## Code Overview

### API Utilities
- `ENTITY_DEFINITIONS`: Defines entity types, titles, and attributes.
- `retrieveEntityData(entity: string): Promise<IItem[]>`: Fetches data for a specific entity from the Star Wars API.
- `fetchEntityDataAndSetState(entity: string, setState: (data: IItem[]) => void): Promise<void>`: Fetches and sets data in the application state.
- `initializeSearchResults()`: Initializes the search results state.

### Custom Hooks
- `useCategory`: Manages state and effects for category views. Handles data fetching, form management, and item removal.
- `useForm`: Manages form state for add, update, and delete operations.
- `useSearch`: Handles search queries, manages query results, and error states.

### Context and Reducer
- `ItemContext`: Provides a context for managing item state across the application.
- `itemReducer`: Handles actions for adding, editing, deleting, and setting category data.

### Components
- `Search`: Search bar component with autocomplete and results display.
- `SearchDisplay`: Displays search results with query highlighting.
- `Header`: Includes a rotating image carousel and navigation button.
- `Category`: Displays items in a table format with CRUD operations and form handling.
- `TableHeader`: Renders table headers with formatted attribute names.
- `TableRow`: Displays individual rows in a table with actions for editing and deleting items.

## Test Files

The tests are organized to cover functional, unit, and integration aspects of the application.

### Functional Tests

- **ItemContext.test.tsx**: Tests for the `ItemContext` to ensure it provides the correct initial state, and handles state changes correctly when dispatching actions.

- **Search.test.tsx**: Tests for the `Search` component, including rendering the search input, updating the query on input change, displaying a loading indicator, and showing error messages.

- **Header.test.tsx**: Tests for the `Header` component, including rendering the header with logo and buttons, navigation, and image change on interval.

### Unit Tests

- **manipulationString.test.tsx**: Tests for the `manipulationString` helper function, covering various string manipulation operations like applying query style, formatting attribute names, capitalizing characters, and generating unique IDs.

- **TableHeader.test.tsx**: Tests for the `TableHeader` component to ensure it renders headers correctly and formats headers with underscores.

- **TableRow.test.tsx**: Tests for the `TableRow` component, ensuring it renders row data correctly, and handles opening and closing of forms for edit and delete actions.

### Integration Tests

- **ItemContext.test.tsx**: (Also functional) Tests how `ItemContext` integrates with the application state and actions.

- **Search.test.tsx**: (Also functional) Tests how the `Search` component integrates with the search context and hooks.

- **Header.test.tsx**: (Also functional) Tests how the `Header` component integrates with routing and other components.


## Contributing
Feel free to submit pull requests or open issues to contribute to the project. Please follow the guidelines for contributing and code style.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



