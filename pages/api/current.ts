import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/common/utils/serverAuth"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const currentUser = await serverAuth(req,res);
    if(currentUser===null)
    {
      return res.status(201).json(null)
    }
    return res.status(200).json(currentUser);
    // return res.status(200).json("hi")
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
export const config = {
  api: {
    externalResolver: true,
  },
};