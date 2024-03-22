import { useLayoutEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setBodyWidth, setBodyHeight } from "../redux/features/htmlElementsSlice"

const BodyAuth = ({children}) => {

    const bodyRef = useRef(null);
    let height = 0;
    let width = 0;

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        let body = bodyRef.current;
        let footer = document.getElementById('footer');

        let bodyY = body.getBoundingClientRect().y;
        let footerY = footer.getBoundingClientRect().y;

        height = footerY - bodyY;
        width = body.getBoundingClientRect().width

        dispatch(setBodyHeight(height));
        dispatch(setBodyWidth(width));

        body.style.height = height + 'px';
    }, []);

    return (
        <section 
            ref={bodyRef}
            className={`
                flex flex-col items-center w-full relative
            `}>
                {children}
        </section>
    );
}

export default BodyAuth;