# README

# Dental Office Online Scheduling System - System Documentation

**Website URL**: [Jose’s Dental Clinic](http://ec2-3-27-15-134.ap-southeast-2.compute.amazonaws.com/)

## **1. Introduction**

The Dental Office Online Scheduling System is a web application designed to simplify the process of booking and managing dental appointments for patients. It employs React for the frontend, Node.js for the backend, and MongoDB as the database. The deployment of this application is orchestrated using Docker, AWS EC2 instances, and Kubernetes through Kops. This documentation provides an in-depth overview of the system architecture, components, database schema, deployment steps, and key assumptions made during the design and development.

## **2. System Architecture**

### **Frontend (React)**

- **Description**: The frontend component of the system serves as the user interface, displaying dental office information, services, and appointment scheduling features.
- **Interaction**: The React frontend communicates with the backend via RESTful APIs to retrieve data such as user profiles, available services, dentist information, and appointment scheduling details.

### **Backend (Node.js)**

- **Description**: The backend component, implemented in Node.js, is responsible for handling HTTP requests from the frontend and managing the system’s logic and data.
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

![Dental Office ERD drawio](https://github.com/migiburgos/dental-office/assets/67326096/34fb2207-60bd-4cab-b74f-f5f07b74167a)


## **5. Deployment Steps (AWS & Kubernetes)**

In this step, I will deploy the Dental Office application on an **AWS EC2 instance**, utilizing **Docker**, **Kubernetes**, **S3 Bucket**, and **Kops** for efficient, scalable hosting.

### Docker

Install Docker on your system by downloading and installing [Docker](https://www.docker.com/).

**Navigate to the Project Directory**

Open a terminal

Use the **`cd`** command to navigate to the root directory of the project. For example:

```bash
cd Downloads/dental-office
```

**Create a Docker Image**

In the project’s root directory, build a Docker image using the following command, replacing **`${username}`** with your Docker Hub username:

```bash
docker build . -t ${username}/dental-office
```

**Push to Docker Hub**

Push the Docker image to a Docker Hub repository for easy access during deployment:

```bash
docker push ${username}/dental-office
```

### **Create an EC2 Instance**

1. Go to the **[Amazon EC2 Dashboard](https://console.aws.amazon.com/ec2/)**.
 
2. Click on ‘Launch Instance’ to create a new EC2 instance.
   
3. Set a name for your instance and choose ‘Ubuntu’ as the operating system.
   
4. Select ‘Ubuntu Server 22.04’ (Free tier eligible) as the instance type.

   <img width="788" alt="3" src="https://github.com/migiburgos/dental-office/assets/67326096/2383aca9-cc52-41f6-83b0-4ebc85d629e1">
  
5. Choose ‘t2.micro’ as the instance type (Free tier eligible).

   <img width="790" alt="4" src="https://github.com/migiburgos/dental-office/assets/67326096/14c88f61-6c11-46f2-b36e-bd29ea269597">
  
6. Select ‘Create new key pair’ if you don’t have an existing one. Set a name for the key pair and click ‘Create key pair’. Make sure to save the .pem file securely.

   <img width="589" alt="5" src="https://github.com/migiburgos/dental-office/assets/67326096/fd6e686f-bc63-47c2-ab2d-69249e1b55a5">
   
7. Ensure that all three security rules are allowed.

    <img width="791" alt="6" src="https://github.com/migiburgos/dental-office/assets/67326096/7e944005-e4a8-4c9e-9b60-375a3d3bd86b">
   
8. Click on ‘Launch instance’ to create and launch the new EC2 instance.

### **Connect to the EC2 Instance**

1. Wait for the instance state and status checks to be ready, then press ‘Connect’.

   <img width="899" alt="7" src="https://github.com/migiburgos/dental-office/assets/67326096/0bbdebaf-5c87-4bd4-845f-85ec68778716">
  
2. Follow the provided steps to connect to the EC2 instance.

   <img width="813" alt="8" src="https://github.com/migiburgos/dental-office/assets/67326096/7412dc5d-96bc-4fdb-a9d4-793475d873e0">
  
3. The result should look something like this:

   <img width="1132" alt="10" src="https://github.com/migiburgos/dental-office/assets/67326096/5762617b-76b2-4f74-b78e-ba537b6a8f24">

### **Install Required Software on EC2**

**Install the latest updates**

```bash
sudo apt-get update
```

**Install Build Tools**

```bash
sudo apt-get install build-essential procps curl file git
```

**Install Homebrew**

Set a root password and then logout of root:

```bash
sudo su -
passwd ubuntu
# Enter a new UNIX password
exit
```

Download and install Homebrew:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Add Homebrew to your PATH:

```bash
test -d ~/.linuxbrew && eval "$(~/.linuxbrew/bin/brew shellenv)"
test -d /home/linuxbrew/.linuxbrew && eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
test -r ~/.bash_profile && echo "eval \"\$($(brew --prefix)/bin/brew shellenv)\"" >> ~/.bash_profile
echo "eval \"\$($(brew --prefix)/bin/brew shellenv)\"" >> ~/.profile
```

**Install Kops**

```bash
brew install kops
```

**Install AWS CLI**

```bash
brew install awscli
```

### **Grant AWS Access**

Create an IAM user by following these **[steps](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html)** and save the **`Access Key ID`** and **`Secret Access Key`**. Grant the user the necessary permissions as specified in the screenshot below:

<img width="232" alt="Screenshot 2023-09-20 at 10 57 38 AM" src="https://github.com/migiburgos/dental-office/assets/67326096/5c0ac058-b7fe-41c4-ad41-428fcbdbadff">


### **Configure AWS CLI**

Configure AWS with the new Secret Keys:

```bash
aws configure

AWS Access Key ID [None]: <Access Key ID>
AWS Secret Access Key [None]: <Secret Access Key>
Default region name [None]: us-west-2
```

Export keys to environment variables:

```bash
export AWS_ACCESS_KEY_ID=$(aws configure get aws_access_key_id)
export AWS_SECRET_ACCESS_KEY=$(aws configure get aws_secret_access_key)
```

### **Create S3 Bucket**

**Note:** If you delete an S3 bucket, you won’t be able to use the name again for some time.

Create an S3 bucket for cluster state:

```bash
aws s3api create-bucket \
    --bucket dental-office-state-store-us-west-2 \
    --region us-west-2 \
		--create-bucket-configuration \
		LocationConstraint=us-west-2
```

Create a separate S3 bucket for cluster OIDC and configure access settings:

```bash
aws s3api create-bucket \
    --bucket dental-office-oidc-store-us-west-2 \
		--region us-west-2 \
    --object-ownership BucketOwnerPreferred \
		--create-bucket-configuration \
		LocationConstraint=us-west-2
aws s3api put-public-access-block \
    --bucket dental-office-oidc-store-us-west-2 \
    --public-access-block-configuration BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false
aws s3api put-bucket-acl \
    --bucket dental-office-oidc-store-us-west-2 \
    --acl public-read
```

Enable versioning for the state store bucket:

```bash
aws s3api put-bucket-versioning --bucket dental-office-state-store-us-west-2  --versioning-configuration Status=Enabled
```

Encrypt the state store bucket:

```bash
aws s3api put-bucket-encryption --bucket dental-office-state-store-us-west-2 --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'
```

### **Create Kubernetes Cluster**

Set up environment variables before creating the gossip-based cluster:

```bash
export NAME=dental-office.k8s.local
export KOPS_STATE_STORE=s3://dental-office-state-store-us-west-2
export KOPS_OIDC_STORE=s3://dental-office-oidc-store-us-west-2
```

Create the cluster:

```bash
kops create cluster \
    --name=${NAME} \
		--state=${KOPS_STATE_STORE} \
    --cloud=aws \
    --zones=us-west-2a \
		--discovery-store=${KOPS_OIDC_STORE}/${NAME}/discovery
```

Update the cluster:

```bash
kops update cluster --name ${NAME} --yes --admin
```

Ensure that node statuses are ready:

```bash
kops validate cluster
```

The output should look like this when it’s ready

<img width="821" alt="11" src="https://github.com/migiburgos/dental-office/assets/67326096/73ae5dc1-bbed-4a2c-9638-2af50e208d7f">


Clone the YAML files from GitHub:

```bash
git clone https://github.com/migiburgos/dental-office-yaml
```

Create the pod, service, and deployment:

```bash
cd dental-office-yaml/ && kubectl apply -f dental-office.yaml
```

Get the external IP of the load balancer that redirects port 80 to the Dental Office app:

```bash
kubectl get svc
```
<img width="1197" alt="12" src="https://github.com/migiburgos/dental-office/assets/67326096/f97e938a-61fe-4751-9505-6155cf5c9adb">


Access the Dental Office application by entering the `**URL**`  into your browser’s address bar.

Now, you should be able to use the Dental Office application in your web browser. Enjoy!

This comprehensive deployment process has successfully enabled the deployment of the Dental Office application on an AWS EC2 instance using Docker, Kubernetes, and Kops, providing a scalable and containerized environment for efficient application management.

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
