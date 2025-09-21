import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-dark p-5 rounded mb-4">
      <h1 className="display-4 text-warning mb-4">Bienvenido al Blog de Star Wars</h1>
      <p className="lead text-light mb-4">Explora el universo de Star Wars: personajes, planetas, vehículos y más.</p>
      <hr className="my-4 bg-warning" />
      <p className="text-light mb-5">Usa la navegación para explorar diferentes secciones y guarda tus elementos favoritos.</p>
      
      <Row>
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center bg-secondary text-light">
            <Card.Body className="d-flex flex-column">
              <i className="fas fa-users fa-3x text-warning mb-3"></i>
              <Card.Title>Personajes</Card.Title>
              <Card.Text>Descubre todos los personajes de Star Wars</Card.Text>
              <Button as={Link} to="/people" variant="warning" className="mt-auto">
                Explorar
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center bg-secondary text-light">
            <Card.Body className="d-flex flex-column">
              <i className="fas fa-globe-americas fa-3x text-warning mb-3"></i>
              <Card.Title>Planetas</Card.Title>
              <Card.Text>Explora los planetas del universo Star Wars</Card.Text>
              <Button as={Link} to="/planets" variant="warning" className="mt-auto">
                Explorar
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center bg-secondary text-light">
            <Card.Body className="d-flex flex-column">
              <i className="fas fa-space-shuttle fa-3x text-warning mb-3"></i>
              <Card.Title>Vehículos</Card.Title>
              <Card.Text>Conoce las naves y vehículos de Star Wars</Card.Text>
              <Button as={Link} to="/vehicles" variant="warning" className="mt-auto">
                Explorar
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;