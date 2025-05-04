import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import { User } from './models/user.js';  
import { connectDB } from './db/index.js';  

const seedUsers = async () => {
  try {
    await connectDB();
    
    await User.sync();
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const contactsPath = path.join(__dirname, 'db/contacts.json');  
    const contactsData = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(contactsData);
    
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    for (const contact of contacts) {
      const existingUser = await User.findOne({ where: { email: contact.email } });
      
      if (!existingUser) {
        await User.create({
          email: contact.email,
          password: hashedPassword,
          verify: true,  
          subscription: "starter",
          token: null,
          avatarURL: null,
          verificationToken: null
        });
        console.log(`User created: ${contact.email}`);
      } else {
        console.log(`User already exists: ${contact.email}`);
      }
    }
    
    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error.message);
  } finally {
    process.exit(0);
  }
};

// Execute the seed function
seedUsers();