import * as React from "react";

interface Props {
  tabTitle: string;
  onTabClick: (tabTitle) => void;
  activeTab: string;
};

const Tab: React.FunctionComponent<Props> = (props: Props) => {
  const {tabTitle, onTabClick, activeTab} = props;
  const activeClass = `movie-nav__item ${tabTitle === activeTab ? `movie-nav__item--active` : ``}`;

  const handleTabClick = () => {
    return (evt) => {
      evt.preventDefault();
      onTabClick(tabTitle);
    };
  };

  return (
    <li className={activeClass}>
      <a
        href="#"
        className="movie-nav__link"
        onClick={handleTabClick()}>{tabTitle}</a>
    </li>
  );
};

export default Tab;

