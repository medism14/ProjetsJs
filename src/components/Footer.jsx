import bro from '../assets/VegetaGoku.png'

const Footer = () => {
    return (
        <footer id="footer" className="
            px-[40px] text-xs h-16
            md:px-[80px] md:text-xl md:h-24
            lg:px-[120px] lg:text-base lg:h-16
            fixed bottom-0 w-full flex items-center font-bold bg-[#383F51] text-[#FFC107]"
        >
            <div className="flex-1 flex justify-start">
                By Yaakoub
            </div>
            <div className="flex-1 flex justify-center">
                <img src={bro} alt="GokuAndVegeta" className="
                w-16 h-16
                md:w-24 md:h-24
                lg:w-16 lg:h-16
                "/>
            </div>
            <div className="flex-1 flex justify-end">
                And Ismael
            </div>
        </footer>
    );
}

export default Footer;