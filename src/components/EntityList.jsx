import { useState, useEffect } from 'react';
import { Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import EntityCard from './EntityCard';

const EntityList = ({ type }) => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  useEffect(() => {
    const fetchEntities = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://www.swapi.tech/api/${type}?page=${page}&limit=9`);
        const data = await response.json();
        setEntities(data.results || []);
        setHasNext(!!data.next);
        setHasPrev(!!data.previous);
      } catch (error) {
        console.error(`Error fetching ${type}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntities();
  }, [type, page]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-4">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  return (
    <div>
      <Row className="g-4">
        {entities.length > 0 ? (
          entities.map(entity => (
            <Col key={entity._id} md={6} lg={4}>
              <EntityCard item={entity} type={type} />
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="warning">No se encontraron resultados</Alert>
          </Col>
        )}
      </Row>
      
      <div className="d-flex justify-content-between mt-4">
        <Button 
          variant="warning" 
          disabled={!hasPrev || page === 1}
          onClick={() => setPage(prev => prev - 1)}
        >
          Anterior
        </Button>
        <span className="text-light">Página {page}</span>
        <Button 
          variant="warning" 
          disabled={!hasNext}
          onClick={() => setPage(prev => prev + 1)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default EntityList;