import { ReactNode } from "react";

export interface stylings {
    body?: string,
    container?: string,
    card?: string,
    title?: string,
    text?: string
}

export type PageProps = {
    children: ReactNode;
    stylings?: stylings;
    title?: string;
};