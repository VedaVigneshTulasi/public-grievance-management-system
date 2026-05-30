const Pagination = ({

  currentPage,

  totalPages,

  onPageChange,

}) => {
 
  return (
<div className="flex justify-center items-center gap-4 mt-8">
 
      <button

        disabled={currentPage === 1}

        onClick={() =>

          onPageChange(

            currentPage - 1

          )

        }

        className="bg-[#0B2E59] text-white px-4 py-2 rounded disabled:opacity-50"
>

        Previous
</button>
 
      <span>

        Page {currentPage} of {totalPages}
</span>
 
      <button

        disabled={

          currentPage === totalPages

        }

        onClick={() =>

          onPageChange(

            currentPage + 1

          )

        }

        className="bg-[#0B2E59] text-white px-4 py-2 rounded disabled:opacity-50"
>

        Next
</button>
 
    </div>

  );

};
 
export default Pagination;
 