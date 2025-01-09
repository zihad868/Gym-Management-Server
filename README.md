## Gym-Management-Server API
The Gym Class Scheduling and Membership Management System is a robust application designed to streamline gym operations effectively. It incorporates role-based access control, ensuring that Admins, Trainers, and Trainees have clearly defined permissions. Admins are responsible for creating and managing trainers, scheduling classes, and assigning trainers to schedules, while Trainers can view their assigned schedules but cannot modify them. Trainees can manage their profiles, book classes, and cancel bookings as needed.

#  Live API 
- https://gym-management-system-gamma-one.vercel.app/

  
  ## Features
- User Management: Register, log in, retrieve, update, and delete user accounts.
- Project Management: Create, list, update, and delete projects with owner and member roles.
- Task Management: CRUD operations on tasks within projects with priority and status tracking.
- Comment Management: Commenting on tasks with retrieval, updates, and deletions.
  

## Clone and Run Local Manually 



# API Documentation

### Authentication

- **POST** `/api/users/register/`
  - Body: `{"username": "string", "email": "your email" "password": "string", "first_name": "string", "last_name": "string"}`
 
    

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
