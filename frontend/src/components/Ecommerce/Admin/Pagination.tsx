const Pagination = ({
  page,
  totalPages,
  setPage,
}: any) => {
  return (
    <div className="p-5 border-t flex justify-between">

      <p className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </p>

      <div className="flex gap-2">

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 border rounded-xl ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        >
          Prev
        </button>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className={`px-4 py-2 border rounded-xl ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default Pagination;