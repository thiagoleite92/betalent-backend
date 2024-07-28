export const VALID_DATA = [{ email: 'user1@gmail.com', password: '123123' }]
export const INVALID_EMAIL = [{ email: 'invalid_email_format', password: '123123' }]

export const INVALID_PASSWORD = [
  {
    email: 'user1@gmail.com',
    password: '12345',
    meta: { min: 6 },
    rule: 'minLength',
    field: 'password',
    message: 'The password field must have at least 6 characters',
  },
  {
    email: 'user1@gmail.com',
    password: '12345678910',
    meta: { max: 10 },
    rule: 'maxLength',
    message: 'The password field must not be greater than 10 characters',
    field: 'password',
  },
]
