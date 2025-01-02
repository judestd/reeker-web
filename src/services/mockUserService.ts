// import { CreateUserInput, UpdateUserInput, User } from '../types/user';
// import { PaginatedResponse, PaginationParams } from '../types/common';
// import { mockUsers } from '../data/mockUsers';
// import { generateId } from '../utils/helpers';

// let users = [...mockUsers];

// export const mockUserService = {
//   getUsers: (params: PaginationParams & { search?: string, status?: boolean, role?: string }): Promise<PaginatedResponse<User>> => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         let filteredUsers = [...users];

//         // Apply search
//         if (params.search) {
//           const searchLower = params.search.toLowerCase();
//           filteredUsers = filteredUsers.filter(user => 
//             user.fullName.toLowerCase().includes(searchLower) ||
//             user.email.toLowerCase().includes(searchLower)
//           );
//         }

//         // Apply status filter
//         if (params.status !== undefined) {
//           filteredUsers = filteredUsers.filter(user => user.isActive === params.status);
//         }

//         // Apply role filter
//         if (params.role) {
//           filteredUsers = filteredUsers.filter(user => user.role === params.role);
//         }

//         // Apply pagination
//         const start = (params.page - 1) * params.limit;
//         const paginatedUsers = filteredUsers.slice(start, start + params.limit);

//         resolve({
//           data: paginatedUsers,
//           total: filteredUsers.length,
//           page: params.page,
//           limit: params.limit
//         });
//       }, 500);
//     });
//   },

//   createUser: (data: CreateUserInput): Promise<User> => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const newUser: User = {
//           id: generateId(),
//           name: data.name,
//           fullName: data.fullName,
//           email: data.email,
//           role: data.role,
//           gender: data.gender,
//           birthday: data.birthday,
//           isActive: true,
//           status: data.status,
//           phone: data.phone,
//           // departmentId: data.departmentId,
//           avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.fullName}`,
//         };
//         users.push(newUser);
//         resolve(newUser);
//       }, 500);
//     });
//   },

//   updateUser: (id: string, data: UpdateUserInput): Promise<User> => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         const index = users.findIndex(user => user.id === id);
//         if (index === -1) {
//           reject(new Error('User not found'));
//           return;
//         }
//         users[index] = { ...users[index], ...data };
//         resolve(users[index]);
//       }, 500);
//     });
//   },

//   deleteUser: (id: string): Promise<void> => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         const index = users.findIndex(user => user.id === id);
//         if (index === -1) {
//           reject(new Error('User not found'));
//           return;
//         }
//         users = users.filter(user => user.id !== id);
//         resolve();
//       }, 500);
//     });
//   }
// };