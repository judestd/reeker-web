import { User } from "./user";

export interface Department {
    _id: string;
    name: string;
    description?: string;
    foundationDate: string;
    ownerId: string;
    isActive: boolean;
    owner?: Pick<User, '_id' | 'fullName' | 'email' | 'avatar'>;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateDepartmentInput {
    name: string;
    description?: string;
    foundationDate: string;
    ownerId: string;
  }
  
  export interface UpdateDepartmentInput {
    name?: string;
    description?: string;
    foundationDate?: string;
    ownerId?: string;
  }