// import { Journal } from '../models/journal';
// import { meanBy, find } from 'lodash';
// import { IStudentMark } from '../entities/journal';

// // kind of data = { a: 9, b: 20, c: 30, d: 8, e: 12, f: 3, g: 7, h: 14 }
// export function parseJournal(journal: Journal): any {
//   return journal.studentMarks.reduce((graphData, student) => {

//     student.marks.forEach(mark => {
//       if (!mark) { return; }

//       (mark in graphData) ? graphData[mark] += 1 : graphData[mark] = 1;
//     });

//     return graphData;
//   }, {});
// }

// // kind of data = [
// //   [
// //     {axis:'Battery Life',value:0.22},
// //     {axis:'Brand',value:0.28},
// //     {axis:'Contract Cost',value:0.29},
// //     {axis:'Design And Quality',value:0.17},
// //     {axis:'Have Internet Connectivity',value:0.22},
// //     {axis:'Large Screen',value:0.02},
// //     {axis:'Price Of Device',value:0.21},
// //     {axis:'To Be A Smartphone',value:0.50}
// //   ]
// // ];
// export function parseJournals(journals: Journal[], studentId: string): any {
//   return journals.reduce((graphData, journal) => {
//     const student: IStudentMark = find(journal.studentMarks, { studentId });
//     const average: number = meanBy(student.marks);

//     graphData.push({ group: journal.subjectName, value: average });

//     return graphData;
//   }, []);
// }
