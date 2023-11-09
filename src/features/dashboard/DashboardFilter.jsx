import Filter from '../../ui/Filter';

function DashboardFilter() {
  return (
    <Filter
      filterName="last"
      options={[
        { filter: '7', label: 'Last 7 days' },
        { filter: '30', label: 'Last 30 days' },
        { filter: '90', label: 'Last 90 days' },
      ]}
    />
  );
}

export default DashboardFilter;
