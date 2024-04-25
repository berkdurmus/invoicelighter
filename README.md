# Invoice Lighter

<img width="372" alt="Screenshot 2024-04-25 at 21 51 51" src="https://github.com/berkdurmus/invoicelighter/assets/32547890/2a2b7301-ee26-47e0-8147-09fee6eab736">


## Introduction
Invoice Lighter is invoice approval workflow application. It includes both frontend and backend. Frontend is written in React + Vite + Typescript, Backend is written with Node + Typescript. Followed fully OOP structure in Typescript where we have factory pattern, classes, interfaces etc. 

We did not hardcode the all conditions, instead created a config file called config.constant.ts under backend/src/config. We could define rules and steps inside the config file whenever we want to change the logic. 

## DB Schema
**Entities and Their Attributes**

<img width="701" alt="Screenshot 2024-04-25 at 22 06 38" src="https://github.com/berkdurmus/invoicelighter/assets/32547890/cab3ba85-0fba-4a81-8a28-8b25500697b7">

## DB Design
For smaller applications, the entire workflow could indeed be managed in-memory using this schema as a guide. In a production environment, a database like PostgreSQL or MySQL would be well-suited to handle this relational structure.
Using JSON for storing parameters allows the schema to handle dynamic configurations without altering the database schema for every rule or action change.


## Prerequisites
- Node.js
- npm


### Installation
1. **Clone the repository:**
   ```bash
   git clone git@github.com:berkdurmus/invoicelighter.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd invoicelighter
   ```
3. **Install backend dependencies:**
   ```bash
   cd backend
   npm install 
   ```
4. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install 
   ```

### Run
1. **Run Backend dev environment:**
   ```bash
   cd backend
   npm run dev
   ```
2. **Run Frontend dev environment:**
   ```bash
   cd frontend
   npm run dev
   ```

## Running the Tests
Backend project uses Jest for testing. To run tests, use the following command:
```bash
npm test
```

## Test Results
I've created 6 test cases. 6/6 passed successfully. Tests are provided below:

<img width="1488" alt="Screenshot 2024-04-25 at 22 04 17" src="https://github.com/berkdurmus/invoicelighter/assets/32547890/dfd32468-d8bd-43e8-ad28-2457f40d628a">

## Frontend Test Video

https://github.com/berkdurmus/invoicelighter/assets/32547890/304714ce-d695-4160-9f52-9a89738a9adf

## Contributing
Contributions to Invoice Lighter are welcome. Please ensure to update tests as appropriate.

## License
This project is licensed under the ISC License.


