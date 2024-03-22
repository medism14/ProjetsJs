

const InputModal = ({label, type, inputName, id, onChange, display, up, value, refElement}) => {

    const handleChange = (event) => {
        onChange(event);
    }
    return (
        <div id="elementsInput" className={`flex justify-center space-x-2 ${up && 'flex flex-col justify-center'}`}
        >
            <label className={`font-bold mb-1 ${up && 'text-center'}`} htmlFor={id}>{label}: </label>
            <input 
                type={type}
                name={inputName}
                id={id}
                autoComplete="off"
                disabled={display}
                value={value || ''}
                onChange={handleChange}
                ref={refElement}
                className={`
                    px-3 py-1
                    md:px-3 md:py-2
                    lg:px-3 lg:py-1
                    bg-[#D9D9D9] focus:ring-2 focus:bg-[#D9D9D9] outline-none rounded-lg`}
            />
        </div>
        
    );
}

export default InputModal;