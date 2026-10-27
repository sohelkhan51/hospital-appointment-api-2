
import { prisma } from "./lib/prisma.js";

export async function createPatient(data: {
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
}) {
  return prisma.patient.create({
    data: {
      name: data.name,
      email: data.email,
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(data.dateOfBirth !== undefined && {
        dateOfBirth: data.dateOfBirth,
      }),
    },
  });
}

export async function getPatient(id: number) {
  return prisma.patient.findUnique({
    where: { id },
    include: { appointments: true },
  });
}

export async function searchPatients(query: string) {
  return prisma.patient.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { name: "asc" },
  });
}

export async function updatePatientPhone(id: number, phone: string) {
  return prisma.patient.update({
    where: { id },
    data: { phone },
  });
}

export async function deletePatient(id: number) {
  return prisma.patient.delete({
    where: { id },
  });
}

