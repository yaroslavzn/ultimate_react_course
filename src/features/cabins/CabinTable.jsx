import { useSearchParams } from 'react-router-dom';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Empty from '../../ui/Empty';

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cabins.length) {
    return <Empty resource="cabins" />;
  }

  const discountFilter = searchParams.get('discount') || 'all';
  const [fieldName, direction] = (
    searchParams.get('sortBy') || 'name-asc'
  ).split('-');
  let filteredCabins;

  switch (discountFilter) {
    case 'no-discount': {
      filteredCabins = cabins.filter((cabin) => !cabin.discount);
      break;
    }
    case 'with-discount': {
      filteredCabins = cabins.filter((cabin) => cabin.discount !== 0);
      break;
    }
    default: {
      filteredCabins = cabins;
    }
  }

  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[fieldName] - b[fieldName]) * modifier
  );

  return (
    <Menus>
      <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
};

export default CabinTable;
