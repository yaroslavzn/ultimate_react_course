import CabinTable from '../features/cabins/CabinTable';
import CabinsTableOperations from '../features/cabins/CabinsTableOperations';
import CreateCabin from '../features/cabins/CreateCabin';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>

        <CabinsTableOperations></CabinsTableOperations>
      </Row>

      <Row>
        <CabinTable />

        <div>
          <CreateCabin />
        </div>
      </Row>
    </>
  );
}

export default Cabins;
