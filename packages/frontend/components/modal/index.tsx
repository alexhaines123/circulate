import { ComponentProps } from "react";

type Props = ComponentProps<"dialog">;

function Modal({ children, ...props }: Props) {
  return (
    <>
      <dialog className="modal" {...props}>
        <div className="modal-box border border-neutral-content">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {children}
        </div>
      </dialog>
    </>
  );
}

export default Modal;
