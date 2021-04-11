
import { Story } from '@storybook/react';
import { ButtonHTMLAttributes } from 'react';
import Button, { IButtonProps } from '.';

export default {
 title: 'Button',
 component: Button,
 argTypes: {
   type: {
     options: ['default', 'primary', 'secundary', 'info', 'alert', 'dark', 'link'],
     control: { type: 'select' },
     name: 'type',
     description: 'Type of button'
   },
   children: {
     description: 'Content to be render on the button'
   },
   onClick: { action: 'clicked', description: 'Function to be trigger on click' },
 },
};

const Template: Story<IButtonProps> = (args) => <Button {...args} />;
export const Demo = Template.bind({});
Demo.args = {
  children: 'Accept'
 };