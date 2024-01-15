import { Dispatch, FC, SetStateAction } from "react"

export const Modal: FC<React.PropsWithChildren<{ setShowModal: Dispatch<SetStateAction<boolean>> }>> = ({
  children,
  setShowModal,
}) => (
  <div className="fixed inset-0 z-20 flex h-screen w-screen items-center justify-center bg-red-100">
    <div className="absolute inset-0 bg-black opacity-20" />
    <span className="absolute top-10 left-10 cursor-pointer text-black underline" onClick={() => setShowModal(false)}>
      close
    </span>
    {children}
  </div>
)
