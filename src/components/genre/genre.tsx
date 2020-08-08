import * as React from "react";

interface Props {
  genreName: string;
  onGenreClick: (genreName) => void;
  activeGenre: string;
};

const Genre: React.FunctionComponent<Props> = (props: Props) => {
  const {genreName, onGenreClick, activeGenre} = props;
  const activeClass = `catalog__genres-item ${activeGenre === genreName ? `catalog__genres-item--active` : ``}`;

  return (
    <li className={activeClass}>
      <a
        href="#"
        className="catalog__genres-link"
        onClick={(evt) => {
          evt.preventDefault();
          onGenreClick(genreName);
        }}>
        {genreName}
      </a>
    </li>
  );
};

export default Genre;
