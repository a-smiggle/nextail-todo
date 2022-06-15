import React, { ReactNode } from "react";

export interface stylings {
    l1?: string, //Not used
    l2?: string,//Not Used
    card?: string, // Pass border-X bg-COLOR etc
    header?: string, // Pass border-X bg-COLOR etc
    body?: string, // Pass border-X bg-COLOR etc
    footer?: string, // Pass border-X bg-COLOR etc
    background?: string // Pass opacity-XX bg-COLOR
}

export type ModalProps = {
    header: ReactNode;
    body: ReactNode;
    footer?: ReactNode;
    stylings?: stylings;
}