import { prisma } from "../database";
import { Router, Response, Request } from "express";

export const router = Router();

router.post("/students", async (req: Request, res: Response) => {
  const { body } = req;

  const studentAlreadyExists = await prisma.student.findUnique({
    where: { email: body.email },
  });

  if (studentAlreadyExists) {
    return res.status(400).json({ message: "student already registred" });
  }

  await prisma.student.create({
    data: {
      name: body.name,
      email: body.email,
      addresses: {
        create: {
          street: body.street,
          number: body.number,
          city: body.city,
          zipcode: body.zipcode,
        },
      },
    },
  });

  return res.status(201).send();
});
