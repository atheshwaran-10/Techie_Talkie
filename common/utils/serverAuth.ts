import { NextApiRequest, NextApiResponse } from "next";

import db from "./db"
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
   return null;
  }

  const currentUser = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    return null;
  }

  return { currentUser };
};

export default serverAuth;
