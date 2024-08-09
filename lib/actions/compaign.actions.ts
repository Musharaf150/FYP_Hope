"use server"
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Compaign from "../database/models/compaign.model";
import User from "../database/models/user.model";
import ComCategory from "../database/models/comcategory.model";
import { GetAllCompaignsParams, GetRelatedCompaignsByComCategoryParams} from "@/types";


const getCategoryByName = async (name: string) => {
  return ComCategory.findOne({ name: { $regex: name, $options: 'i' } })
}


const populateCompaign = (query: any) => {
  return query
    .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
    .populate({ path: 'comCategory', model: ComCategory , select: '_id name' })
}



// GET ONE COMPAIGN BY ID
export async function getCompaignById(compaignId: string) {
  try {
    await connectToDatabase()

    const compaign = await populateCompaign(Compaign.findById(compaignId));

    if (!compaign) throw new Error('Compaign not found')

    return JSON.parse(JSON.stringify(compaign))
  } catch (error) {
    handleError(error)
  }
}

export async function getAllCompaigns({ camquery, limit = 6, page, comCategory }: GetAllCompaignsParams) {
    try {
      await connectToDatabase()
  
      const titleCondition = camquery ? { title: { $regex: camquery, $options: 'i' } } : {}
      const categoryCondition = comCategory ? await getCategoryByName(comCategory) : null
      const conditions = {
        $and: [titleCondition, categoryCondition ? { comCategory: categoryCondition._id } : {}],
      }

      const skipAmount = (Number(page) - 1) * limit
      const campaignsQuery = Compaign.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
  
      const compaigns = await populateCompaign(campaignsQuery)
      const compaignsCount = await Compaign.countDocuments(conditions)
  
      return {
        data: JSON.parse(JSON.stringify(compaigns)),
        totalPages: Math.ceil(compaignsCount / limit),
      }
    } catch (error) {
      handleError(error)
    }
  }


export async function getRelatedCompaignByComCategory({
  comCategoryId,
  compaignId,
  limit = 3,
  page = 1,
}: GetRelatedCompaignsByComCategoryParams) {
  try {
    await connectToDatabase()

    const skipAmount = (Number(page) - 1) * limit
    const conditions = { $and: [{ comCategory: comCategoryId }, { _id: { $ne: compaignId } }] }

    const compaignsQuery = Compaign.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const compaigns = await populateCompaign(compaignsQuery)
    const compaignsCount = await Compaign.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(compaigns)), totalPages: Math.ceil(compaignsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}