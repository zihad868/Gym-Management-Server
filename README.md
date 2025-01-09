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

### Authentication
# Admin
- **POST** `/api/auth/admin-register/`
  - Body: `{"name": "string", "email": "your email" "password": "string"}`

- **POST** `/api/auth/admin-login/`
  - Body: `{"email": "your email" "password": "string"}`

- **POST** `/api/auth/assign-trainer/`
  - Body: `{"name": "string" "date": "Date Time", "startTime": "string", "endTime": "string", "trainerEmail": 'string'}`
    

- **POST** `/api/users/login/`
  - Get Refresh & Access Token
  - Body: `{"email": "string", "password": "string"}`
 
    

 - **GET** `/api/users/{user_id}`
   - Response: `Get User Details`


- **PATCH** `/api/users/{user id}/update/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    - Body: `{"email": "string"}`


- **PUT** `/api/users/{user id}/update/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    - Body: `{"username": "string", "email": "your email" "password": "string", "first_name": "string", "last_name": "string"}`

- **DELETE** `/api/users/{user id}/delete/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    -  Response: `User deleted successfully.`


### Projects
- **GET** `/api/projects/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    - Response: `Project Details`

 - **POST** `/api/projects/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    -  Body: `{"name": "string", "description": "string"}`

 - **GET** `/api/projects/{priject id}/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    - Response: `Specific Project Details`

  - **PATCH** `/api/projects/{priject id}/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    -  Body: `{"description": "string"}`
   
 - **PUT** `/api/projects/{priject id}/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    -  Body: `{"name": "string", "description": "string"}`
  
  - **DELETE** `/api/projects/{priject id}/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    -  Response: `Project deleted successfully.`


### Task
- **GET** `/api/projects/{project_id}/tasks/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    - Response: `Project Details`



 - **POST** `/api/projects/{project id}/tasks/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    -  Body: `{"title": "string", "description": "string"}`

 
 - **GET** `/api/tasks/{task id}/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    - Response: `Specific task details` 


 - **PATCH** `/api/tasks/{task id}/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    -  Body: `{"title": "string"}`
  
   
 - **PUT** `/api/tasks/{task id}/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    -  Body: `{"title": "string", "description": "string"}`
  
  - **DELETE**  /api/tasks/{task id}/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    -  Response: `Task deleted successfully.`



  ### Comments
- **GET** `/api/tasks/{task id}/comments/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    - Response: `Get comments specific task`


 - **POST** `/api/tasks/{task id}/comments/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    -  Body: `{"content": "string"}`

- **GET** `/api/comments/{comment id}/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    - Response: `Specific comment details`

 - **PATCH** `/api/comments/{comment id}/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    -  Body: `{"content": "string"}`
   
 - **PUT** `/api/comments/{comment id}/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    -  Body: `{"content": "string"}`

      
  - **DELETE**  `/api/comments/{comment id}/`
    - Header: `{Authorization:  Bearer  {Your Login Token}}`
    -  Response: `Task deleted successfully.`
