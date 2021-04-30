import { Story, Meta } from '@storybook/react/types-6-0';

import SpacedItems, { SpacedItemsProps } from './SpacedItems';

export default {
  title: 'ReadyOps/SpacedItems',
  component: SpacedItems,
  argTypes: {
    children: { table: { disable: true } },
    ref: { table: { disable: true } },
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
    rhythmMultiplier: { type: 'number' },
  },
} as Meta;

const TestBox = () => (
  <div style={{ backgroundColor: 'lightgreen' }}>Dog goes Roof!</div>
);

const Template: Story<SpacedItemsProps> = ({ ...rest }) => (
  <SpacedItems {...rest}>
    <TestBox />
    <TestBox />
    <TestBox />
    <TestBox />
  </SpacedItems>
);

export const Column = Template.bind({});
Column.args = {
  direction: 'column',
};

export const ColumnWide = Template.bind({});
ColumnWide.args = {
  direction: 'column',
  rhythmMultiplier: 6,
};

export const Row = Template.bind({});
Row.args = {
  direction: 'row',
};

export const RowWide = Template.bind({});
RowWide.args = {
  direction: 'row',
  rhythmMultiplier: 6,
};
