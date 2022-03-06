type UserCreatedEvent = {
  subject: string;
  data: any;
};

export const userId: UserCreatedEvent = {
  subject: 'Satish',
  data: {},
};

export const satish = 'asdf';

export const Greeter = (name: string) => `Hello ${name}`;
