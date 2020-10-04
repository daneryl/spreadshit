import React, { FunctionComponent, useReducer } from 'react';
import { Cell } from './Cell';
import { Row } from './Row';
import { arrayOf, letters } from './utils';
import { reducer } from './reducer';
import { Column } from './Column';

interface GridProps {
  rows?: number;
  columns?: number;
}

const SpreadSheet: FunctionComponent<GridProps> = ({
  rows = 10,
  columns = 10,
}: GridProps) => {
  const [state, dispatch] = useReducer(reducer, {});

  return (
    <>
      <Row>
        <Column />
        {letters(columns).map(letter => (
          <Column key={letter}>{letter}</Column>
        ))}
      </Row>
      {arrayOf(rows).map(row => (
        <Row key={row}>
          <Column key={row}>{row}</Column>
          {letters(columns).map(letter => (
            <Cell
              onChange={value => {
                dispatch({ cell: letter + row, value });
              }}
              cellData={state[letter + row]}
              key={letter + row}
            />
          ))}
        </Row>
      ))}
    </>
  );
};

export { SpreadSheet };
