function Loading() {
  return (
    <div className="text-center flex flex-col items-center justify-center text-gray-400 ">
      <div className="w-12">
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 120 120"
          className="fill-current animate-spin">
          <path
            d="M21.4,51.8h-7.3C17.5,32.6,32.6,17.5,51.8,14v7.4C36.5,24.6,24.6,36.5,21.4,51.8z M60,2.5v18c21.9,0,39.5,17.7,39.5,39.5
	S81.9,99.5,60,99.5S20.5,81.9,20.5,60h-18c0,31.7,25.8,57.5,57.5,57.5s57.5-25.8,57.5-57.5S91.7,2.5,60,2.5z"
          />
        </svg>
      </div>
      <p className="text-xl mt-3 text-center animate-pulse">Loading...</p>
    </div>
  );
}

export default Loading;
