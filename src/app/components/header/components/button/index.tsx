import React, {ReactNode} from "react";

const commonButtonStyle = "px-10 py-4 rounded-[99px] justify-center items-center gap-2.5 flex";

interface ButtonProps {
    color?: string;
    backgroundColor?: string;
    children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({color = "text-white", backgroundColor = "", children}) => (
    <button className={`${commonButtonStyle} ${color} ${backgroundColor} hover:bg-gray-200/20`}>
        <div className="text-base font-bold font-['Proxima Nova'] leading-[18px]">{children}</div>
    </button>
)

export default Button
