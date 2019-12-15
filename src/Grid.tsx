import React from 'react';
import { Cell } from './Cell';
import { Row } from './Row';
import { arrayOf } from './utils';

interface GridProps {
  rowsNumber: number;
  columnsNumber: number;
}

const Grid: React.FC<GridProps> = ({ rowsNumber, columnsNumber }: GridProps) => (
  <React.Fragment>
    {arrayOf(rowsNumber).map((row) => (
      <Row key={'row' + row}>
        {arrayOf(columnsNumber).map(column => (
          <Cell key={'cell' + column} />
        ))}
      </Row>
    ))}
  </React.Fragment>
);

export { Grid };
