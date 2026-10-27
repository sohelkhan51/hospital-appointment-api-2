
import "dotenv/config";
import { prisma } from "./lib/prisma.js";
import {
  createPatient,
  getPatient,
  searchPatients,
  updatePatientPhone,
  deletePatient,
} from "./patients.js";
import {
  createDoctor,
  getDoctor,
  listDoctorsBySpecialty,
  deleteDoctor,
} from "./doctors.js";
import {
  bookAppointment,
  getAppointmentFull,
  getDoctorUpcomingAppointments,
  setAppointmentStatus,
  cancelAllPatientAppointments,
  deleteAppointment,
} from "./appointments.js";

async function main() {
  console.log("\n--- PATIENT TESTS ---");

  const patient = await createPatient({
    name: "Test Patient",
    email: "test.patient@example.com",
    phone: "9000000001",
    dateOfBirth: new Date("1998-06-15"),
  });
  console.log("Created patient:", patient);

  console.log("Get patient:", await getPatient(patient.id));
  console.log("Search patients:", await searchPatients("Test Patient"));

  console.log(
    "Updated patient:",
    await updatePatientPhone(patient.id, "9000000002"),
  );

  console.log("\n--- DOCTOR TESTS ---");

  const doctor = await createDoctor({
    name: "Dr. Test Doctor",
    specialty: "General Medicine",
    email: "test.doctor@example.com",
  });
  console.log("Created doctor:", doctor);

  console.log("Get doctor:", await getDoctor(doctor.id));
  console.log(
    "Doctors by specialty:",
    await listDoctorsBySpecialty("General Medicine"),
  );

  console.log("\n--- APPOINTMENT TESTS ---");

  const appointment = await bookAppointment({
    patientId: patient.id,
    doctorId: doctor.id,
    appointmentDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    notes: "Test appointment",
  });
  console.log("Booked appointment:", appointment);

  console.log(
    "Full appointment:",
    await getAppointmentFull(appointment.id),
  );

  console.log(
    "Doctor upcoming appointments:",
    await getDoctorUpcomingAppointments(doctor.id),
  );

  console.log(
    "Updated appointment status:",
    await setAppointmentStatus(appointment.id, "confirmed"),
  );

  console.log(
    "Cancelled patient appointments:",
    await cancelAllPatientAppointments(patient.id),
  );

  console.log(
    "Deleted appointment:",
    await deleteAppointment(appointment.id),
  );

  console.log("\n--- CLEANUP TEST RECORDS ---");

  console.log("Deleted patient:", await deletePatient(patient.id));
  console.log("Deleted doctor:", await deleteDoctor(doctor.id));

  console.log("\nAll CRUD tests completed successfully.");
}

main()
  .catch((error) => {
    console.error("Test failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

