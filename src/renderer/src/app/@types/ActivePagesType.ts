import { ReactElement } from "react"

export type ActivePagesType = {
    path: string,
    element: ReactElement,
    icon: ReactElement,
    label: string,
    options?: Partial<ActivePagesType[]>
}