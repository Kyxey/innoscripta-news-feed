import Icon from "components/icon";

function Error() {
  return (
    <div className="text-center flex flex-col items-center justify-start text-red-600">
      <div className="w-12">
        <Icon type="Error" />
      </div>
      <p className="text-xl mt-3 text-center">
        There was an error processing your request. Please try reloading the
        page.
      </p>
    </div>
  );
}

export default Error;
