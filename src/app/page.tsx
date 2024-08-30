"use client";

import React, {useState} from 'react';
import Header from "map/app/components/header";
import Filter from "map/app/components/filter";
import MapComponent from "map/app/components/map-component";

export default function IndexPage() {
    const [center, setCenter] = useState({lat: 49.2827, lng: -123.1207});
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleFilter = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const handleCardClick = (cardTitle: string) => {
        console.log(`Card with title ${cardTitle} clicked`);
    };

    return (
        <div className="w-full bg-white font-sans items-center justify-center p-8">
            <Header/>
            <Filter handleFilter={handleFilter}/>
            <MapComponent
                center={center}
                handleCardClick={handleCardClick}
                selectedCategory={selectedCategory}
            />
        </div>
    );
}
