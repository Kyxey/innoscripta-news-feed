type Props = {
  currentPage: number;
  totalPages: number;
  nextPageFn: () => void;
  prevPageFn: () => void;
};

const classNames = {
  buttonGeneral: "rounded",
  buttonEnabled: "bg-innoscripta text-white cursor-pointer",
  buttonDisabled:
    "bg-white text-innoscripta border border-innoscripta cursor-not-allowed",
};

function Pagination({
  currentPage,
  totalPages,
  nextPageFn,
  prevPageFn,
}: Props) {
  return (
    <div className="w-full h-max flex justify-between">
      <button
        className={
          classNames.buttonGeneral +
          " " +
          classNames[currentPage === 1 ? "buttonDisabled" : "buttonEnabled"]
        }
        disabled={currentPage === 1}
        onClick={prevPageFn}>
        Prev
      </button>
      <p className="underline text-innoscripta">
        {currentPage} of {totalPages}
      </p>
      <button
        className={
          classNames.buttonGeneral +
          " " +
          classNames[
            currentPage === totalPages ? "buttonDisabled" : "buttonEnabled"
          ]
        }
        disabled={currentPage === totalPages}
        onClick={nextPageFn}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
