import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { useFavorites } from '../context/FavoritesContext';

const NavigationBar = () => {
  const { favorites } = useFavorites();
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <i className="fab fa-jedi-order me-2"></i>
          <span className="fw-bold">Blog de Star Wars</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/people">Personajes</Nav.Link>
            <Nav.Link as={Link} to="/planets">Planetas</Nav.Link>
            <Nav.Link as={Link} to="/vehicles">Vehículos</Nav.Link>
          </Nav>
          
          <Nav>
            <Nav.Link as={Link} to="/favorites" className="btn btn-warning position-relative">
              <i className="fas fa-heart me-1"></i> Favoritos
              {favorites.length > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {favorites.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;