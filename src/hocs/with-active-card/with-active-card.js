import React, {PureComponent} from "react";

const withActiveCard = (Component) => {
  class WithActiveCard extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeCard: null,
      };

      this._handleActiveCardChange = this._handleActiveCardChange.bind(this);
    }

    _handleActiveCardChange(currentCard) {
      this.setState({
        activeCard: currentCard,
      });
    }

    render() {
      return (<Component
        {...this.props}
        onActiveCardChange={this._handleActiveCardChange}
      />);
    }
  }

  return WithActiveCard;
};

export default withActiveCard;
