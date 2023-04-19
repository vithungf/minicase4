import {Category} from "../modle/category";

class CategoryService {
    constructor() {

    }

    getAll = async () => {
        let categories = await Category.find();
        return categories;
    }

}

export default new CategoryService();