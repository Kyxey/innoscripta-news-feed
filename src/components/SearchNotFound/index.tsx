function SearchNotFound() {
  return (
    <div className="text-center flex flex-col items-center justify-center text-gray-500">
      <div className="w-12">
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 120 120"
          className="fill-current">
          <path
            d="M69.8,29.5L53.7,45.7L37.6,29.5l-8.1,8.1l16.1,16.1L29.5,69.9l8.1,8.1l16.1-16.1l16.1,16.1l8.1-8.1L61.8,53.7l16.1-16.1
	L69.8,29.5z M92.2,83c6.2-8.1,9.9-18.3,9.9-29.3c0-26.7-21.7-48.4-48.4-48.4S5.3,27,5.3,53.7s21.7,48.4,48.4,48.4
	c11.1,0,21.2-3.7,29.4-10l22.5,22.5l9.1-9.1L92.2,83z M52.9,89.2c-20,0-36.2-16.3-36.2-36.3S33,16.6,52.9,16.6s36.3,16.3,36.3,36.3
	S72.8,89.2,52.9,89.2z"
          />
        </svg>
      </div>
      <p className="text-xl mt-3 text-center">
        Sorry! There are no results to show.
      </p>
    </div>
  );
}

export default SearchNotFound;
