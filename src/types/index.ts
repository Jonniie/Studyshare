export interface User {
  id: string;
  fullName: string;
  email: string;
  university: string;
  profilePic?: string;
  role: "student" | "admin";
  createdAt: Date;
}

export interface University {
  id: string;
  name: string;
  faculties: Faculty[];
}

export interface Faculty {
  id: string;
  name: string;
  universityId: string;
  departments: Department[];
}

export interface Department {
  id: string;
  name: string;
  facultyId: string;
  years: Year[];
}

export interface Year {
  id: string;
  year: number;
  departmentId: string;
  courses: Course[];
}

export interface Course {
  id: string;
  courseCode: string;
  title: string;
  yearId: string;
  pastQuestions: PastQuestion[];
}

export interface PastQuestion {
  id: string;
  courseId: string;
  uploadedBy: string;
  title: string;
  fileUrl: string;
  type: "PDF" | "Image";
  votes: number;
  createdAt: Date;
  uploader?: User;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface RegisterData {
  full_name: string;
  email: string;
  phone_number: string;
  university: string;
  password: string;
}
export interface UploadData {
  universityName: string;
  facultyName: string;
  departmentName: string;
  year: number;
  courseCode: string;
  title: string;
  files: File[];
}

export interface LoginData {
  email: string;
  password: string;
}
