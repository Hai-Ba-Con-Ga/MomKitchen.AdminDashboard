import { Meta, StoryObj } from "@storybook/react";
import {Image} from "."

const meta = {
    title: 'Image',
    component: Image,
    tags: ['autodocs'],
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary : Story = {
    args : {
        url : "https://source.unsplash.com/random",
        className : "w-20"
    }
}
export const Secondary : Story = {
    args : {
        url : "https://source.unsplash.com/random",
        className : "w-40"
    }
}