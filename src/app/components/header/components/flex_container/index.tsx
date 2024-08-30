import React, {ReactNode} from "react";

const commonDivStyle = "justify-start items-start flex";

interface FlexContainerProps {
    children: ReactNode;
}

const FlexContainer: React.FC<FlexContainerProps> = ({children}) => (
    <div className={commonDivStyle}>
        {children}
    </div>
)

export default FlexContainer
