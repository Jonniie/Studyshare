import { University, Faculty, Department, Year, Course, PastQuestion, User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    fullName: 'John Doe',
    email: 'john@unilag.edu.ng',
    university: 'University of Lagos',
    role: 'student',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    email: 'jane@ui.edu.ng',
    university: 'University of Ibadan',
    role: 'student',
    createdAt: new Date('2024-01-10'),
  },
];

export const mockUniversities: University[] = [
  {
    id: '1',
    name: 'University of Lagos',
    faculties: [
      {
        id: '1',
        name: 'Faculty of Science',
        universityId: '1',
        departments: [
          {
            id: '1',
            name: 'Computer Science',
            facultyId: '1',
            years: [
              {
                id: '1',
                year: 2023,
                departmentId: '1',
                courses: [
                  {
                    id: '1',
                    courseCode: 'CSC 301',
                    title: 'Data Structures and Algorithms',
                    yearId: '1',
                    pastQuestions: [
                      {
                        id: '1',
                        courseId: '1',
                        uploadedBy: '1',
                        title: 'CSC 301 Past Question 2023',
                        fileUrl: '/mock-file.pdf',
                        type: 'PDF',
                        votes: 45,
                        createdAt: new Date('2024-01-20'),
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export const getAllPastQuestions = (): (PastQuestion & { uploader: User })[] => {
  const questions: PastQuestion[] = [];
  
  mockUniversities.forEach(university => {
    university.faculties.forEach(faculty => {
      faculty.departments.forEach(department => {
        department.years.forEach(year => {
          year.courses.forEach(course => {
            questions.push(...course.pastQuestions);
          });
        });
      });
    });
  });

  return questions.map(question => {
    const uploader = mockUsers.find(u => u.id === question.uploadedBy)!;
    return { ...question, uploader };
  });
};