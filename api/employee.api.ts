import { APIRequestContext, expect } from '@playwright/test';

export async function validateEmployeeAPI(request: APIRequestContext) {
  const response = await request.get('https://reqres.in/api/users/2');
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.data).toHaveProperty('id');
}
