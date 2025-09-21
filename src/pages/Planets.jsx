import EntityList from '../components/EntityList';

const Planets = () => {
  return (
    <div>
      <h2 className="mb-4 text-warning">Planetas</h2>
      <EntityList type="planets" />
    </div>
  );
};

export default Planets;