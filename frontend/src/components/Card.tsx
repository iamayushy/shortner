import { FC, PropsWithChildren } from "react";

const Card: FC<PropsWithChildren> = ({children}) => {
    return <article className="card">
        {children}
    </article>
}

export default Card;