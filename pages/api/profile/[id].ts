import type { NextApiRequest, NextApiResponse } from "next";

import { client } from "../../../utils/client";
import {
  singleUserQuery,
  userCreatedPostsQuery,
  userLikedPostsQuery,
} from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const query = singleUserQuery(id);
    const postedVideosQuery = userCreatedPostsQuery(id);
    const likedVideosQuery = userLikedPostsQuery(id);

    const user = await client.fetch(query);
    const userVideos = await client.fetch(postedVideosQuery);
    const userLikedVideos = await client.fetch(likedVideosQuery);

    res.status(200).json({ user: user[0], userVideos, userLikedVideos });
  }
}
