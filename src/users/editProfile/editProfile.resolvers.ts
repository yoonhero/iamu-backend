import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";
import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import { GraphQLUpload } from "graphql-upload";

const resolvers: Resolvers = {
  FileUpload: GraphQLUpload,
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          firstName,
          lastName,
          username,
          password: newPassword,
          email,
          bio,
          avatar,
        },
        { client, loggedInUser }
      ) => {
        // upload avatar to my server
        let avatarUrl = null;
        if (avatar) {
          const { filename, createReadStream } = await avatar;
          console.log(filename, createReadStream);

          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          console.log(newFilename);

          const readStream = createReadStream();
          const writeStream = createWriteStream(
            process.cwd() + "/uploads/" + newFilename
          );
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:4000/static/${newFilename}`;
        }

        // hashing new password
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = bcrypt.hash(newPassword, 10);
        }

        // update user
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            firstName,
            lastName,
            email,
            bio,
            username,
            ...(uglyPassword && { password: uglyPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
          },
        });

        // if updating is successful
        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update profile.",
          };
        }
      }
    ),
  },
};

export default resolvers;
