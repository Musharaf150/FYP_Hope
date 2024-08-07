import { GetAllStoriesParams } from "@/types"
import { connectToDatabase } from "../database"
import ComCategory from "../database/models/comcategory.model"
import User from "../database/models/user.model"
import Story from "../database/models/successstory.model"
import { handleError } from "../utils"

const getCategoryByName = async (name: string) => {
    return ComCategory.findOne({ name: { $regex: name, $options: 'i' } })
  }

  const populateStory = (query: any) => {
    return query
      .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
      .populate({ path: 'comCategory', model: ComCategory , select: '_id name' })
  }

//GET ALL STORIES
export async function getAllStories({ query, limit = 6, page, comCategory }: GetAllStoriesParams) {
    try {
      await connectToDatabase()
  
      const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
      const categoryCondition = comCategory ? await getCategoryByName(comCategory) : null
      const conditions = {
        $and: [titleCondition, categoryCondition ? { comCategory: categoryCondition._id } : {}],
      }
  
      const skipAmount = (Number(page) - 1) * limit
      const storyQuery = Story.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const story = await populateStory(storyQuery)
      const storiesCount = await Story.countDocuments(conditions)
  
      return {
        data: JSON.parse(JSON.stringify(story)),
        totalPages: Math.ceil(storiesCount / limit),
      }
    } catch (error) {
      handleError(error)
    }
  }
  