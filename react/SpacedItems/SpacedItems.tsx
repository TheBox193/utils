import styled from 'styled-components';
import { Tokens } from 'config';

export type SpacedItemsProps = {
  rhythmMultiplier?: number;
  direction: 'row' | 'column';
  // children: ReactNode & Element;
};

const SpacedItems = styled.div<SpacedItemsProps>(
  ({ direction = 'row', rhythmMultiplier = 2 }) => {
    let marginSide;
    if (direction === 'row') marginSide = 'margin-left';
    if (direction === 'column') marginSide = 'margin-top';

    return `
      display: flex;
      flex-direction: ${direction};
      > * + * {
        ${marginSide}: calc(${Tokens.rhythm} * ${rhythmMultiplier});
      }
    `;
  },
);

export default SpacedItems;
