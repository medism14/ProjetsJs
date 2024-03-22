import React from 'react';

const DivInput = ({children, modal}) => {

    const childrenCount = React.Children.count(children);

    if (modal) {
        if (childrenCount > 1) {
            return (
                <div className="
                    space-y-3
                    md:space-x-5 md:flex md:justify-center md:space-y-0
                    w-full my-2"
                >
                    {React.Children.map(children, (child, index) => {
                        return <div className="md:flex-1 md:flex md:justify-center">{child}</div>
                    })}
                </div>
            );
        } else {
            return (
                <div className="w-full flex justify-center my-2">
                    {children}
                </div>
                );
        }
    }


    if (childrenCount > 1) {
        return (
            <div className={`
                w-full
                md:w-3/4
                lg:space-x-3 lg:w-4/6 lg:flex
                items-center text-[#383F51] mx-auto
            `}>
                {React.Children.map(children, (child, index) => {
                    return (
                        <div className="md:flex-1 md:flex md:justify-center w-full">{child}</div>
                    )
                })}
            </div>
        );
    } else if (childrenCount == 1) {
        return (
            <div className={`
                my-2
                md:my-5
                lg:my-2
                flex w-full justify-center text-[#383F51]
            `}>
                {children}
            </div>
        );
    }
}

export default DivInput;