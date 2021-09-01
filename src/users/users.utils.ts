
import jwt from "jsonwebtoken";
import client from "../client";
import {Resolver} from "../types"

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const verifiedToken = await jwt.verify(token, process.env.SECRET_KEY);
    if ("id" in verifiedToken) {
      const user = await client.user.findUnique({ where: { id: verifiedToken["id"] } });
      if (user) {
        return user;
      }
    }
      return null;
  } catch {
    return null;
  }
};

// protect resolvers by user login or not 
export function protectedResolver(ourResolver: Resolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      const query = info.operation.operation === "query";
      
      // if operation type is query 
      if (query) {
        return null;
      } else {
        // if operation type is mutation 
        return {
          ok: false,
          error: "Please log in to perform this action",
        };
      }
    }
    return ourResolver(root, args, context, info);
  };
}