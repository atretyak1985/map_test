import Image from "next/image";
import {Category} from "map/app/types";

interface CategoryItemProps {
    category: Category;
    handleCategoryClick: (categoryId: string) => void;
}

const CategoryItem = ({category, handleCategoryClick}: CategoryItemProps) => (
    <div
        key={category._id}
        className={`p-3 rounded-lg flex-col justify-start items-center gap-2 inline-flex ${category.selected ? 'bg-[#079EA5] text-white' : 'text-zinc-500 hover:bg-gray-400/20'} cursor-pointer`}
        onClick={() => handleCategoryClick(category._id)}
    >
        <div className="flex-col justify-start items-center gap-2 flex">
            <div className="w-6 h-6 relative text-white ">
                <Image
                    src={category.icon}
                    alt={category.title}
                    width="24"
                    height="24"
                    className={`shrink-0 ${category.selected ? 'text-white' : 'text-zinc-500'}`}
                />
            </div>
            <div
                className={`text-center text-xs font-bold font-['Proxima Nova'] leading-none ${category.selected ? 'text-white' : 'text-zinc-500'}`}
            >
                {category.title}
            </div>
        </div>
    </div>
);

export default CategoryItem;
