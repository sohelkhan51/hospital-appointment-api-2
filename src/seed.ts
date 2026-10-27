import "dotenv/config";
import { prisma } from "./lib/prisma.js";

async function main() {
  await prisma.appointment.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctor.deleteMany();

  const patient1 = await prisma.patient.create({
    data: {
      name: "Aarav Sharma",
      email: "aarav@example.com",
      phone: "9876543210",
      dateOfBirth: new Date("1995-04-15"),
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      name: "Priya Patel",
      email: "priya@example.com",
      phone: "9876543211",
      dateOfBirth: new Date("2000-08-20"),
    },
  });

  const doctor1 = await prisma.doctor.create({
    data: {
      name: "Dr. Meera Rao",
      specialty: "Cardiology",
      email: "meera@example.com",
    },
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      name: "Dr. Arjun Shah",
      specialty: "Dermatology",
      email: "arjun@example.com",
    },
  });

  await prisma.appointment.create({
    data: {
      patientId: patient1.id,
      doctorId: doctor1.id,
      appointmentDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      notes: "Initial consultation",
    },
  });

  await prisma.appointment.create({
    data: {
      patientId: patient2.id,
      doctorId: doctor2.id,
      appointmentDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
      notes: "Skin consultation",
    },
  });

  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
