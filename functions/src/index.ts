// const files = {
// 	robot: './robot'
//     // event2: './event2',
// };

// const loadFunctions = (filesObj: any) => {
//     for (const key in filesObj) {
//         if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME.startsWith(key)) {
//             module.exports[key] = require(filesObj[key]);
//         }
//     }
// };

// loadFunctions(files);