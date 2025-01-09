## Gym-Management-Server API
The Gym Class Scheduling and Membership Management System is a robust application designed to streamline gym operations effectively. It incorporates role-based access control, ensuring that Admins, Trainers, and Trainees have clearly defined permissions. Admins are responsible for creating and managing trainers, scheduling classes, and assigning trainers to schedules, while Trainers can view their assigned schedules but cannot modify them. Trainees can manage their profiles, book classes, and cancel bookings as needed.

#  Live API 
- https://gym-management-system-gamma-one.vercel.app/

  
  ## Features
- User Management: Register, login  for Admins, Trainers, and Trainees with role-based access control.
- Class Scheduling: Admins can create class schedules while enforcing rules such as a maximum of five schedules per day, with each class lasting two hours.
- Trainer Management: Can view assigning them to specific class schedules.
- Trainee Management: Trainees can join and cancel class schedules
- Authentication and Authorization: JWT-based secure authentication with role-specific permissions to prevent unauthorized access.

  

## Clone and Run Local Manually 
- git clone https://github.com/zihad868/Gym-Management-Server.git
- cd Gym-Management-Server
- npm install
- npm run dev


# API Documentation

# Authentication
## Admin
- **POST** `/api/auth/admin-register`
  - Body: `{"name": "string", "email": "your email" "password": "string"}`

- **POST** `/api/auth/admin-login`
  - Body: `{"email": "your email" "password": "string"}`

- **POST** `/api/auth/assign-trainer`
  - Header: `{Authorization:  Bearer  {Your Login Token}}`
  - Body: `{"name": "string" "date": "Date Time", "startTime": "string", "endTime": "string", "trainerEmail": 'string'}`


## Trainer
  - **POST** `/api/auth/trainer-register`
  - Body: `{"name": "string", "email": "your email" "password": "string", "expertise": "string"}`

- **POST** `/api/auth/trainer-login`
  - Body: `{"email": "your email" "password": "string"}`                    


- **GET** `/api/auth//trainer-schedule`
  - Header: `{Authorization:  Bearer  {Your Login Token}}`
  - response:  `{"Class Shedule"}`
 
## Trainee
- **POST** `/api/auth/trainee-register`
  - Body: `{"name": "string", "email": "your email" "password": "string"}`

- **POST** `/api/auth//trainee-login`
  - Body: `{"email": "your email" "password": "string"}`
 
- **POST** `/api/auth/join-class`
  - Header: `{Authorization:  Bearer  {Your Login Token}}`
  - Body: `{"classId": "string"}`
 
- **POST** `/api/auth//cancel-booking`
  - Header: `{Authorization:  Bearer  {Your Login Token}}`
  - Body: `{"classId": "string"}`

