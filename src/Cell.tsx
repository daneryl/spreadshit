import React, { FunctionComponent, useState } from 'react';
import { Column } from './Column';
import { Input } from './Input';
import { CellData } from './reducer';

interface cellProps {
  cellData?: CellData;
  onChange: (value: string) => void;
}

const Cell: FunctionComponent<cellProps> = ({
  cellData: { value, rawValue } = { value: '', rawValue: '' },
  onChange,
}: cellProps) => {
  const [active, setActive] = useState(false);

  return (
    <Column
      onClick={() => setActive(true)}
      onFocus={() => setActive(true)}
      tabIndex={0}
      role="button"
    >
      {active ? (
        <Input
          autoFocus
          value={rawValue}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setActive(false)}
        />
      ) : (
        value
      )}
    </Column>
  );
};

export { Cell };
