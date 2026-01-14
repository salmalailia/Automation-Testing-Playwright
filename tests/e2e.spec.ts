// spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login1';
import { AddEmployeePage } from '../pages/Add1';
import { EditEmployeePage } from '../pages/Edit1';
import { DeleteEmployeePage } from '../pages/Delete1';
import fs from 'fs'; // Node.js module to read files

test('Test add, edit, and delete employee flow with data from JSON', async ({ page }) => {
  // Load data from JSON file
  const data = JSON.parse(fs.readFileSync('./data/employee.json', 'utf-8')); // Make sure the path is correct

  // Extract data from the JSON object
  const firstName = data.firstName;
  const lastName = data.lastName;
  const employeeId = data.employeeId;
  const fileInput = 'data/profile.png';

  // Instantiate Page Object Model classes
  const loginPage = new LoginPage(page);
  const addEmployeePage = new AddEmployeePage(page);
  const editEmployeePage = new EditEmployeePage(page);
  const deleteEmployeePage = new DeleteEmployeePage(page);

  // Step 1: Log in
  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');
  await loginPage.verifyLogin();

  // Step 2: Add Employee
  await addEmployeePage.gotoPIM();
  await addEmployeePage.addEmployee(firstName, lastName, fileInput, employeeId);
  await addEmployeePage.verifyEmployeeCreated(firstName, lastName);

  // Step 3: Edit Employee
  await editEmployeePage.searchEmployee(employeeId);
  await editEmployeePage.editJobDetails();
  await editEmployeePage.verifyEmployeeUpdated('Account Assistant');
  await editEmployeePage.updateEmployeeAPI(firstName, lastName); // Dynamic API call to update employee

  // Step 4: Delete Employee
  await deleteEmployeePage.searchEmployee(employeeId);
  await deleteEmployeePage.deleteEmployee();
  await deleteEmployeePage.verifyEmployeeDeleted();
  await deleteEmployeePage.deleteEmployeeAPI(); // API call to delete employee

  // Step 5: Log out
  await deleteEmployeePage.logout();
  await deleteEmployeePage.verifyLogout();
});