

const ContentForm = ({children, onSubmit}) => (
        <div className="
            px-3 py-3 w-full 
            md:px-3 md:py-3 md:w-[90%]
            lg:px-3 lg:py-3 lg:w-[60%]
            bg-[#6D768E] rounded-lg rounded-t-none flex flex-col items-center"
        >
            <form onSubmit={onSubmit} method="POST" className="m-0 p-0 w-full">
                {children}
            </form>
        </div>
)

export default ContentForm;