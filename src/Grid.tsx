import React, { FunctionComponent, useReducer } from 'react';
import { Cell } from './Cell';
import { Row } from './Row';
import { arrayOf } from './utils';
import { reducer } from './reducer';

interface GridProps {
  rowsNumber?: number;
}

const letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  // 'm',
  // 'n',
  // 'o',
  // 'p',
  // 'q',
  // 'r',
  // 's',
  // 't',
  // 'u',
  // 'v',
  // 'w',
  // 'x',
  // 'y',
  // 'z',
];

const Grid: FunctionComponent<GridProps> = ({
  rowsNumber = 15,
}: GridProps) => {
  const [state, dispatch] = useReducer(reducer, {});

  return (
    <>
      {arrayOf(rowsNumber).map((column) => (
        <Row key={`row${column}`}>
          {letters.map((letter) => (
            <Cell
              onChange={(e) => {
                dispatch({ cell: `${letter}${column}`, value: e.target.value });
              }}
              value={state[`${letter}${column}`]?.value}
              rawValue={state[`${letter}${column}`]?.rawValue}
              key={`cell${letter}${column}`}
            />
          ))}
        </Row>
      ))}
    </>
  );
};

export { Grid };
