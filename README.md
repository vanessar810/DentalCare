# DentalCare App 🦷

A full-stack web application for managing a dental clinic. Includes secure patient management, appointments, and more.

## 🛠 Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Java, Spring Boot
- **Database**: MySQL
- **Authentication**: JWT


## ✨ Features

- User registration and login
- Role-based access (e.g., admin, dentist, patient)
- Manage patients, appointments, and odontologists (CRUD)
- Schedule and manage appointments in real time
- Responsive UI for mobile and desktop
- JWT-based secure authentication

🚨🚨 **Important!!**
Before testing the web app, make sure [DentalCare API](https://dentalcare-1-3w65.onrender.com/swagger-ui/index.html) is running, If the link doesn’t load, the backend server is currently down.

set up Frontend:
`cd Frontend`
```npm install```
```npm run dev```
set up Backend:
`cd Backend`
``` mvn clean package -DskipTests```
``` mvn spring-boot:run```

💡 Alternatively, if you want to run the built JAR directly:
```java -jar target/clinic-0.0.1-SNAPSHOT.jar```

👥 Test Accounts

To explore the full functionality, you can use these demo credentials:

Role	            Email	           Password
Admin	    admin@dentalcare.com       admin123
Dentist	    dentist@dentalcare.com     dentist123
Patient	    patient@dentalcare.com     patient123

🎥 Demo
https://github.com/user-attachments/assets/72a63285-4c7a-400f-9387-158a5d5f75cc


🚀 Deployment

Frontend: Deployed on Vercel

Backend: Deployed on [Oracle Cloud / Render]

Database: Oracle Cloud Autonomous Database

Web: https://dental-care-lyart.vercel.app/
SWAGGER: https://dentalcare-1-3w65.onrender.com/swagger-ui/index.html



