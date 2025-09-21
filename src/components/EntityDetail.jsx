import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Spinner, Alert, Button, ListGroup, Badge } from 'react-bootstrap';
import { useFavorites } from '../context/FavoritesContext';

const EntityDetail = ({ type }) => {
  const { id } = useParams();
  const [entity, setEntity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedData, setRelatedData] = useState({});
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  
  useEffect(() => {
    const fetchEntity = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
        const data = await response.json();
        setEntity(data.result);
        
        // Obtener datos relacionados
        await fetchRelatedData(data.result.properties);
      } catch (error) {
        console.error(`Error fetching ${type} details:`, error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedData = async (properties) => {
      const data = {};
      
      // Obtener nombre del planeta de origen
      if (properties.homeworld) {
        try {
          const response = await fetch(properties.homeworld);
          const planetData = await response.json();
          data.homeworld = planetData.result.properties.name;
        } catch (error) {
          console.error('Error fetching homeworld:', error);
          data.homeworld = 'Desconocido';
        }
      }
      
      // Obtener nombres de vehículos
      if (properties.vehicles && properties.vehicles.length > 0) {
        data.vehicles = [];
        for (const vehicleUrl of properties.vehicles) {
          try {
            const response = await fetch(vehicleUrl);
            const vehicleData = await response.json();
            data.vehicles.push(vehicleData.result.properties.name);
          } catch (error) {
            console.error('Error fetching vehicle:', error);
          }
        }
      }
      
      // Obtener nombres de naves estelares
      if (properties.starships && properties.starships.length > 0) {
        data.starships = [];
        for (const starshipUrl of properties.starships) {
          try {
            const response = await fetch(starshipUrl);
            const starshipData = await response.json();
            data.starships.push(starshipData.result.properties.name);
          } catch (error) {
            console.error('Error fetching starship:', error);
          }
        }
      }
      
      // Obtener nombres de películas
      if (properties.films && properties.films.length > 0) {
        data.films = [];
        for (const filmUrl of properties.films) {
          try {
            const response = await fetch(filmUrl);
            const filmData = await response.json();
            data.films.push(filmData.result.properties.title);
          } catch (error) {
            console.error('Error fetching film:', error);
          }
        }
      }
      
      setRelatedData(data);
    };

    fetchEntity();
  }, [type, id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-4">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  if (!entity) {
    return (
      <Alert variant="danger">Elemento no encontrado</Alert>
    );
  }

  const isFav = isFavorite(entity._id);
  const handleFavoriteClick = () => {
    if (isFav) {
      removeFavorite(entity._id);
    } else {
      addFavorite({ ...entity.properties, _id: entity._id, uid: entity.uid, type });
    }
  };

  // Definir iconos temáticos según el tipo de entidad
  const renderThemedIcons = () => {
    switch(type) {
      case 'people':
        return (
          <div className="text-center">
            <i className="fas fa-jedi fa-4x text-warning mb-4"></i>
            <i className="fas fa-lightSaber fa-4x text-info mb-4 d-block"></i>
            <i className="fab fa-galactic-republic fa-4x text-light mb-4 d-block"></i>
            <i className="fas fa-hand-fist fa-4x text-danger mb-4 d-block"></i>
          </div>
        );
      case 'planets':
        return (
          <div className="text-center">
            <i className="fas fa-mountain fa-4x text-warning mb-4"></i>
            <i className="fas fa-water fa-4x text-info mb-4 d-block"></i>
            <i className="fas fa-tree fa-4x text-success mb-4 d-block"></i>
            <i className="fas fa-cloud fa-4x text-light mb-4 d-block"></i>
          </div>
        );
      case 'vehicles':
        return (
          <div className="text-center">
            <i className="fas fa-space-shuttle fa-4x text-warning mb-4"></i>
            <i className="fas fa-fighter-jet fa-4x text-info mb-4 d-block"></i>
            <i className="fas fa-ship fa-4x text-light mb-4 d-block"></i>
            <i className="fas fa-rocket fa-4x text-danger mb-4 d-block"></i>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <i className="fab fa-galactic-republic fa-4x text-warning mb-4"></i>
            <i className="fab fa-rebel fa-4x text-info mb-4 d-block"></i>
            <i className="fab fa-empire fa-4x text-light mb-4 d-block"></i>
            <i className="fas fa-star-of-death fa-4x text-danger mb-4 d-block"></i>
          </div>
        );
    }
  };

  // Función para formatear las propiedades
  const formatPropertyValue = (key, value) => {
    // Para campos específicos, mostrar datos relacionados
    if (key === 'homeworld' && relatedData.homeworld) {
      return relatedData.homeworld;
    }
    
    if (key === 'vehicles' && relatedData.vehicles) {
      return (
        <div>
          {relatedData.vehicles.map((vehicle, index) => (
            <Badge key={index} bg="secondary" className="me-1 mb-1">
              {vehicle}
            </Badge>
          ))}
        </div>
      );
    }
    
    if (key === 'starships' && relatedData.starships) {
      return (
        <div>
          {relatedData.starships.map((starship, index) => (
            <Badge key={index} bg="info" className="me-1 mb-1">
              {starship}
            </Badge>
          ))}
        </div>
      );
    }
    
    if (key === 'films' && relatedData.films) {
      return (
        <div>
          {relatedData.films.map((film, index) => (
            <Badge key={index} bg="success" className="me-1 mb-1">
              {film}
            </Badge>
          ))}
        </div>
      );
    }
    
    // Para URLs simples, mostrar solo el último segmento
    if (typeof value === 'string' && value.startsWith('http')) {
      const segments = value.split('/');
      return segments[segments.length - 2]; // Obtener el ID
    }
    
    // Para otros valores, devolver tal cual
    return value;
  };

  return (
    <Row>
      <Col md={5} className="text-center">
        <div className="bg-dark p-4 rounded h-100 d-flex flex-column justify-content-center">
          <h3 className="text-warning mb-4">Universo Star Wars</h3>
          {renderThemedIcons()}
          <div className="mt-4">
            <p className="text-light">
              <i className="fas fa-quote-left text-warning me-2"></i>
              Que la Fuerza te acompañe
              <i className="fas fa-quote-right text-warning ms-2"></i>
            </p>
          </div>
        </div>
      </Col>
      <Col md={7}>
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h2 className="text-warning mb-0">{entity.properties.name}</h2>
            <small className="text-light">
              {type === 'people' && 'Personaje de Star Wars'}
              {type === 'planets' && 'Planeta del universo Star Wars'}
              {type === 'vehicles' && 'Vehículo de Star Wars'}
            </small>
          </div>
          <Button 
            variant={isFav ? "danger" : "outline-warning"}
            onClick={handleFavoriteClick}
          >
            <i className={`fas fa-heart ${isFav ? 'text-white' : ''}`}></i>
            {isFav ? ' Quitar' : ' Favorito'}
          </Button>
        </div>
        
        <h4 className="text-warning mb-3">Detalles</h4>
        <ListGroup variant="flush" className="mb-4">
          {Object.entries(entity.properties)
            .filter(([key]) => !['name', 'created', 'edited', 'url'].includes(key))
            .map(([key, value]) => (
              <ListGroup.Item key={key} className="bg-dark text-light">
                <strong>
                  <i className="fas fa-jet-fighter me-2 text-warning"></i>
                  {key.replace(/_/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase())}:
                </strong>{' '}
                {formatPropertyValue(key, value)}
              </ListGroup.Item>
            ))
          }
          
          {/* Campos adicionales de la API */}
          <ListGroup.Item className="bg-dark text-light">
            <strong><i className="fas fa-calendar-plus me-2 text-warning"></i>Creado:</strong> {new Date(entity.properties.created).toLocaleDateString()}
          </ListGroup.Item>
          <ListGroup.Item className="bg-dark text-light">
            <strong><i className="fas fa-calendar-alt me-2 text-warning"></i>Editado:</strong> {new Date(entity.properties.edited).toLocaleDateString()}
          </ListGroup.Item>
        </ListGroup>
        
        <div>
          <Button as={Link} to={`/${type}`} variant="warning">
            <i className="fas fa-arrow-left me-1"></i> Volver al listado
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default EntityDetail;