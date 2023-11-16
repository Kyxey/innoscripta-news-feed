import Icon from "components/Icon";

type Props = {
  imageLink: string;
  title: string;
  description: string;
  author: string;
  category: string;
  date: Date;
  source: string;
  url: string;
};

const classNames = {
  titleWithIcon: "text-sm flex flex-row items-center mr-3",
  icons: "w-3 mr-1",
};

function Card({
  imageLink,
  title,
  description,
  author,
  category,
  date,
  source,
  url,
}: Props) {
  return (
    <a
      href={url}
      target="_blank"
      className="flex flex-col lg:flex-row justify-start shadow hover:shadow-lg border border-gray-400 max-h-fit mx-3 lg:mx-0 lg:max-h-48 will-change-transform hover:scale-105 transition bg-white">
      <img
        src={imageLink}
        alt={`Innoscripta News - ${title} image`}
        className="w-100 lg:w-52"
      />
      <div className="flex flex-col items-start p-3 justify-between">
        <p className="text-2xl text-innoscripta">{title}</p>
        <p className={classNames.titleWithIcon}>
          <span className={classNames.icons}>
            <Icon type="Person" />
          </span>{" "}
          {author}
        </p>
        <p className={classNames.titleWithIcon}>
          <span className={classNames.icons}>
            <Icon type="Date" />
          </span>{" "}
          {date.toLocaleString()}
        </p>
        <div className="text-base text-left text-gray-600 max-h-12 max-w-md text-ellipsis overflow-hidden">
          <p>{description}</p>
        </div>
        <div className="flex flex-row">
          <p className={classNames.titleWithIcon}>
            <span className={classNames.icons}>
              <Icon type="Globe" />
            </span>{" "}
            {source}
          </p>
          <p className={classNames.titleWithIcon}>
            <span className={classNames.icons}>
              <Icon type="Category" />
            </span>{" "}
            {category}
          </p>
        </div>
      </div>
    </a>
  );
}

export default Card;
