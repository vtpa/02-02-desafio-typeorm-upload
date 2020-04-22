import { getRepository } from 'typeorm';

import Category from '../models/Category';

class GetCategory {
  public async execute(title: string): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const checkCategoryExists = await categoriesRepository.findOne({
      title,
    });

    if (!checkCategoryExists) {
      const category = categoriesRepository.create({
        title,
      });
      await categoriesRepository.save(category);

      return category;
    }

    return checkCategoryExists;
  }
}

export default GetCategory;
