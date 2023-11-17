import Icon from "components/Icon";

function SearchNotFound() {
  return (
    <div className="text-center flex flex-col items-center justify-start text-gray-500">
      <div className="w-12">
        <Icon type="SearchNotFound" />
      </div>
      <p className="text-xl mt-3 text-center">
        Sorry! There are no results to show.
      </p>
    </div>
  );
}

export default SearchNotFound;
