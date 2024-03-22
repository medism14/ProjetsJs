

const Input = ({inputName, id, type, label, double, select, children, onChange, refComponent, value, defaultValue }) => {

    const handleChange = (event) => {
        onChange(event);
    }

    if (type == "select") {
        return (
            <div id="elementsInput" className={`
            text-base
            md:text-3xl
            lg:text-base
            flex flex-col items-center w-full
            ${double ? 'my-2 md:my-5 lg:my-2' : ''}
            `}
        >
            <label className="font-bold mb-1" htmlFor={id}>{label}: </label>
            <select 
                name={inputName}
                id={id}
                autoComplete="off"
                onChange={handleChange}
                ref={refComponent}
                value={value}
                defaultValue={defaultValue}
                className={`
                    px-3 py-1
                    md:px-3 md:py-2
                    lg:px-3 lg:py-1
                    bg-[#989FCE] focus:ring-2 focus:bg-[#989FCE] outline-none rounded-lg ${double ? 'w-full' : 'w-5/6 md:w-3/4 lg:w-4/6'}`}
            >
                {children}
            </select>
        </div>
        )
    }

    return (
        <div id="elementsInput" className={`
            text-base
            md:text-3xl
            lg:text-base
            flex flex-col items-center w-full
            ${double ? 'my-2 md:my-5 lg:my-2' : ''}
            `}
        >
            <label className="font-bold mb-1" htmlFor={id}>{label}: </label>
            <input 
                type={type}
                name={inputName}
                id={id}
                autoComplete="off"
                onChange={handleChange}
                value={value}
                className={`
                    px-3 py-1
                    md:px-3 md:py-2
                    lg:px-3 lg:py-1
                    bg-[#989FCE] focus:ring-2 focus:bg-[#989FCE] outline-none rounded-lg ${double ? 'w-full' : 'w-5/6 md:w-3/4 lg:w-4/6'}`}
            />
        </div>
        
    );
}

export default Input;