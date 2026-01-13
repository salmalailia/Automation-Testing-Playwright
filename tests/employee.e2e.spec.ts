import { test } from '@playwright/test';
import employee from '../data/employee.json';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage.ts';
import { AddEmployeePage } from '../pages/AddEmployeePage.ts';
import { EmployeeListPage } from '../pages/EmployeeListPage';
import { JobPage } from '../pages/JobPage';
import { validateEmployeeAPI } from '../api/employee.api';

test('Employee Full Flow - UI & API', async ({ page, request }) => {
  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const addEmployee = new AddEmployeePage(page);
  const employeeList = new EmployeeListPage(page);
  const jobPage = new JobPage(page);

  // 1 Login
  await login.goto();
  await page.pause(); // Inspector stop di sini
  await login.login('Admin', 'admin123');
  await login.verifyLoginSuccess();

  // 2 Add Employee
  await dashboard.goToPIM();
  await addEmployee.openAddEmployee();
  await addEmployee.addEmployee(
    employee.firstName,
    employee.lastName,
    employee.employeeId
  );
  await addEmployee.verifyEmployeeCreated(
    employee.firstName,
    employee.lastName
  );

  // 3 Edit Employee Job
  await employeeList.openEmployeeList();
  await employeeList.searchByEmployeeId(employee.employeeId);
  await employeeList.clickEditEmployee(employee.employeeId);
  await jobPage.openJobTab();
  await jobPage.editJob(employee.jobTitle, employee.employmentStatus);
  await jobPage.verifyJob(employee.jobTitle, employee.employmentStatus);

  // 4 API Validation
  await validateEmployeeAPI(request);

  // 5 Logout
  await dashboard.logout();
});
