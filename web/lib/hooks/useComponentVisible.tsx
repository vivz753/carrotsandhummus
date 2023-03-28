import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from "react"
import useOnClickOutside from "./useOnClickOutside"

/**
 * This useComponentVisible function is ideally used for a component that is conditionally rendered and should close when the user clicks outside of it
 * (i.e a drawer or modal)
 * This hook provides event listeners for the component when visible to listen for clicks outside of it.
 * Once a click happens outside of the component, the visible state is set to false, and the event listeners are removed from the component.
 * @param initialIsVisible the initial value to set the hook
 * @returns [ref, isComponentVisible, setIsComponentVisible]
 * where the ref is set for the component ref,
 * isComponentVisible is the boolean that determines the visibility of the component,
 * and setIsComponentVisible is the hook to use for manually toggling the component (i.e. displaying a drawer by the click of a button)
 * NOTE: ref applies to the component and any of its subcomponents -- so if you want a modal to close when clicking in the overlay,
 * make sure you place the overlay element OUTSIDE of the parent element, and not as a child element/subcomponent of the modal
 */
export default function useComponentVisible(
  initialIsVisible: boolean
): [MutableRefObject<any>, boolean, Dispatch<SetStateAction<boolean>>] {
  const [isComponentVisible, setIsComponentVisible] = useState<boolean>(initialIsVisible)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setIsComponentVisible(false))

  return [ref, isComponentVisible, setIsComponentVisible]
}
