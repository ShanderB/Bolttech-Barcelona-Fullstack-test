# Bolttech Carental MVP

## Overview
This project is an MVP for a car rental platform in Barcelona. It includes a basic UI and API to manage car availability and bookings.

## Tech Stack
- **Frontend**: React, Typescript, React Context, Axios, Mui Material
- **Backend**: Node.js, Typescript, Express, Mongoose, Jest, Supertest
- **Database**: MongoDB
- **Containerization**: Docker

## Setup
1. Clone the repository.
2. Type './start-all.sh' if using Linux or 'start-all.bat' if using Windows to start the Docker containers.
3. Access the frontend at `http://localhost:3000`, and if you want, backend at `http://localhost:5000`.
4. If you want to reset all database data, run the seed script with `npm run seed`. You can execute this even while Docker is running.

## Implementation Details
I developed both the frontend and backend for this project. Here are some key points about the implementation:

### Backend
- I created all the backend tests, achieving 100% test coverage.
- I added as many validations as possible to ensure data integrity.
- When starting the Docker containers, the MongoDB database is built, a seed script is executed to populate initial data, and then the backend starts.
- When a booking is made, the backend saves the booking and removes 1 unit from the car's stock in the car table. I initially tried to implement this using transactions, but it wasn't working correctly. To avoid spending too much time, I implemented it in a way that I fully understand is not ideal: saving the booking and updating the car stock separately.

### Frontend
- After the backend and database initialization, the frontend build process starts. Once completed, the application is ready to use with pre-seeded data.
- I used React Context to manage the dark theme. I didn't find a compelling use case for Context in this project, and using Redux felt unnecessary for the scope.
- I focused on componentization, creating separate components for each action. This approach ensures that only necessary components re-render, which is beneficial for complex systems (not this one).
- All components are properly typed and include validations.
- I am using browser cookies to persist the dark mode setting.

### General
- I followed the SOLID principles for both frontend and TDD in the backend development.
- For the "License Valid" feature, I couldn't fully understand its requirements. Without a Product Owner (PO) to clarify, I implemented a field where users can input an "ID". If a booking is attempted with the same ID, an error is triggered. I believe this is a reasonable approach, but I would appreciate feedback on this implementation. I also tried researching on Google, but it wasn't very clear to me how a valid U.S. license should work.
- Regarding the design, I am not very skilled in this area when we talk about creating something out of blue, so I used AI chat tools to generate some screen ideas for me. I didn't have any particularly good images, so I mixed elements from different suggestions and left it as it is. The AI-generated design served as a kind of Figma provided by a PO.
- The dark mode feature was something I had never implemented before, so I used GitHub Copilot to help generate it for me.
- The car images are SVGs. I sourced them from RepoSVG, converted them to Base64, and added them to the database seed.
- I used Docker for containerization, which is a great way to ensure that the application runs consistently across different environments.

## Areas for Improvement
- Adding a toast notification system to display errors or success messages to improve user feedback.
- Implementing frontend tests to ensure the same level of reliability as the backend.
- Adding a listing of all bookings.
- Creating a separate schema to handle bookings, containing booking-specific data, instead of directly reducing the stock within the car schema.
- Refactoring the booking process to use transactions properly, ensuring atomicity when saving the booking and updating the car stock. I tried adding transactions, but it wasn't working correctly. I would need to spend more time on this to ensure it works as expected.