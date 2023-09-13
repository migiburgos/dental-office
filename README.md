# Dental Office Online Scheduling System - System Documentation

## **1. Introduction**

The Dental Office Online Scheduling System is a web application designed to simplify the process of booking and managing dental appointments for patients. It employs React for the frontend, Node.js for the backend, MongoDB as the database, and deploys the application on AWS EC2 instances using Docker containers. This documentation provides an in-depth overview of the system architecture, components, database schema, deployment steps, and key assumptions made during the design and development.

## **2. System Architecture**

### **Frontend (React)**

- **Description**: The frontend component of the system serves as the user interface, displaying dental office information, services, and appointment scheduling features.
- **Interaction**: The React frontend communicates with the backend via RESTful APIs to retrieve data such as user profiles, available services, dentist information, and appointment scheduling details.

### **Backend (Node.js)**

- **Description**: The backend component, implemented in Node.js, is responsible for handling HTTP requests from the frontend and managing the system's logic and data.
- **Interaction**: It interacts with the MongoDB database to perform CRUD (Create, Read, Update, Delete) operations on user profiles, services, dentists, and appointments. It also manages user authentication and error handling.

### **Database (MongoDB)**

- **Description**: MongoDB serves as the database system for storing user profiles, service details, dentist information, and appointment history.
- **Interaction**: The backend component communicates with the MongoDB database to retrieve user data, services, dentist information, and to manage appointment records.

## **3. Components**

### **Frontend Components**

1. **Home Page**:
    - Displays dental office information and services.
    - Provides a call to action for scheduling appointments.
2. **Booking Page**:
    - Allows users to select a dentist, view available appointment slots, and schedule appointments.
3. **User Dashboard**:
    - After login, users can view their upcoming appointments, reschedule, or cancel them.
4. **Third-Party Libraries/Tools**:
    - React Router: Client-side routing for navigation.
    - Axios: HTTP requests to communicate with the backend APIs.
    - Material-UI: UI framework for responsive design.
    - Redux Toolkit (State Management): To manage global application state efficiently.

### **Backend Components**

1. **Authentication**:
    - Handles user registration and login.
    - Manages user profile information securely.
2. **CRUD Endpoints**:
    - Implements RESTful API endpoints for managing services, appointments, and user data.
3. **Error Handling**:
    - Properly handles errors and returns appropriate status codes and messages.
4. **Third-Party Libraries/Tools**:
    - Express.js: Web application framework for routing and handling HTTP requests.
    - Mongoose: MongoDB object modeling for Node.js.
    - Bcrypt: Hashing library for password security.
    - Dotenv: Environment variable management.
    - Cors: Cross-origin resource sharing middleware.
    - Jsonwebtoken: For generating and validating JSON Web Tokens for authentication.

## **4. Database Schema**

### **Users Table**

- Fields: name, username, password
- Purpose: Stores user profiles and authentication credentials.

### **Services Table**

- Fields: title, description
- Purpose: Stores service information.

### **Doctors Table**

- Fields: name, timings (day and time slots)
- Purpose: Stores dentist information and their working hours.

### **Appointments Table**

- Fields: user, service, doctor, day, time
- Purpose: Records appointment details, including the user, selected service, assigned dentist, appointment day, and time.

![Dental Office ERD drawio](https://github.com/migiburgos/dental-office/assets/67326096/6fa9e73f-5bd1-4c52-83ff-4be49624612b)

## **5. Deployment Steps**

1. **Requirements**:
    - Make sure Docker is installed on your system.
2. **Open Terminal and Navigate to Project Directory**:
    - Use the **`cd`** command to navigate to the root directory of the project. For example:
    
    ```
    ~ % cd Downloads/dental-office
    ```
    
3. **Create a Docker Image**:
    - In the project's root directory, build a Docker image using the following command, replacing **`${username}`** with your Docker Hub username:
    
    ```
    docker build . -t ${username}/dental-office
    ```
    
4. **Push to Docker Hub**:
    - Push the Docker image to a Docker Hub repository for easy access during deployment:
    
    ```
    docker push ${username}/dental-office
    ```
    
5. **Create and Connect to EC2 Instance**:
    - Launch an AWS EC2 instance and securely connect to it using SSH.
6. **Install Docker on EC2 Instance**:
    - Install Docker on the EC2 instance to run containers. Run the following commands:
    
    ```
    sudo yum update -y
    sudo yum install docker
    sudo service docker start
    ```
    
7. **Pull Docker Image and Run Container**:
    - Pull the Docker image from Docker Hub onto the EC2 instance and run it in a container. Replace **`${username}`** with your Docker Hub username:
    
    ```
    sudo docker run --platform linux/amd64 --restart=always -p 80:8080 ${username}/dental-office
    ```
    

These deployment steps guide you through building a Docker image, pushing it to Docker Hub, setting up an EC2 instance, installing Docker, and running the application container.

## **6. Assumptions**

1. **Appointment Booking Constraints**:
    - Assumption: Appointment slots can only be booked for the current week, and users cannot book appointments for future weeks without using a date picker.
    - Impact: Users can schedule appointments for a limited timeframe, which may affect scheduling flexibility.
    - Fallback Plan: Implement a date picker to enable users to select appointments beyond the current week, allowing for more extended booking options.
2. **Website Responsiveness**:
    - **Assumption**: The website is assumed to be primarily viewed on a computer. Viewing on mobile devices may result in a suboptimal user experience due to non-responsiveness.
    - **Impact**: Mobile users may encounter usability issues and layout problems when accessing the site.
    - **Mitigation**: Implement responsive design to ensure the website adapts and functions well on various screen sizes, including mobile devices, enhancing accessibility and user satisfaction.

## 7. Conclusion

The Dental Office Online Scheduling System simplifies appointment booking for dental offices. This comprehensive documentation outlines its architecture, components, database schema, deployment steps, and key assumptions. It seamlessly integrates React, Node.js, and MongoDB for a user-friendly experience.
