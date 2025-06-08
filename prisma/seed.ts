import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create users
  const users = await Promise.all(
    Array.from({ length: 20 }, async (_, i) => {
      const hashedPassword = await hash("password123", 12);
      return prisma.user.create({
        data: {
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          password: hashedPassword,
          emailVerified: new Date(),
        },
      });
    })
  );

  // Create tags
  const tags = await Promise.all(
    Array.from({ length: 20 }, async (_, i) => {
      return prisma.tag.create({
        data: {
          name: `Tag ${i + 1}`,
        },
      });
    })
  );

  // Create posts
  const posts = await Promise.all(
    Array.from({ length: 20 }, async (_, i) => {
      return prisma.post.create({
        data: {
          title: `Post ${i + 1}`,
          slug: `post-${i + 1}`,
          content: `This is the content of post ${
            i + 1
          }. It contains some sample text to demonstrate the blog functionality.`,
          image : "https://picsum.photos/200/300",
          published: true,
          time_to_read : 3,
          author_id: users[i % users.length].id,
          tags: {
            connect: [
              { id: tags[i % tags.length].id },
              { id: tags[(i + 1) % tags.length].id },
            ],
          },
        },
      });
    })
  );

  // Create comments
  await Promise.all(
    Array.from({ length: 20 }, async (_, i) => {
      return prisma.comment.create({
        data: {
          content: `This is comment ${i + 1} on post ${(i % posts.length) + 1}`,
          post_id: posts[i % posts.length].id,
          author_id: users[i % users.length].id,
        },
      });
    })
  );

  // Create favorites
  await Promise.all(
    Array.from({ length: 20 }, async (_, i) => {
      return prisma.favorite.create({
        data: {
          post_id: posts[i % posts.length].id,
          user_id: users[i % users.length].id,
        },
      });
    })
  );

  console.log("Database has been seeded. 🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
