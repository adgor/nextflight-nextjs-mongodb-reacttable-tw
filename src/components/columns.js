export const COLUMNS = [
  {
    Header: "DESTINATION",
    accessor: "pname",
    Cell: (e) => <h4 className="font-semibold">{e.value}</h4>,
  },

  {
    Header: "DATE",
    accessor: "title",
    Cell: (e) => <h4 className="font-semibold ">{e.value}</h4>,
  },
  {
    Header: "PRICE",
    accessor: "like",
    Cell: (e) => (
      <span className="inline-flex px-3 font-semibold leading-5 text-green-500 border rounded-full border-green-300/50">
        {e.value}
      </span>
    ),
  },
  {
    Header: "CURRENCY",
    accessor: "comment",
  },
];
