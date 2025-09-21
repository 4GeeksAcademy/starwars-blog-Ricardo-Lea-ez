import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from './components/Navbar';
import Home from './components/Home';
import People from './pages/People';
import Planets from './pages/Planets';
import Vehicles from './pages/Vehicles';
import EntityDetail from './components/EntityDetail';
import Favorites from './components/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
      <NavigationBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />} />
          <Route path="/planets" element={<Planets />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/people/:id" element={<EntityDetail type="people" />} />
          <Route path="/planets/:id" element={<EntityDetail type="planets" />} />
          <Route path="/vehicles/:id" element={<EntityDetail type="vehicles" />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Container>
    </FavoritesProvider>
  );
}

export default App;