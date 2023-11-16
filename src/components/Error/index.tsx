function Error() {
  return (
    <div className="text-center flex flex-col items-center justify-center text-red-600">
      <div className="w-12">
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 120 120">
          <g>
            <g>
              <g>
                <path
                  className="fill-current"
                  d="M0,0v120h120V0H0z M106.8,6.5c2.2,0,3.9,1.7,3.9,3.9c0,2.1-1.7,3.9-3.9,3.9c-2.1,0-3.9-1.7-3.9-3.9
				C102.9,8.3,104.7,6.5,106.8,6.5z M93.3,6.5c2.1,0,3.9,1.7,3.9,3.9c0,2.1-1.7,3.9-3.9,3.9c-2.2,0-3.9-1.7-3.9-3.9
				C89.4,8.3,91.1,6.5,93.3,6.5z M110.7,110.9H9.3V22.7h101.4L110.7,110.9L110.7,110.9z"
                />
                <path
                  className="fill-current"
                  d="M60,105.7c21.3,0,38.5-17.2,38.5-38.5S81.3,28.6,60,28.6c-21.3,0-38.5,17.3-38.5,38.5
				C21.5,88.4,38.7,105.7,60,105.7z M37.6,52.6l7.8-7.8L60,59.4l14.6-14.6l7.8,7.8L67.8,67.2l14.6,14.6l-7.8,7.8L60,74.9L45.4,89.5
				l-7.8-7.8l14.6-14.6L37.6,52.6z"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
      <p className="text-xl mt-3 text-center">
        There was an error processing your request. Please try reloading the
        page.
      </p>
    </div>
  );
}

export default Error;
