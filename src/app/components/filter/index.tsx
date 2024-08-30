import {useEffect, useState} from "react";
import {Search} from "map/assets/icons";
import Image from "next/image";
import {Category} from "map/app/types";
import {CategoryService} from "map/app/services/sanity/categoryService";

interface FilterProps {
    handleFilter: (categoryId: string) => void;
}

const Filter = ({handleFilter}: FilterProps) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const categoryService = new CategoryService();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryService.getCategories();
                if (data.length > 0) {
                    data[0].selected = true;
                    handleCategoryClick(data[0]._id);
                }
                setCategories(data);
            } catch (error) {
                console.error("Failed to load categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryId: string) => {
        const updatedCategories = categories.map((category) =>
            category._id === categoryId
                ? {...category, selected: true}
                : {...category, selected: false}
        );
        setCategories(updatedCategories);
        handleFilter(categoryId); // Notify parent component
    };

    return (
        <section className="mx-auto py-8 w-[1376px]">
            <div className="container mx-auto flex justify-center items-center space-x-4">
                {categories.map((category: Category) => (
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
                ))}
                <Search className="cursor-pointer"/>
            </div>
        </section>
    );
};

export default Filter;
