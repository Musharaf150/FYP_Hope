"use server"

import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import ComCategory from "../database/models/comcategory.model"


export const getAllComCategories = async () => {
  try {
    await connectToDatabase();

    const comCategories = await ComCategory.find();

    
    return JSON.parse(JSON.stringify(comCategories));

    
  } catch (error) {
    handleError(error)
  }
}