# N

This is an app that helps users compare the commit activity of public GitHub repositories. It aims to assist users in determining which open-source library is the safest bet for their project.

## Tech Stack

- React.js
- TailwindCSS
- Nivo for graphics charts

## How to Run the App

1. Clone the repository
2. Navigate to the project directory
3. Create an .env file with REACT_APP_API_KEY and `your_token`
4. Run `npm install` to install dependencies
5. Run `npm start` to start the development server
6. Open `http://localhost:3000` in your browser


## Project Structure

- `MainContainer.js`: The main container that houses other components and manages state.
- `RepositoryCommitGraph.js`: Component to render the commit graph.
- `RepositoryAutocomplete.js`: Component for the autocomplete search bar.
- `SelectedRepositoryList.js`: Component to display the list of selected repositories.

## Live demo
[link](https://commit.joelbarranco.io/)
