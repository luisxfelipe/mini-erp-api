import { User } from '../entities/user.entity';

export const userMock: User = {
  id: 1,
  name: 'Cláudio Luis',
  email: 'claudio.luis@mock.com',
  password: '$2b$10$7fY3wUXbhVP4nVlUb29wFOQP4EQX2lVG5/SyI3qQ80matWjORB.zK',
  createdAt: new Date(),
  updatedAt: new Date(),
};
