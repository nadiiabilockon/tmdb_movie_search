import React from 'react';
import {
  Container
} from 'semantic-ui-react'
import MovieView from "./pages/MovieView";

function App() {
  return (
    <div className="outer-container">
      <Container>
        <MovieView />
      </Container>
    </div>
  );
}

export default App;
