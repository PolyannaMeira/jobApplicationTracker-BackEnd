# Job Application Tracker

This project is a **Job Application Tracker**, designed to help users stay organized during their job search. Users can register, log in, and manage detailed records of each job application — including company name, job role, salary, application link, resume/CV sent, cover letter, interview dates, notes, and more.

Built with a modern stack using **Express.js**, **PostgreSQL** (via **Prisma**), and **JWT** authentication.

🧑‍🤝‍🧑 This project was developed as a group project with contributions from @khantm02, @hitomipupil, @edinssa, @stefan-000, and @PolyannaMeira, as part of the final assessment for the Full Stack Developer course at Hack Your Future Belgium.

## Features

* User registration and login
* JWT-based authentication
* CRUD operations for job applications
* Password change and profile update functionality
* Calendar agenda for upcoming interviews
* Responsive UI for job management and scheduling

## Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (via Prisma ORM)
* **Authentication:** JWT
* **Frontend:** React (in separate repository)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/PolyannaMeira/Job-Application-Tracker-Be.git
cd job-application-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root and set the following:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Set up the database with Prisma

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the development server

```bash
npm run dev
```

## Project Structure

```
├── controllers/         # Route handlers (user, jobs)
├── middleware/          # Token verification middleware
├── prisma/              # Prisma schema and migrations
├── routes/              # Express route definitions
├── utils/               # Helper functions (password hashing, validation)
├── .env                 # Environment variables
├── index.js             # Entry point of the server
└── package.json         # Project metadata and dependencies
```

## API Endpoints

### Auth Routes

* `POST /users/register` – Register a new user
* `POST /users/login` – Authenticate and receive JWT
* `POST /users/logout` – Logout user

### Profile Routes

* `GET /users/profile` – Fetch authenticated user's profile
* `PUT /users/update` – Update profile details
* `PUT /users/change-password` – Change password (requires current password)

### Job Routes

* `GET /jobs/jobs` – Fetch all jobs for the authenticated user
* `GET /job/:id` – Get a specific job by ID
* `POST /jobs/job` – Create a new job entry
* `PUT /job/:id` – Update a job
* `DELETE /job/:id` – Delete a job
* `GET /jobs/search?query=` – Search jobs by keyword

## Calendar Feature

The app includes a calendar that highlights interview dates and displays upcoming interviews per month, enhancing user organization during their job search.

## Authentication & Security

* JWT tokens are used for protected routes.
* Passwords are securely hashed using bcrypt.
* Auth tokens are stored client-side and attached to requests via headers.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Acknowledgements

* [Prisma ORM](https://www.prisma.io/)
* [Express.js](https://expressjs.com/)
* [React](https://reactjs.org/)
* [React Calendar](https://www.npmjs.com/package/react-calendar)
