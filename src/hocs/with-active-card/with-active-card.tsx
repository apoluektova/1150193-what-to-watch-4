import * as React from "react";
import {Subtract} from "utility-types";
import {Movie} from "../../types";

interface State {
  activeCard: null | Movie;
}

interface InjectingProps {
  activeCard: null | Movie;
  onActiveCardChange: (currentCard: Movie) => void;
}

const withActiveCard = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithActiveCard extends React.PureComponent<T, State> {
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
      const {activeCard} = this.state;

      return (<Component
        {...this.props}
        activeCard={activeCard}
        onActiveCardChange={this._handleActiveCardChange}
      />);
    }
  }

  return WithActiveCard;
};

export default withActiveCard;
