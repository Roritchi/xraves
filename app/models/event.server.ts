import type { User, Event } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Event } from "@prisma/client";

export function getEvent({
  id,
  userId,
}: Pick<Event, "id"> & {
  userId: User["id"];
}) {
  return prisma.event.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  });
}

export function getEventListItems({ userId }: { userId: User["id"] }) {
  return prisma.note.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createEvent({
  body,
  title,
  userId,
}: Pick<Event, "body" | "title"> & {
  userId: User["id"];
}) {
  return prisma.event.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteEvent({
  id,
  userId,
}: Pick<Event, "id"> & { userId: User["id"] }) {
  return prisma.event.deleteMany({
    where: { id, userId },
  });
}
