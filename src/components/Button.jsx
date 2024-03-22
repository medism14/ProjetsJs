import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPlus, faEdit, faTrashAlt, faCartShopping,faXmark } from '@fortawesome/free-solid-svg-icons';

const Button = ({ bgColor, textColor, content, onClick, icon, restClass, disable, refElement }) => {
    
    const [actualIcon, setActualIcon ] = useState(faEye);

    useLayoutEffect(() => {
        if (icon) {
            switch (content) {
                case 'faEye':
                    setActualIcon(faEye);
                    break;
                case 'faPlus':
                    setActualIcon(faPlus);
                    break;
                case 'faEdit':
                    setActualIcon(faEdit);
                    break;
                case 'faTrashAlt':
                    setActualIcon(faTrashAlt);
                    break;
                case 'faXmark':
                    setActualIcon(faXmark);
                    break;
                case 'faCartShopping':
                    setActualIcon(faCartShopping);
                    break;
            }
        }
    });

    if (icon) {
        return (
            <button onClick={onClick} disabled={disable} ref={refElement} className={`
                px-1 py-[0rem] text-sm
                ${content == 'faPlus' ? 'md:px-4 md:py-1 md:text-xl lg:px-4 lg:py-1 lg:text-base' : 'md:px-[0.35rem] md:py-1 md:text-base lg:px-2 lg:py-1 lg:text-base'}
                ${disable ? 'bg-opacity-25' : 'hover:bg-opacity-75'}
                bg-[${bgColor}] text-[${textColor}] rounded-full font-bold transition-all duration-300 border-2 border-[#383F51]
                ${restClass}
            `}>
                {<FontAwesomeIcon icon={actualIcon} />}
            </button>
        );
    } else {
        return (
            <button onClick={onClick} disabled={disable} ref={refElement} className={`
                px-5 py-2 text-sm mt-8
                md:px-8 md:py-3 md:text-xl md:mt-12
                lg:px-5 lg:py-2 lg:text-sm lg:mt-10
                mb-4
                bg-[${bgColor}] text-[${textColor}] rounded-xl font-bold transition-all duration-300 hover:bg-opacity-75 mx-auto ${restClass}
            `}>
                {content}
            </button>
        );
    }
    
}

export default Button;
