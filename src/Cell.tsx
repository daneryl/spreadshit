import React from 'react';

interface cellProps {
  value: string;
}

type cellState = {
  active: boolean;
};

class Cell extends React.Component<cellProps, cellState> {
  constructor(props: cellProps) {
    super(props);
    this.state = {
      active: false
    };
    this.active = this.active.bind(this);
    this.inactive = this.inactive.bind(this);
  }

  active() {
    this.setState({ active: true });
  }

  inactive() {
    this.setState({ active: false });
  }

  render() {
    return (
      <div onClick={this.active}>
        {this.state.active ? (
          <input onBlur={this.inactive} />
        ) : (
          this.props.value
        )}
      </div>
    );
  }
}

export { Cell };
