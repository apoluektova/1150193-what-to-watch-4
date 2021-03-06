import * as React from "react";

interface Props {
  onShowMoreButtonClick: () => void;
}

const ShowMoreButton: React.FunctionComponent<Props> = (props: Props) => {
  const {onShowMoreButtonClick} = props;

  return (
    <button
      className="catalog__button"
      type="button"
      onClick={onShowMoreButtonClick}
    >Show more</button>
  );
};

export default ShowMoreButton;
