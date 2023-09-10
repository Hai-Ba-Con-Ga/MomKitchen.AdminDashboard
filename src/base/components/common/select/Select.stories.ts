import { Meta, StoryObj } from "@storybook/react";
import { Select } from ".";

const meta = {
  title: "Select",
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    theme: "hehe",
  },
};
