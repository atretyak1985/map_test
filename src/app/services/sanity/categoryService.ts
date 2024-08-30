import {BaseService} from "./baseService";
import {Category} from "map/app/types";
import {CATEGORY_QUERY} from "./queries";

export class CategoryService extends BaseService {
    async getCategories(): Promise<Category[]> {
        return this.fetch<Category[]>(CATEGORY_QUERY);
    }
}
