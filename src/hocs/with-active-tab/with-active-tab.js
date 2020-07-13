import React, {PureComponent} from "react";
import {Tabs} from "../../const.js";

const withActiveTab = (Component) => {
  class WithActiveTab extends PureComponent {
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
