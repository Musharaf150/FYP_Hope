"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllComCategories } from "@/lib/actions/comcategory.actions";
import { IComCategory } from "@/lib/database/models/comcategory.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ComCategoryFilter = () => {
  const [categories, setCategories] = useState<IComCategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllComCategories();

      categoryList && setCategories(categoryList as IComCategory[])
    }

    getCategories();
  }, [])

  const onSelectCategory = (comCategory: string) => {
      let newUrl = '';

      if(comCategory && comCategory !== 'All') {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'comCategory',
          value: comCategory
        })
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['comCategory']
        })
      }

      router.push(newUrl, { scroll: false });
  }

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>

        {categories.map((comCategory) => (
          <SelectItem value={comCategory.name} key={comCategory._id} className="select-item p-regular-14">
            {comCategory.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default ComCategoryFilter