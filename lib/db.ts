import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

// lib/db.ts

/**
 * A simple simulated database.
 * Uses localStorage on the client and a JSON file on the server.
 */

const IS_SERVER = typeof window === 'undefined';
const DB_FILE = path.join(process.cwd(), 'data', 'db.json');

// Ensure data directory exists on server
if (IS_SERVER) {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({ users: [] }));
    }
}

const getStoredData = () => {
    if (IS_SERVER) {
        const content = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(content);
    } else {
        const data = localStorage.getItem('db_data');
        return data ? JSON.parse(data) : { users: [] };
    }
};

const saveStoredData = (data: any) => {
    if (IS_SERVER) {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    } else {
        localStorage.setItem('db_data', JSON.stringify(data));
    }
};

export const db = {
  users: {
    getAll: () => {
      const data = getStoredData();
      return data.users || [];
    },

    findUnique: (where: { email?: string; id?: string }) => {
      const users = db.users.getAll();
      return users.find((u: any) => {
        if (where.email && u.email === where.email) return true;
        if (where.id && u.id === where.id) return true;
        return false;
      });
    },

    create: (data: any) => {
      const allData = getStoredData();
      const users = allData.users || [];
      const newUser = {
        ...data,
        id: randomUUID(),
        createdAt: new Date().toISOString(),
      };
      
      users.push(newUser);
      allData.users = users;
      saveStoredData(allData);
      
      return newUser;
    },

    update: (id: string, data: any) => {
      const allData = getStoredData();
      const users = allData.users || [];
      const index = users.findIndex((u: any) => u.id === id);
      
      if (index === -1) return null;
      
      users[index] = { ...users[index], ...data };
      allData.users = users;
      saveStoredData(allData);
      
      return users[index];
    },

    delete: (id: string) => {
      const allData = getStoredData();
      const users = allData.users || [];
      const filtered = users.filter((u: any) => u.id !== id);
      allData.users = filtered;
      saveStoredData(allData);
      return true;
    }
  }
};
