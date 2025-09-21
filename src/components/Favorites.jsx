import { Row, Col, Alert } from 'react-bootstrap';
import { useFavorites } from '../context/FavoritesContext';
import EntityCard from './EntityCard';

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();
  
  if (favorites.length === 0) {
    return (
      <Alert variant="info">
        No tienes elementos favoritos todavía. ¡Agrega algunos!
      </Alert>
    );
  }

  return (
    <Row className="g-4">
      {favorites.map(item => (
        <Col key={item._id} md={6} lg={4}>
          <EntityCard item={item} type={item.type} />
        </Col>
      ))}
    </Row>
  );
};

export default Favorites;