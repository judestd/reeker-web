// src/mocks/departments.mock.ts

interface Department {
  _id: string;
  name: string;
  foundation_date: string; // ISO format date
  owner_id: string; // OID (ObjectId) of the department head
}

export const mockDepartments: Department[] = [
  {
    _id: "63f1a7f84f10c12345678901",
    name: "Human Resources",
    foundation_date: "2024-12-31T09:56:10.694+00:00",
    owner_id: "63f1b8f84f10c12345678902", // Example Trưởng phòng ID
  },
  {
    _id: "63f1a7f84f10c12345678902",
    name: "Engineering",
    foundation_date: "2021-12-31T09:56:10.694+00:00",
    owner_id: "63f1b8f84f10c12345678903",
  },
  {
    _id: "63f1a7f84f10c12345678903",
    name: "Sales",
    foundation_date: "2018-12-31T09:56:10.694+00:00",
    owner_id: "63f1b8f84f10c12345678904",
  },
];
