import EntityList from '../components/EntityList';

const Vehicles = () => {
  return (
    <div>
      <h2 className="mb-4 text-warning">Vehículos</h2>
      <EntityList type="vehicles" />
    </div>
  );
};

export default Vehicles;