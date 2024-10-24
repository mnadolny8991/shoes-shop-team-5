export const apiResponse = JSON.parse(`
  {
    "data": [
        {
            "id": 3,
            "attributes": {
                "name": "Men",
                "createdAt": "2023-05-10T10:00:54.425Z",
                "updatedAt": "2023-05-10T10:00:55.441Z",
                "publishedAt": "2023-05-10T10:00:55.438Z"
            }
        },
        {
            "id": 4,
            "attributes": {
                "name": "Women",
                "createdAt": "2023-05-10T10:01:00.195Z",
                "updatedAt": "2023-05-10T10:01:01.109Z",
                "publishedAt": "2023-05-10T10:01:01.106Z"
            }
        }
    ],
    "meta": {
        "pagination": {
            "page": 1,
            "pageSize": 25,
            "pageCount": 1,
            "total": 2
        }
    }
  }
`);