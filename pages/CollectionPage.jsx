import { CollectionSection } from '../components/CollectionSection';

export const CollectionPage = ({ animals, setSelectedAnimal }) => (
  <div className="pt-20">
    <CollectionSection animals={animals} setSelectedAnimal={setSelectedAnimal} />
  </div>
);
