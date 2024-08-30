import React from 'react';
import {Point} from "map/app/types";

interface CardComponentProps {
    cardsData: Point[];
    onClick: (title: string) => void;
    onHover: (id: string) => void;
    onHoverOut: () => void;
}

const Cards: React.FC<CardComponentProps> = ({cardsData, onClick, onHover, onHoverOut}) => {
    return (
        <div className="col-span-2 grid grid-cols-3 gap-4 cursor-pointer">
            {cardsData.map((card) => (
                <div
                    key={card._id}
                    onClick={() => onClick(card.title)}
                    onMouseEnter={() => onHover(card._id)}
                    onMouseLeave={onHoverOut}
                >
                    <div className="rounded-lg backdrop-blur-md flex-col justify-start items-start gap-2 inline-flex">
                        <img src={card.imgSrc} alt={card.title} className="w-72 h-56 object-cover rounded-lg shadow"/>
                        <div className="self-stretch h-20 flex-col justify-start items-start gap-1 flex">
                            <div className="self-stretch h-14 flex-col justify-start items-start gap-2 flex">
                                <div
                                    className="self-stretch text-black text-2xl font-bold font-['Nohemi'] leading-7">{card.title}</div>
                            </div>
                            <div
                                className="self-stretch text-zinc-500 text-base font-medium font-['Proxima Nova'] leading-snug">
                                {card.position}
                            </div>
                        </div>
                        <div className="justify-start items-start gap-2 inline-flex">
                            <div className="py-2 rounded-lg justify-start items-center gap-2 flex">
                                <div
                                    className="text-black text-sm font-bold font-['Proxima Nova'] leading-none cursor-pointer"
                                >
                                    Discover &rarr;
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cards;
