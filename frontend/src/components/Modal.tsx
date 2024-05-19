import { FC, PropsWithChildren } from "react";

interface IModal extends PropsWithChildren {
    header?: string;
    open?: boolean
}
const Modal: FC<IModal> = ({header, open,children}) => {
  return (
    <dialog open={open}>
      <article>
        <header>
            {header}
        </header>
        {children}
      </article>
    </dialog>
  );
};
export default Modal;
