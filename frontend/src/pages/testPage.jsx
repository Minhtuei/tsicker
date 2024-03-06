// import { useState, useEffect, useRef } from "react";
// export function TimeTable() {
//     const hour = Array.from({ length: 24 }, (_, i) => {
//         const date = new Date();
//         date.setHours(i - 10, 0, 0, 0);
//         return date.toISOString().split("T")[1].substring(0, 5);
//     });
//     const [hours, setHours] = useState(hour);
//     const headers = ["AFK", "ACTIVITY"];
//     const [scale, setScale] = useState(1);
//     const [dragStartCell, setDragStartCell] = useState(null);
//     const [dragEndCell, setDragEndCell] = useState(null);
//     const [startTime, setStartTime] = useState(null);
//     const [endTime, setEndTime] = useState(null);
//     const handleMouseDown = (e) => {
//         setDragStartCell(e.target);
//         setStartTime(() => {
//             const time = e.target.textContent.split(":");
//             const date = new Date().setHours(
//                 Number(time[0] - 1 + 7),
//                 time[1],
//                 0,
//                 0
//             );
//             return new Date(date).toISOString().split("T")[1].substring(0, 5);
//         });
//     };

//     const handleMouseUp = (e) => {
//         setDragEndCell(e.target);
//         setEndTime(e.target.textContent);
//     };
//     useEffect(() => {
//         console.log(startTime, endTime);
//     }, [startTime, endTime]);

//     return (
//         <table className="relative table-auto w-[600px] text-center border-collapse mx-auto mt-4 select-none ">
//             <thead className="">
//                 <tr>
//                     {headers.map((header, index) => (
//                         <th
//                             className={`w-${Math.floor(
//                                 100 / headers.length
//                             )}% border border-b-0 border-t-0 border-gray-300 relative`}
//                             key={index}
//                         >
//                             {header}
//                             {index === 0 && (
//                                 <>
//                                     {" "}
//                                     <span className="absolute bottom-0 left-0 -translate-x-3/4 translate-y-[1px] w-[20px] h-[1px] bg-gray-300"></span>
//                                     <span className="flex items-end justify-center w-[50px] absolute bottom-0 left-0 translate-y-1/2 -translate-x-[100px]">
//                                         GMT+7
//                                     </span>
//                                 </>
//                             )}
//                         </th>
//                     ))}
//                 </tr>
//             </thead>
//             <tbody>
//                 {hours.map((hour, index) => (
//                     <tr key={index} className="relative h-full">
//                         {headers.map((_, i) => (
//                             <td
//                                 key={i}
//                                 className={`border border-gray-300 w-1/4 h-[50px] ${
//                                     i === 0 ? "relative" : ""
//                                 }`}
//                                 onMouseDown={handleMouseDown}
//                                 onMouseUp={handleMouseUp}
//                             >
//                                 {i === 0 && (
//                                     <>
//                                         {" "}
//                                         <span className="absolute bottom-0 left-0 -translate-x-3/4 translate-y-[1px] w-[20px] h-[1px] bg-gray-300"></span>
//                                         <span className="flex items-end justify-center w-[50px] absolute bottom-0 left-0 translate-y-1/2 -translate-x-[100px]">
//                                             {hour}
//                                         </span>
//                                     </>
//                                 )}
//                             </td>
//                         ))}
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// }
// export function TimeTable() {
//     const hour = Array.from({ length: 24 }, (_, i) => {
//         const date = new Date();
//         date.setHours(i - 10, 0, 0, 0);
//         return date.toISOString().split("T")[1].substring(0, 5);
//     });
//     const [hours, setHours] = useState(hour);
//     const items = [
//         {
//             title: "Youtube",
//             start: "13:00:00.000",
//             end: "14:00:00.000",
//             color: "red",
//         },
//         {
//             title: "Facebook",
//             start: "07:00:00.000",
//             end: "12:00:00.000",
//             color: "blue",
//         },
//     ];
//     const headers = [
//         {
//             name: "AFK",
//             width: "50px",
//             items: items,
//         },
//         {
//             name: "ACTIVITY",
//             width: "100%",
//             items: items,
//         },
//     ];
//     const [scale, setScale] = useState(1);
//     const [dragStartCell, setDragStartCell] = useState(null);
//     const [dragEndCell, setDragEndCell] = useState(null);
//     const [startTime, setStartTime] = useState(null);
//     const [endTime, setEndTime] = useState(null);
//     const startRef = useRef(null);
//     const endRef = useRef(null);
//     const convertTimeToNumber = (time) => {
//         const timeComponents = time
//             .split(":")
//             .map((component) => parseInt(component, 10) || 0);
//         return (
//             timeComponents[0] +
//             timeComponents[1] / 60 +
//             (timeComponents[2] || 0) / 3600 +
//             (timeComponents[3] || 0) / 3600000
//         );
//     };
//     const convertNumberToTime = (currentHour) => {
//         const formattedHour = Math.floor(currentHour)
//             .toString()
//             .padStart(2, "0");
//         const formattedMinute = Math.floor((currentHour % 1) * 60)
//             .toString()
//             .padStart(2, "0");
//         const formattedSecond = Math.floor(((currentHour * 60) % 1) * 60)
//             .toString()
//             .padStart(2, "0");
//         const formattedMillisecond = Math.floor(
//             ((currentHour * 60 * 60) % 1) * 1000
//         )
//             .toString()
//             .padStart(3, "0");
//         let formattedTime = formattedHour + ":" + formattedMinute;
//         formattedTime = formattedSecond
//             ? formattedTime + ":" + formattedSecond
//             : formattedTime;
//         formattedTime = formattedMillisecond
//             ? formattedTime + "." + formattedMillisecond
//             : formattedTime;
//         return formattedTime;
//     };
//     const handleSubmitRange = () => {
//         const startInput = startRef.current.value.trim();
//         const endInput = endRef.current.value.trim();
//         // Extract hours, minutes, and seconds from the input values
//         const parsedStartTime = convertTimeToNumber(startInput);
//         const parsedEndTime = convertTimeToNumber(endInput);
//         if (
//             isNaN(parsedStartTime) ||
//             isNaN(parsedEndTime) ||
//             parsedStartTime >= parsedEndTime
//         ) {
//             // Handle invalid input or show an error message
//             console.error(
//                 "Invalid input. Please make sure the start time is before the end time."
//             );
//             return;
//         }
//         const stepSize = (parsedEndTime - parsedStartTime) / 12;
//         const newHour = Array.from({ length: 13 }, (_, i) => {
//             const currentHour = parsedStartTime + i * stepSize;
//             return convertNumberToTime(currentHour);
//         });
//         setHours(newHour);
//     };
//     const findItem = (item, times) => {
//         const start = convertTimeToNumber(item.start);
//         const end = convertTimeToNumber(item.end);
//         const startIdx = times.findIndex(
//             (time) => convertTimeToNumber(time) >= start
//         );
//         const endIdx = times.findIndex(
//             (time) => convertTimeToNumber(time) >= end
//         );
//         console.log(startIdx, endIdx);
//         return [startIdx, endIdx];
//     };
//     return (
//         <div className="h-screen overflow-y-auto p-16 flex gap-x-4 ">
//             <div className="w-[600px] flex">
//                 <div className="w-[50px] shrink-0">
//                     <div className="h-[40px] text-right text-sm relative">
//                         <span className="absolute bottom-0 translate-y-1/2 -translate-x-[80px] select-none">
//                             GMT+7
//                         </span>
//                     </div>
//                     {hours.map((hour, index) => (
//                         <div
//                             key={index}
//                             className="h-[50px] text-right text-sm relative border-r border-gray-300"
//                         >
//                             <span className="absolute bottom-0 translate-y-1/2 -translate-x-[80px] select-none">
//                                 {hour}
//                             </span>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="flex-1">
//                     <div className="grid grid-cols-2 justify-items-center">
//                         {headers.map((header, i) => (
//                             <div
//                                 key={i}
//                                 className="grid grid-cols-1 w-full text-center"
//                             >
//                                 <div className="p-2 border-b border-gray-300 relative select-none">
//                                     {header.name}
//                                     {i === 0 && (
//                                         <span className="absolute bottom-0 left-0 -translate-x-3/4 translate-y-[1px] w-[20px] h-[1px] bg-gray-300"></span>
//                                     )}
//                                     {i === headers.length - 1 && (
//                                         <span className="absolute bottom-0 right-0 w-[1px] h-[20px] bg-gray-300"></span>
//                                     )}
//                                     <span className="absolute bottom-0 left-0 -translate-x-[1px] w-[1px] h-[20px] bg-gray-300"></span>
//                                 </div>
//                                 {hours.map((item, index) => (
//                                     <div
//                                         key={index}
//                                         className="h-[50px] border border-gray-300 relative border-t-0 border-l-0"
//                                     >
//                                         {i === 0 && (
//                                             <span className="absolute bottom-0 left-0 -translate-x-3/4 translate-y-[1px] w-[20px] h-[1px] bg-gray-300"></span>
//                                         )}

//                                         {findItem(header.items[1], hours)[0] <=
//                                             index - 1 &&
//                                             index <=
//                                                 findItem(
//                                                     header.items[1],
//                                                     hours
//                                                 )[1] && (
//                                                 <div className="absolute top-0 left-0 w-full h-full bg-red-100 bg-opacity-50"></div>
//                                             )}

//                                         {findItem(header.items[0], hours)[0] <=
//                                             index - 1 &&
//                                             index <=
//                                                 findItem(
//                                                     header.items[0],
//                                                     hours
//                                                 )[1] && (
//                                                 <div className="absolute top-0 left-0 w-full h-full bg-red-100 bg-opacity-50"></div>
//                                             )}
//                                     </div>
//                                 ))}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <input
//                 type="text"
//                 ref={startRef}
//                 className="w-[200px] h-[40px] border border-gray-300"
//             />
//             <input
//                 type="text"
//                 ref={endRef}
//                 className="w-[200px] h-[40px] border border-gray-300"
//             />
//             <button
//                 className="w-[200px] h-[40px] border border-gray-300 bg-red-100"
//                 onClick={handleSubmitRange}
//             >
//                 Submit
//             </button>
//             <button
//                 className="w-[200px] h-[40px] border border-gray-300 bg-red-100"
//                 onClick={() => setHours(hour)}
//             >
//                 Reset
//             </button>
//         </div>
//     );
// }
// export function CreatePostPage() {
//     return
// }
