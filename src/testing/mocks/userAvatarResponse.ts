import { ApiUserResponse } from "@/types/api/apiTypes";

export const userAvatarResponseMock = JSON.parse(`
  {
    "id": 679,
    "username": "mnadolny",
    "email": "mnadolny.laba@solvd.com",
    "provider": "local",
    "confirmed": true,
    "blocked": false,
    "createdAt": "2024-09-05T12:12:38.036Z",
    "updatedAt": "2024-10-04T15:08:00.707Z",
    "phoneNumber": "7257277772",
    "firstName": "Michal",
    "lastName": "Nadolny",
    "avatar": {
        "id": 5443,
        "name": "avatar_image.png",
        "alternativeText": null,
        "caption": null,
        "width": 512,
        "height": 512,
        "formats": {
            "thumbnail": {
                "ext": ".png",
                "url": "https://res.cloudinary.com/devc11z9p/image/upload/v1728054480/thumbnail_avatar_image_2bbe7cf59b.png",
                "hash": "thumbnail_avatar_image_2bbe7cf59b",
                "mime": "image/png",
                "name": "thumbnail_avatar_image.png",
                "path": null,
                "size": 10.93,
                "width": 156,
                "height": 156,
                "provider_metadata": {
                    "public_id": "thumbnail_avatar_image_2bbe7cf59b",
                    "resource_type": "image"
                }
            }
        },
        "hash": "avatar_image_2bbe7cf59b",
        "ext": ".png",
        "mime": "image/png",
        "size": 6.1,
        "url": "https://res.cloudinary.com/devc11z9p/image/upload/v1728054480/avatar_image_2bbe7cf59b.png",
        "previewUrl": null,
        "provider": "cloudinary",
        "provider_metadata": {
            "public_id": "avatar_image_2bbe7cf59b",
            "resource_type": "image"
        },
        "createdAt": "2024-10-04T15:08:00.559Z",
        "updatedAt": "2024-10-04T15:08:00.559Z"
    }
  }  
`) as ApiUserResponse;