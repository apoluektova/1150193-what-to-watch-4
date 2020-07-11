import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withActiveItem = (Component) => {
  class withActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null,
      };
    }

    handleActiveItemClick() {
      this.setState({
        activeItem: 
      });
    }

    render() {
      return (<Component
        {...this.props}
      />);
    }
  }

  withActiveItem.propTypes = {

  };

  return WithActiveItem;
};

export default withActiveItem;
