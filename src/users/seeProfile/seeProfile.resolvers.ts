import client from "../../client";

export default {
    Query: {
        seeProfile: (_, { username }) => client.user.findUnique({
            where: {
                username,
            },
            // load all user
            include: {
                following: true,
                followers: true,
            }
        }),
    },
};