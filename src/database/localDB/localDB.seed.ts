import { extractError } from '../../utils';
import { localDB } from './localDB.connection';
import { localSchema } from './localDB.schema';
import { log } from 'console';

export async function seedDatabase(): Promise<void> {
  try {
    await localDB.insert(localSchema.user).values([
      {
        name: 'Developer',
        email: 'developer@example.in',
        password: '$2b$10$l5sLRGUmg0uFYghyc2O7fu2ZrkXZ.aA3PVoKFutLr3GTDLjKy9/Mi', // password: 123456
        phone: '1234567890',
      },
      {
        name: 'Admin',
        email: 'admin@example.in',
        password: '$2b$10$l5sLRGUmg0uFYghyc2O7fu2ZrkXZ.aA3PVoKFutLr3GTDLjKy9/Mi', // password: 123456
        phone: '9876543210',
      },
      {
        name: 'John',
        email: 'john@example.in',
        password: '$2b$10$l5sLRGUmg0uFYghyc2O7fu2ZrkXZ.aA3PVoKFutLr3GTDLjKy9/Mi', // password: 123456
        phone: '1231231234',
      },
    ]);

    log('Database seeded successfully.');
    process.exit(1);
  } catch (error) {
    console.error('Error seeding database:', extractError(error));
    process.exit(1);
  }
}

seedDatabase();
