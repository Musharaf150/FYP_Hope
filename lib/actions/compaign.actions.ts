"use server"
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Compaign from "../database/models/compaign.model";
import User from "../database/models/user.model";
import ComCategory from "../database/models/comcategory.model";
import { GetAllCompaignsParams, GetRelatedCompaignsByComCategoryParams} from "@/types";

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

export async function getAllCompaigns({ query, limit = 6, page, comCategory }: GetAllCompaignsParams) {
    try {
      await connectToDatabase()
  
    //   const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    //   const categoryCondition = category ? await getCategoryByName(category) : null
    //   const conditions = {
    //     $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
    //   }
  
    const conditions ={}
    //   const skipAmount = (Number(page) - 1) * limit
      const compaignsQuery = Compaign.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(0)
        .limit(limit)
  
      const compaigns = await populateCompaign(compaignsQuery)
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