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
      active: false,
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
    const { value } = this.props;
    const { active } = this.state;
    return (
      <div onClick={this.active} role="button">
        {active ? <input onBlur={this.inactive} /> : value}
      </div>
    );
  }
}

export { Cell };
