import React, { FunctionComponent, useReducer } from 'react';
import { Cell } from './Cell';
import { Row } from './Row';
import { arrayOf } from './utils';
import { spreadsheetReducer } from './spreadsheetReducer';

interface GridProps {
  columnsNumber?: number;
}

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const Grid: FunctionComponent<GridProps> = ({
  columnsNumber = 15,
}: GridProps) => {
  const [state, dispatch] = useReducer(spreadsheetReducer, {});

  console.log(state);
  

  return (
    <>
      {letters.map((letter) => (
        <Row key={`row${letter}`}>
          {arrayOf(columnsNumber).map((column) => (
          //@ts-ignore
            <Cell onChange={(e) => {console.log(e.target.value);dispatch({ cell: `${letter}${column}`, value: e.target.value })}} value={state[`${letter}${column}`]?.value} key={`cell${column}`} />
          ))}
        </Row>
      ))}
    </>
  );
};

export { Grid };
