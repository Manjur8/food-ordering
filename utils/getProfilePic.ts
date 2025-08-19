import { appWriteConfig } from "@/lib/appWrite"
import { User } from "@/type"

export const getProfilePic = (uri: string, user: User) => {
    return uri?.includes('/buckets/') ? `${uri}?project=${appWriteConfig.projectId}` : `${uri}?name=${user?.name}`
}