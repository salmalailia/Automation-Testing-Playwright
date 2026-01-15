# Automation Testing using Playwright

## 1. Setup Instruction<br>
Install Node.js (v16+ recommended)<br>

Install Playwright<br>
— npm install<br>
— npx playwright install<br>

Install Allure<br>
— npm install -g allure-commandline<br>

## 2. Framework Structure<br>
├── pages/                # Page Object Model (POM) classes <br>
├── tests/                # Test specifications <br>
├── data/                 # Test data (JSON, images, etc.) <br>
├── allure-results/       # Allure raw results (generated after tests) <br>
├── allure-report/        # Allure HTML report <br>
├── package.json          # Node.js dependencies & scripts <br>
└── playwright.config.ts  # Playwright configuration <br>

## 3. Dependencies Used<br>
Playwright <br>
 — for browser automation (TypeScript) <br>
 
Allure Reporter <br>
 — for generating test reports <br>
 
Node.js <br>
 — JavaScript runtime<br>

## 4. How to Run the Tests<br>
— npx playwright test (run all test folder)<br>
— npx playwright test tests/Login.spec.ts (run in spesific test file)<br>
— npm run test:headed (for debugging)<br>
— npx playwright test --project=chromium (for spesific browser)<br>
— npm run report (reporting using allure)<br>

## Screenshot and Run Video <br>
<img width="960" height="563" alt="Screensh[a88231adc8f5f9c5.webm](https://github.com/user-attachments/assets/ac902979-bc8c-4cd9-96a5-ae146ca2a581)
ot 2026-01-14 084119" src="https://github.com/user-attachments/assets/fd4c06bd-ec68-4df6-9b50-e389da9c9dc2" />
[Login.webm](https://github.com/user-attachments/assets/c830b949-ed55-4e38-9af2-ef9f776dbb77), [Add.webm](https://github.com/user-attachments/assets/136db742-7a50-42a9-9fce-adcd1b04f60c), [Edit.webm](https://github.com/user-attachments/assets/d7018daa-6984-4d45-89d0-4cc6064f364c), dan [Delete & Logout (Timeout).webm](https://github.com/user-attachments/assets/af4ba236-7cc0-4287-87f1-022065ca76ce)

*Improvement for the Next Activity<br>
I encountered a few issues when running the tests automatically. Below are the details:<br>
1. Timeout Error During Test Execution:<br>
When running the tests automatically, I am facing a timeout issue because the website is not accessible within the time frame. This causes some of the tests to fail.<br>
2. Running Tests Individually (Without POM):<br>
As a workaround, if you prefer running the tests individually (without going through the Page Object Model), this can be done without issues.<br>
3. Page Object Model (POM) Available:<br>
Although there are issues with running the tests via POM due to the website timeout, the Page Object Model (POM) is already set up and can be utilized for specific test scenarios if needed.
