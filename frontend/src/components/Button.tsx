
interface btnProps {
    onPress : ()=> void;
    value : string;
}

function Button({onPress,value}:btnProps) {
    return (
        <div className="flex justify-center items-center">
        
            <button 
                className="text-white font-bold text-sm py-1 px-4 rounded-lg border-2 bg-black border-black w-auto"
                onClick={onPress}
            >
                {value}
            </button>
    
    </div>
    
    );
}

export default Button;
