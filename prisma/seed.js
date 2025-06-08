import { parseArgs } from "node:util";

const options = {
  environment: { type: "string" },
};

async function main() {
  const result =
    await prisma.$executeRaw`INSERT INTO "User" ("id", "email", "name") VALUES (3, 'foo@example.com', 'Foo') ON CONFLICT DO NOTHING;`;
  console.log({ result });


  const {
    values: { environment },
  } = parseArgs({ options });

  switch (environment) {
    case "development":
      /** data for your development */
      break;
    case "test":
      /** data for your test environment */
      break;
    default:
      break;
  }
}

main()
.then(result)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

//   const add = await prisma.user.create({
//     data: {
//       name: 'Eloise',
//       jobTitle: 'Programmer',
//       posts: {
//         create: {
//           title: 'How to create a MySQL database',
//           content: 'Some content',
//         },
//       },
//     },
//   })
// npx prisma migrate reset


