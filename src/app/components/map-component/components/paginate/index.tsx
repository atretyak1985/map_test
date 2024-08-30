import React from 'react';
import {ForwardButton} from 'map/assets/icons/index'

const Paginate: React.FC = () => {
    return (
        <div className="w-full h-8 justify-center items-center gap-2 inline-flex">
            <div className="justify-center items-center gap-2 flex">
                <div
                    className="w-8 h-8 px-4 py-2 bg-cyan-600 rounded-lg justify-center items-center gap-2 flex cursor-pointer hover:bg-gray-400/20">
                    <div className="text-white text-sm font-bold font-['Proxima Nova'] leading-none">1</div>
                </div>
                <div
                    className="w-8 h-8 px-4 py-2 rounded-lg border border-neutral-200 justify-center items-center gap-2 flex cursor-pointer hover:bg-gray-400/20">
                    <div className="text-zinc-500 text-sm font-bold font-['Proxima Nova'] leading-none">2</div>
                </div>
                <div
                    className="w-8 h-8 px-4 py-2 rounded-lg border border-neutral-200 justify-center items-center gap-2 flex cursor-pointer hover:bg-gray-400/20">
                    <div className="text-zinc-500 text-sm font-bold font-['Proxima Nova'] leading-none">3</div>
                </div>
            </div>
            <ForwardButton className="w-8 h-8 relative cursor-pointer hover:bg-gray-400/20"/>
        </div>
    );
};

export default Paginate;
