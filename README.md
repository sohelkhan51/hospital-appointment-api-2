
# Hospital Appointment API

A PostgreSQL database project using Prisma ORM and TypeScript to manage hospital patients, doctors, and appointments.

## Technologies

- Node.js
- TypeScript
- Prisma ORM
- PostgreSQL

## Features

### Patients
- Create, retrieve, and search patients
- Update patient phone numbers
- Delete patients

### Doctors
- Create and retrieve doctors
- List doctors by specialty
- Delete doctors

### Appointments
- Book appointments
- Retrieve appointment details with patient and doctor information
- List upcoming appointments for a doctor
- Update appointment status
- Cancel scheduled appointments for a patient
- Delete appointments

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure `DATABASE_URL` in your local `.env` file.

3. Generate the Prisma client:

   ```bash
   npx prisma generate
   ```

4. Seed the database:

   ```bash
   npm run seed
   ```

5. Run the CRUD tests:

   ```bash
   npm test
   ```

## TypeScript Check

```bash
npx tsc --noEmit
```

