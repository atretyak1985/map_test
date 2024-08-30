import React from 'react';
import {Point} from "map/app/types";

interface CardComponentProps {
    cardsData: Point[];  // Array of points containing data for each card
    onClick: (title: string) => void;  // Function to handle card click events
    onHover: (id: string) => void;  // Function to handle card hover events
    onHoverOut: () => void;  // Function to handle when the mouse leaves a card
}

const Cards: React.FC<CardComponentProps> = ({cardsData, onClick, onHover, onHoverOut}) => {
    return (
        <div className="col-span-2 grid grid-cols-3 gap-4 cursor-pointer">
            {cardsData.map((card) => (
                <div
                    key={card._id}  // Unique key for each card based on its ID
                    onClick={() => onClick(card.title)}  // Call onClick with the card's title when clicked
                    onMouseEnter={() => onHover(card._id)}  // Call onHover with the card's ID when hovered
                    onMouseLeave={onHoverOut}  // Call onHoverOut when the mouse leaves the card
                >
                    <div className="rounded-lg backdrop-blur-md flex-col justify-start items-start gap-2 inline-flex">
                        {/* Card image */}
                        <img
                            src={card.imgSrc}  // Source URL for the card's image
                            alt={card.title}  // Alt text for accessibility
                            className="w-72 h-56 object-cover rounded-lg shadow"  // Styling for the image
                        />
                        <div className="self-stretch h-20 flex-col justify-start items-start gap-1 flex">
                            <div className="self-stretch h-14 flex-col justify-start items-start gap-2 flex">
                                {/* Card title */}
                                <div
                                    className="self-stretch text-black text-2xl font-bold font-['Nohemi'] leading-7">
                                    {card.title}
                                </div>
                            </div>
                            {/* Card position or location */}
                            <div
                                className="self-stretch text-zinc-500 text-base font-medium font-['Proxima Nova'] leading-snug">
                                {card.position}
                            </div>
                        </div>
                        <div className="justify-start items-start gap-2 inline-flex">
                            <div className="py-2 rounded-lg justify-start items-center gap-2 flex">
                                {/* 'Discover' link or button */}
                                <div
                                    className="text-black text-sm font-bold font-['Proxima Nova'] leading-none cursor-pointer">
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
