import Icon from "components/Icon";

function Error() {
  return (
    <div className="text-center flex flex-col items-center justify-center text-red-600">
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
