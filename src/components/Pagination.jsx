
export default function Pagination({
    currentPage,
    totalPages,
    setCurrentPage
}) {
    function previousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function nextPage() {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div className="pagination">
            <button
                onClick={previousPage}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            <span>
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={nextPage}
                disabled={currentPage >= totalPages}
            >
                Next
            </button>
        </div>
    );
}


