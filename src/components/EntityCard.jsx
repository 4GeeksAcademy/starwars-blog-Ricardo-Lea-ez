import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const EntityCard = ({ item, type }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isFav = isFavorite(item._id);
  
  const handleFavoriteClick = () => {
    if (isFav) {
      removeFavorite(item._id);
    } else {
      addFavorite({ ...item, type });
    }
  };
  
  // Definir iconos según el tipo
  const getIcon = () => {
    switch(type) {
      case 'people':
        return <i className="fas fa-user fa-3x text-warning mb-3"></i>;
      case 'planets':
        return <i className="fas fa-globe-americas fa-3x text-warning mb-3"></i>;
      case 'vehicles':
        return <i className="fas fa-space-shuttle fa-3x text-warning mb-3"></i>;
      default:
        return <i className="fas fa-question fa-3x text-warning mb-3"></i>;
    }
  };
  
  return (
    <Card className="h-100 position-relative bg-dark text-light">
      <div 
        className="favorite-btn position-absolute top-0 end-0 m-2" 
        onClick={handleFavoriteClick}
        style={{zIndex: 10, cursor: 'pointer'}}
      >
        <i className={`fas fa-heart ${isFav ? 'text-danger' : 'text-white'}`}></i>
      </div>
      
      <Card.Body className="d-flex flex-column text-center">
        {getIcon()}
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          {type === 'people' && `Género: ${item.gender}, Nacimiento: ${item.birth_year}`}
          {type === 'planets' && `Clima: ${item.climate}, Población: ${item.population}`}
          {type === 'vehicles' && `Modelo: ${item.model}, Fabricante: ${item.manufacturer}`}
        </Card.Text>
        <Button as={Link} to={`/${type}/${item.uid}`} variant="warning" className="mt-auto">
          Ver detalles
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EntityCard;