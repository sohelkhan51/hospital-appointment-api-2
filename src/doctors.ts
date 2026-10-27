
import { prisma } from "./lib/prisma.js";

export async function createDoctor(data: {
  name: string;
  specialty: string;
  email: string;
}) {
  return prisma.doctor.create({
    data: {
      name: data.name,
      specialty: data.specialty,
      email: data.email,
    },
  });
}

export async function getDoctor(id: number) {
  return prisma.doctor.findUnique({
    where: { id },
    include: { appointments: true },
  });
}

export async function listDoctorsBySpecialty(specialty: string) {
  return prisma.doctor.findMany({
    where: {
      specialty: { equals: specialty, mode: "insensitive" },
    },
    orderBy: { name: "asc" },
  });
}

export async function deleteDoctor(id: number) {
  return prisma.doctor.delete({
    where: { id },
  });
}
