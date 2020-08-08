import * as React from "react";
import {Subtract} from "utility-types";
import {Tabs} from "../../const";

interface State {
  activeTab: string;
}

interface InjectingProps {
  activeTab: string;
  onTabClick: (clickedTab: string) => void;
}

const withActiveTab = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithActiveTab extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: Tabs.OVERVIEW,
      };

      this._handleTabClick = this._handleTabClick.bind(this);
    }

    _handleTabClick(clickedTab) {
      this.setState({
        activeTab: clickedTab,
      });
    }

    render() {
      const {activeTab} = this.state;

      return (<Component
        {...this.props}
        activeTab={activeTab}
        onTabClick={this._handleTabClick}
      />);
    }
  }

  return WithActiveTab;
};

export default withActiveTab;
