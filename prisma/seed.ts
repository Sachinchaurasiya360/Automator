import "dotenv/config";
import bcrypt from "bcrypt";

import { prisma } from "../lib/prisma";

async function main() {
  const email = "demo@automator.com";
  const password = "demo1234";
  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword, name: "Demo User" },
    create: { email, password: hashedPassword, name: "Demo User" },
  });

  console.log("Seeded demo user:", { id: user.id, email: user.email });
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => process.exit(0));
