import Icon from "components/Icon";

function NotFound() {
  return (
    <div className="text-center flex flex-col items-center justify-start text-violet-900">
      <div className="w-12">
        <Icon type="404NotFound" />
      </div>
      <p className="text-xl mt-3 text-center">
        Sorry! The page you're looking for doesn't exists.
      </p>
    </div>
  );
}

export default NotFound;
