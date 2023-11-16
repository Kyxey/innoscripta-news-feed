import Icon from "components/Icon";

function Loading() {
  return (
    <div className="text-center flex flex-col items-center justify-center text-gray-400 ">
      <div className="w-12">
        <Icon type="Loading" />
      </div>
      <p className="text-xl mt-3 text-center animate-pulse">Loading...</p>
    </div>
  );
}

export default Loading;
