# Project Proposal: Disaster Relief Coordination Platform

## Description

A full-stack web application designed to streamline disaster relief efforts by providing a simple way to manage resources efficiently and connect volunteers with people in need during disasters.

## Context

Natural disasters are on the rise due to global warming, with increasing frequency and intensity of events such as hurricanes, flash floods, and wildfires. According to the WHO, natural disasters affect approximately 160 million people worldwide each year. Coordinating communities and resources during these events often proves challenging and chaotic given the unpredictable and destructive nature of such moments. This often leads to delays and mismanagement, impacting the effectiveness of relief operations.

Some of the worst impacted regions are isolated or underdeveloped areas, which only increases the complexity of relief efforts. Communities always play a huge role in response and recovery, particularly when volunteers are coming in short supply. These are the events we are the least likely to know about, since the ones that make it to public media are usually the more devastating ones, which tend to receive international help. When coordinated efforts come into play, things are usually more efficient.

"The United Nations Disaster Assessment and Coordination (UNDAC) system is managed by OCHA. OCHA mobilizes UNDAC teams mostly in the event of a natural hazard events, when a disaster-affected country requests international assistance and requires additional international coordination resources." - [UN OCHA](https://www.unocha.org/our-work/coordination)

### Problem

Joining the UNDAC system is a complex process, and it's not something that can be done on the spot. It also seems to imply that volunteers are often "deployed" for a certain amount of time , maybe to a specific location where ongoing help might be needed. This is where HelpHive (the platform) comes in to diverge with a new approach. By providing a platform that can be used by anyone, anywhere, at any time, it changes the perspective from "actively choosing to go help" to "available to be notified when help is needed" - a more passive approach that I believe will prove less demanding and more inclusive.

### Intended Users

-   **Volunteers**: Individuals willing to assist in disaster relief efforts.
-   **Coordinators**: Organizations or individuals managing resources and directing volunteers.
-   **Affected Individuals**: People impacted by the disaster who require assistance.

## Features

-   **User Authentication**: Secure user registration and login, with role-based access control.
    -   **Create**: Register new users.
    -   **Read**: View user profiles.
    -   **Update**: Modify user information.
    -   **Delete**: Remove user accounts.
-   **Resource Management**:

    -   **Create**: Add new resources such as food, water, shelter, and medical supplies.
    -   **Read**: View available resources and their locations.
    -   **Update**: Update the status of resources, such as needs and availability.
    -   **Delete**: Remove resources that are no longer available or needed.

-   **Volunteer Coordination**:
    -   **Create**: Post new volunteer opportunities and roles.
    -   **Read**: View and sign up for volunteer tasks.
    -   **Update**: Modify volunteer roles and schedules.
    -   **Delete**: Cancel volunteer opportunities.

## User Interface

### Description

The user interface will be designed to be intuitive and user-friendly, enabling users to easily navigate through the platform and access the necessary features.

### Wireframe

The wireframes documentation can be found [here](./Wireframes.md)

## Architecture

### Description

The application will follow an N-tier architecture with a clear separation of concerns between the client, server, and database layers.

### Architecture Diagram

```plaintext
+--------------------+        +-------------------+        +-------------------+
|   Client (React)   | <----> | Server (Express)  | <----> | Database (MongoDB)|
+--------------------+        +-------------------+        +-------------------+
```

## RESTful Routing

| Route               | HTTP Method | Description                        | Headers            | Payload/Response          |
| ------------------- | ----------- | ---------------------------------- | ------------------ | ------------------------- |
| /api/auth/register  | POST        | Register a new user                | Content-Type: JSON | Payload: User Data        |
| /api/auth/login     | POST        | User login                         | Content-Type: JSON | Payload: Login Data       |
| /api/resources      | GET         | Get all resources                  | Authorization: JWT | Response: Resource List   |
| /api/resources      | POST        | Add a new resource                 | Authorization: JWT | Payload: Resource Data    |
| /api/resources/:id  | PUT         | Update resource information        | Authorization: JWT | Payload: Updated Data     |
| /api/resources/:id  | DELETE      | Delete a resource                  | Authorization: JWT | Response: Success Message |
| /api/volunteers     | GET         | Get all volunteer opportunities    | Authorization: JWT | Response: Opportunities   |
| /api/volunteers     | POST        | Create a new volunteer opportunity | Authorization: JWT | Payload: Opportunity Data |
| /api/volunteers/:id | PUT         | Update volunteer opportunity       | Authorization: JWT | Payload: Updated Data     |
| /api/volunteers/:id | DELETE      | Delete a volunteer opportunity     | Authorization: JWT | Response: Success Message |

## Data Models

The Class diagrams documentation can be found [here](./Class-diagrams.md)

## Deployment

### Description

The application will be deployed using free cloud services that support environment variables and secure storage of sensitive information.

## Technologies

-   **Frontend**: React
-   **Backend**: Node.js/Express
-   **Database**: MongoDB
-   **Authentication**: JWT (JSON Web Tokens)
-   **Testing Tools**: Mocha/Chai
-   **Hosting**: Netlify (Frontend), Render (Backend), MongoDB Atlas (Database)

### Environment Variables

-   **JWT_SECRET**: Secret key for JWT authentication.
-   **MONGODB_URI**: Connection string for MongoDB Atlas.
-   **BACKEND_URL**: URL of the backend application.
-   **BACKEND_PORT**: Port number for the server
-   **CLIENT_URL**: URL of the frontend application.
-   **CLIENT_PORT**: Port number for the client
-   **API_KEYS**: Any third-party API keys needed (e.g., for mapping services).
