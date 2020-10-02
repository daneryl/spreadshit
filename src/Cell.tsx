import React, { CSSProperties } from 'react';

interface cellProps {
  value: string;
  onChange: () => {}
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

    const styles: CSSProperties = {
      width: '100px',
      height: '15px',
      border: '1px solid red',
      padding: '0',
      float: 'left'
    }

    return (
      <div style={styles} onClick={this.active} onFocus={this.active} tabIndex={0} role="button">
        {active ? <input style={{ width: '100px', height: '15px', margin: '0', border: '0' }} autoFocus onChange={this.props.onChange} onBlur={this.inactive} /> : value}
      </div>
    );
  }
}

export { Cell };
