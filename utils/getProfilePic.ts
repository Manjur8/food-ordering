import { User } from "@/type"

export const getProfilePic = (uri: string, user: User) => {
    return uri?.includes('/buckets/') ? `${uri}` : `${uri}?name=${user?.name}`
}