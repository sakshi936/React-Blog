import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode; // Children can be any valid React element(ReactNode is a type that represents anything that can be rendered by React: strings, numbers, JSX elements, fragments, or even null.)
	type?: "button" | "submit" | "reset"; // Restricting type to valid button types
	bgColor?: string; // Class name or custom styles for background color
	textColor?: string; // Class name or custom styles for text color
	className?: string; // Additional class names
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	type?: "checkbox" | "email" | "text" | "password" | "submit" | "url" | "image";
	className?: string;
}

export interface SelectBtnProps extends SelectHTMLAttributes<HTMLSelectElement> {
	options?: [option: string];
	label?: string;
	className?: string;
}
