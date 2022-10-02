export const COLUMNS = [
  {
    Header: "DESTINATION",
    accessor: "pname",
    Cell: (e) => <h4 className="text-sm text-gray-900 ">{e.value}</h4>,
  },

  {
    Header: "DATE",
    accessor: "title",
    Cell: (e) => <h4 className="font-semibold text-gray-900 ">{e.value}</h4>,
  },
  {
    Header: "PRICE",
    accessor: "like",
    Cell: (e) => (
      <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
        {e.value}
      </span>
    ),
  },
  {
    Header: "CURRENCY",
    accessor: "comment",
  },
];
