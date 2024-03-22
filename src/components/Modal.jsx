import { DivInput, Button, InputModal } from '../components';
import { useLayoutEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';

const VoirModal = ({bottom, children, title, display, onClose, onClick, idProduct}) => {

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    }

    useLayoutEffect(() => {
        if (idProduct) {
            
        }
    }, [])
    

    return (
        <section className={`inset-0 absolute z-10 m-0 bg-opacity-45 bg-slate-100 text-[#989FCE] font-bold ${!display && 'hidden'}`}>
            <div 
                className="
                    w-[90%]
                    md:w-[70%]
                    lg:w-[50%]
                    mx-auto mt-28 flex flex-col
                "
            >
                <div className="w-full bg-[#383F51] flex items-center p-2 rounded-t-lg">
                    <div className="flex-1 flex justify-center"></div>
                    <div className="flex-1 text-center text-2xl">{title}</div>
                    <div className="flex-1 flex justify-end text-[#FFC107] text-3xl"><button onClick={handleClose} className="transition-all duration-300 hover:bg-opacity-75"><FontAwesomeIcon icon={faRectangleXmark} /></button></div>
                </div>
                <div className="w-full bg-[#6D768E] px-5 py-5 text-[#383F51]">
                    {children}
                </div>
                <div className="w-full bg-[#383F51] flex justify-center space-x-5 min-h-8">
                {bottom && (
                        <Button
                            bgColor="#FFC107"
                            onClick={onClick}
                            textColor="#383F51"
                            content="Enregistrer"
                            restClass={`
                                mt-5
                                md:mt-5 md:text-sm md:px-3 md:py-[0.4rem]
                                lg:mt-5
                            `}
                            icon={false}
                        />
                )}
                </div>
            </div>
        </section>
    )
}

export default VoirModal;