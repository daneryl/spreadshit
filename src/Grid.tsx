import React from 'react';
import { Cell } from './Cell';

type gridProps = {
  // title: string,
  // paragraph: string
};
const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

export const Grid: React.FC = ({  }: gridProps) => (
  <React.Fragment>
    {[...Array(100)].map((_, n) => (
      <div className="row">
        {alphabet.map(() => (
          <Cell />
        ))}
      </div>
    ))}
  </React.Fragment>
);
