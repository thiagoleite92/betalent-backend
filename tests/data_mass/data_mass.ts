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

export const VALID_CLIENT_DATA = [
  {
    name: 'Thiago Leite',
    cpf: '123.456.789-05',
    address: {
      uf: 'PE',
      city: 'Recife',
      neighborhood: 'Jardim Paulista',
      street: 'Rua dos Bobos',
      number: '123',
      complement: 'Apto 45',
      zip_code: '50711-181',
      country: 'Brasil',
      is_primary: true,
    },
    phoneNumber: '81999999998',
  },
]

export const VALID_CLIENT_DATA_PUT = [
  {
    name: 'Thiago Leite',
    cpf: '123.456.789-05',
  },
]

export const VALID_CLIENT_DATA_CPF_TAKEN = [
  {
    name: 'Thiago Leite',
    cpf: '123.456.789-02',
  },
]

export const VALID_PRODUCT_DATA = [
  {
    name: 'mamao',
    description: 'Fruta que ajuda na evacuação intestinal',
    price: 50.99,
    stock: 50,
  },
]
