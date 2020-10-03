import React from 'react';
import { Column } from './Column';
import { Input } from './Input';

interface cellProps {
  value: string;
  rawValue: string;
  onChange: (e: any) => void;
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
    const { value, rawValue, onChange } = this.props;
    const { active } = this.state;

    return (
      <Column
        onClick={this.active}
        onFocus={this.active}
        tabIndex={0}
        role="button"
      >
        {active ? (
          <Input
            value={rawValue}
            autoFocus
            onChange={onChange}
            onBlur={this.inactive}
          />
        ) : (
          value
        )}
      </Column>
    );
  }
}

export { Cell };
