import EntityList from '../components/EntityList';

const People = () => {
  return (
    <div>
      <h2 className="mb-4 text-warning">Personajes</h2>
      <EntityList type="people" />
    </div>
  );
};

export default People;