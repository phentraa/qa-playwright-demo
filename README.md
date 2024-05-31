# Demo Playwright Project
In this project I would like to demonstrate
- E2E and API testing
- Fixtures for adding **apiBaseUrl** to default configuration options
- Page Object Modeling
- Allure reporting
- Global Setup and Teardown as project dependencies.  
_(For prepopulate the app with test users and cleaning up.)_
- Parametrized tests
- Using test data from CSV files
- GitHub Action integration

## About the test object

I choose the publicly available Notes App from **expandtesting.com**, because it is both accessible through a graphical user interface and an API.  
[Notes App Homepage](https://practice.expandtesting.com/notes/app/)  
[Notes App API Documentation](https://practice.expandtesting.com/notes/api/api-docs/)

Thank you very much for the developers for this great training opportunity!

---

## Installing the project
1. Install Docker on your computer
2. Clone this project
3. In the root folder of the project execute the command:  
```docker compose up -d```

## Running the tests
```bash
# Running tests in Chromium, Firefox and Webkit. Reporting with Allure
npm run test

# Running tests only in Chromium and with a simple line reporter
npm run test:dev
```
