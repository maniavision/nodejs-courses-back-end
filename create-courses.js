function createCourses(Course, saveCourse) {
    let courses = [
        new Course({name: 'Math', price: 950.15, startDate: new Date('2025-01-20'), length: '3-Months', instructor: ['Mike Tao', 'John Charp'], isDiscontinued: false}),
        new Course({name: 'Physics', price: 925.50, startDate: new Date('2025-01-20'), length: '3-Months', instructor: ['Mike Tao', 'Peter Posho'], isDiscontinued: false}),
        new Course({name: 'Biology', price: 900.00, startDate: new Date('2025-01-20'), length: '3-Months', instructor: ['Lili Laporte'], isDiscontinued: false}),
        new Course({name: 'Chemistry', price: 900.00, startDate: new Date('2025-01-20'), length: '3-Months', instructor: ['Tom Ford'], isDiscontinued: false}),
        new Course({name: 'Computer Science', price: 999.00, startDate: new Date('2025-01-20'), length: '6-Months', instructor: ['Maxime Villa', 'Eric Koto'], isDiscontinued: false})
    ];

    for(course of courses) {
        saveCourse(course);
    }
}

module.exports = createCourses;