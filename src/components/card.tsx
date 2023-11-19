import Icon from "components/icon";
import Tooltip from "components/tooltip";

type Source = {
  id: string;
  name: string;
};

type Props = {
  imageLink: string;
  title: string;
  author: string;
  date: Date;
  source: Source;
  url: string;
  isFavoriteSource: boolean;
  isFavoriteAuthor: boolean;
  favoriteAuthorModifyFn: (favoriteAuthor: string) => void;
  favoriteSourceModifyFn: (favoriteSource: Source) => void;
};

const classNames = {
  titleWithIcon: "text-sm flex flex-row items-center mr-3 truncate pr-2",
  icons: "w-3 mr-1",
};

function Card({
  imageLink,
  title,
  author,
  date,
  source,
  url,
  isFavoriteAuthor,
  isFavoriteSource,
  favoriteAuthorModifyFn,
  favoriteSourceModifyFn,
}: Props) {
  return (
    <div className="flex flex-col h-max w-full max-w-full">
      <a
        href={url}
        target="_blank"
        className="text-left flex flex-col lg:flex-row justify-start shadow hover:shadow-lg border border-gray-400 max-h-fit h-fit lg:max-h-48 lg:h-48 will-change-transform w-full max-w-full hover:scale-105 transition bg-white"
        title={title}>
        <img
          src={imageLink}
          alt={`Innoscripta News - ${title} image`}
          className="w-100 lg:w-52"
        />
        <div className="flex flex-col items-start p-3 justify-between max-w-full overflow-hidden">
          <p className="text-xl text-innoscripta">{title}</p>
          <div className="flex flex-col items-start max-w-full truncate">
            {author && (
              <p className={classNames.titleWithIcon}>
                <span className={classNames.icons}>
                  <Icon type="Person" />
                </span>{" "}
                {author}
              </p>
            )}
            <p className={classNames.titleWithIcon}>
              <span className={classNames.icons}>
                <Icon type="Date" />
              </span>{" "}
              {date.toLocaleString()}
            </p>
            <div className="flex flex-row">
              <p className={classNames.titleWithIcon}>
                <span className={classNames.icons}>
                  <Icon type="Globe" />
                </span>{" "}
                {source.name}
              </p>
            </div>
          </div>
        </div>
      </a>
      <div className="flex justify-start space-x-2 h-max p-2">
        <div
          className="cursor-pointer h-6"
          onClick={() => favoriteSourceModifyFn(source)}>
          <Tooltip id="favorite-source" />
          <div
            className={
              "w-5 h-full " +
              (isFavoriteSource ? "text-red-700" : "text-gray-400")
            }
            data-tooltip-id="favorite-source"
            data-tooltip-content={`${
              isFavoriteSource ? "Remove" : "Mark as"
            } favorite source.`}>
            <Icon type="Globe" />
          </div>
        </div>
        {author && (
          <div
            className="cursor-pointer h-6"
            onClick={() => favoriteAuthorModifyFn(author)}>
            <Tooltip id="favorite-author" />
            <div
              className={
                "w-5 h-full " +
                (isFavoriteAuthor ? "text-red-700" : "text-gray-400")
              }
              data-tooltip-id="favorite-author"
              data-tooltip-content={`${
                isFavoriteAuthor ? "Remove" : "Mark as"
              } favorite author.`}>
              <Icon type="Person" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
