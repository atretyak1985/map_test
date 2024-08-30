"use client";

import header_bg from 'map/assets/images/header_bg.jpg';
import Image from 'next/image';
import {MatchIcon} from "map/assets/icons";
import FlexContainer from "./components/flex_container";
import Button from "./components/button";

const Header = () => {
    return (
        <header className="relative mx-auto w-[1376px] rounded-[32px]">

            <Image
                src={header_bg}
                alt="Background Image"
                className="absolute w-full h-full object-cover rounded-[32px]"
            />
            <div className="absolute inset-0 bg-[#121918] opacity-30 rounded-[32px]"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center spa">
                <h1 className="w-[1312px] text-center text-white text-7xl font-bold font-['Nohemi'] leading-[87px] pt-[72px]">Personalize
                    your experience</h1>
                <div className="flex items-center justify-center mt-4 h-[72px]">
                    <div
                        className="h-[72px] p-2 bg-neutral-400/30 rounded-[99px] border border-[#bcbcbc]/40 backdrop-blur-[25px] justify-start items-center inline-flex">

                        <FlexContainer>
                            <Button>When</Button>
                        </FlexContainer>

                        <FlexContainer>
                            <Button>What</Button>
                        </FlexContainer>

                        <FlexContainer>
                            <Button color="text-black" backgroundColor="bg-white">More +</Button>
                        </FlexContainer>

                    </div>
                </div>
                {/* Add sort feature section */}
                <div className="justify-start items-center gap-2 inline-flex pt-4 pb-8">
                    <div className="w-6 h-6 pl-px pr-[1.18px] pt-[2.43px] pb-[2.79px] justify-center items-center flex">
                        <div className="w-[21.82px] h-[18.78px] relative">
                            <MatchIcon/>
                        </div>
                    </div>
                    <div
                        className="text-white text-base font-normal font-['Proxima Nova'] leading-snug tracking-wide">SORT
                        YOUR MATCHES
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
