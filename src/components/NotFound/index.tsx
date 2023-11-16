function NotFound() {
  return (
    <div className="text-center flex flex-col items-center justify-center text-violet-900">
      <div className="w-12">
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 120 120"
          className="fill-current">
          <g>
            <path
              d="M18,78h12v16c0,1.1,0.9,2,2,2c1.1,0,2-0.9,2-2V78h6c1.1,0,2-0.9,2-2s-0.9-2-2-2h-6v-4c0-1.1-0.9-2-2-2c-1.1,0-2,0.9-2,2v4
		H20V54c0-1.1-0.9-2-2-2c-1.1,0-2,0.9-2,2v22C16,77.1,16.9,78,18,78z"
            />
            <path
              d="M80,78h12v16c0,1.1,0.9,2,2,2s2-0.9,2-2V78h6c1.1,0,2-0.9,2-2s-0.9-2-2-2h-6v-4c0-1.1-0.9-2-2-2s-2,0.9-2,2v4H82V54
		c0-1.1-0.9-2-2-2s-2,0.9-2,2v22C78,77.1,78.9,78,80,78z"
            />
            <path
              d="M59,96c7.2,0,13-5.8,13-13V65c0-7.2-5.8-13-13-13s-13,5.8-13,13v18C46,90.2,51.8,96,59,96z M50,65c0-5,4-9,9-9s9,4,9,9v18
		c0,5-4,9-9,9s-9-4-9-9V65z"
            />
            <path d="M0,0v28v92h120V28V0H0z M4,4h112v20H4V4z M116,116H4V28h112V116z" />
            <polygon
              points="108.6,6.6 104,11.2 99.4,6.6 96.6,9.4 101.2,14 96.6,18.6 99.4,21.4 104,16.8 108.6,21.4 111.4,18.6 106.8,14 
		111.4,9.4 	"
            />
            <path d="M6,22h78V6H6V22z M10,10h70v8H10V10z" />
          </g>
        </svg>
      </div>
      <p className="text-xl mt-3 text-center">
        Sorry! The page you're looking for doesn't exists.
      </p>
    </div>
  );
}

export default NotFound;
