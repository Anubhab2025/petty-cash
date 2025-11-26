

// import { useState, useEffect } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Pie, Line } from "react-chartjs-2";
// import {
//   FaFilePdf,
//   FaFileExcel,
//   FaChartPie,
//   FaChartLine,
//   FaCheck,
//   FaTimes,
// } from "react-icons/fa";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface ExpenseData {
//   date: string;
//   category: string;
//   amount: number;
//   type: "petty" | "tally";
//   description: string;
// }

// interface Category {
//   id: string;
//   name: string;
//   type: "petty" | "tally";
// }

// export default function Reports() {
//   const [dateFrom, setDateFrom] = useState("2025-11-01");
//   const [dateTo, setDateTo] = useState("2025-11-04");
//   const [selectedCategories, setSelectedCategories] = useState<string[]>(["all"]);
//   const [cashType, setCashType] = useState<"petty" | "tally">("petty");
//   const [viewType, setViewType] = useState<"daily" | "weekly" | "monthly">("daily");
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
//   const [expenseData, setExpenseData] = useState<ExpenseData[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
  

//   // ==== Added: Track localStorage total petty cash ====
//   const [localStoragePettyCashTotal, setLocalStoragePettyCashTotal] = useState<number | null>(null);
// const [loginUser, setLoginUser] = useState<{ name: string; role: string } | null>(null);




// const SHEET_URL = "https://script.google.com/macros/s/AKfycbx5dryxS1R5zp6myFfUlP1QPimufTqh5hcPcFMNcAJ-FiC-hyQL9mCkgHSbLkOiWTibeg/exec";
//   const SHEET_ID = "1-NTfh3VGrhEImrxNVSbDdBmFxTESegykHslL-t3Nf8I";


//  useEffect(() => {
//   // On mount, fetch the total petty cash amount from localStorage just like TransactionHistory page
//   try {
//     const data = JSON.parse(localStorage.getItem("pettyCashTransactions") || "[]");
//     const calculateTotal = (txn: any) =>
//       [
//         parseFloat(txn.openingQty) || 0,
//         parseFloat(txn.teaNasta) || 0,
//         parseFloat(txn.waterJar) || 0,
//         parseFloat(txn.lightBill) || 0,
//         parseFloat(txn.recharge) || 0,
//         parseFloat(txn.postOffice) || 0,
//         parseFloat(txn.customerDiscount) || 0,
//         parseFloat(txn.repairMaintenance) || 0,
//         parseFloat(txn.stationary) || 0,
//         parseFloat(txn.incentive) || 0,
//         parseFloat(txn.breakage) || 0,
//         parseFloat(txn.petrol) || 0,
//         parseFloat(txn.advance) || 0,
//         parseFloat(txn.excisePolice) || 0,
//         parseFloat(txn.desiBhada) || 0,
//         parseFloat(txn.otherVendorPayment) || 0,
//         parseFloat(txn.differenceAmount) || 0,
//         parseFloat(txn.patilPetrol) || 0,
//         parseFloat(txn.roomExpense) || 0,
//         parseFloat(txn.officeExpense) || 0,
//         parseFloat(txn.personalExpense) || 0,
//         parseFloat(txn.miscExpense) || 0,
//         parseFloat(txn.closing) || 0,
//         parseFloat(txn.creditCardCharges) || 0,
//       ].reduce((acc, val) => acc + val, 0);
//     const sum = data.reduce((sum: number, txn: any) => sum + calculateTotal(txn), 0);
//     setLocalStoragePettyCashTotal(sum);
//   } catch {
//     setLocalStoragePettyCashTotal(null);
//   }
// }, []);
// // ==== Added end ====
// useEffect(() => {
//   try {
//     const userData = JSON.parse(localStorage.getItem("loginUser") || "{}");
//     if (userData.name && userData.role) {
//       setLoginUser(userData);
//     }
//   } catch {
//     console.log("No login user found");
//   }
// }, []);

// // Column mapping for petty cash expenses - Add after SHEET_ID
// const columnMapping: { [key: string]: string } = {
//   "Tea + Nasta": "F",
//   "Petrol": "N",
//   "Stationary": "M",
//   "Light Bill": "H",
//   "Office Supplies": "X",
// };

// const fetchExpenseData = async () => {
//   setLoading(true);
//   try {
//     if (cashType === "petty") {
//       // Fetch Petty Cash from Google Sheet
//       const response = await fetch(
//         `${SHEET_URL}?action=getPettyExpenses&sheetId=${SHEET_ID}&dateFrom=${dateFrom}&dateTo=${dateTo}`
//       );
//       const data = await response.json();
//       console.log("Petty response:", data);
      
//       if (data.success && data.expenses && data.expenses.length > 0) {
//         let filteredExpenses = data.expenses;
        
//         // Filter by login user if not admin
//         if (loginUser && loginUser.role !== "admin") {
//           filteredExpenses = data.expenses.filter(
//             (row: any) => row.AB === loginUser.name || row.userName === loginUser.name
//           );
//         }

//         // Transform data
//         const expenses: ExpenseData[] = [];
//         filteredExpenses.forEach((row: any) => {
//           const date = row.date || new Date().toISOString().split('T')[0];
          
//           Object.entries(columnMapping).forEach(([categoryName, columnLetter]) => {
//             const amount = parseFloat(row[columnLetter]) || 0;
//             if (amount > 0) {
//               expenses.push({
//                 date,
//                 category: categoryName,
//                 amount,
//                 type: "petty",
//                 description: `${categoryName} expense`,
//               });
//             }
//           });
//         });
        
//         console.log("Transformed petty expenses:", expenses);
//         setExpenseData(expenses);
//       } else {
//         console.log("No petty data, using empty array");
//         setExpenseData([]);
//       }
//     } else {
//       // Fetch Tally Cash - Use different endpoint
//       const response = await fetch(
//         `${SHEET_URL}?action=getExpenses&sheetId=${SHEET_ID}&dateFrom=${dateFrom}&dateTo=${dateTo}`
//       );
//       const data = await response.json();
//       console.log("Tally response:", data);
      
//       if (data.success && data.expenses) {
//         setExpenseData(data.expenses);
//       } else {
//         setExpenseData([]);
//       }
//     }
//   } catch (err) {
//     console.error("Error fetching data:", err);
//     setExpenseData([]);
//   } finally {
//     setLoading(false);
//   }
// };

// // Update the useEffect that calls fetchExpenseData:
// useEffect(() => {
//   if (categories.length > 0) {
//     fetchExpenseData();
//   }
// }, [categories, dateFrom, dateTo, cashType, loginUser]);






  
//   // Fetch categories from Master sheet
//   const fetchCategories = async () => {
//     try {
//       const response = await fetch(`${SHEET_URL}?action=getCategories&sheetId=${SHEET_ID}`);
//       const data = await response.json();
//       if (data.success && data.categories) {
//         setCategories(data.categories);
//       } else {
//         setCategories([
//           { id: "1", name: "Tea + Nasta", type: "petty" },
//           { id: "2", name: "Petrol", type: "petty" },
//           { id: "3", name: "Stationary", type: "petty" },
//           { id: "4", name: "Light Bill", type: "petty" },
//           { id: "5", name: "Office Supplies", type: "petty" },
//           { id: "6", name: "Salary", type: "tally" },
//           { id: "7", name: "Rent", type: "tally" },
//           { id: "8", name: "Equipment", type: "tally" },
//           { id: "9", name: "Marketing", type: "tally" },
//           { id: "10", name: "Miscellaneous", type: "tally" },
//         ]);
//       }
//     } catch (err) {
//       setCategories([
//         { id: "1", name: "Tea + Nasta", type: "petty" },
//         { id: "2", name: "Petrol", type: "petty" },
//         { id: "3", name: "Stationary", type: "petty" },
//         { id: "4", name: "Light Bill", type: "petty" },
//         { id: "5", name: "Office Supplies", type: "petty" },
//         { id: "6", name: "Salary", type: "tally" },
//         { id: "7", name: "Rent", type: "tally" },
//         { id: "8", name: "Equipment", type: "tally" },
//         { id: "9", name: "Marketing", type: "tally" },
//         { id: "10", name: "Miscellaneous", type: "tally" },
//       ]);
//     }
//   };



//   // Generate dummy data for fallback
//   const generateDummyData = (): ExpenseData[] => {
//     const pettyCategories = categories.filter(cat => cat.type === "petty");
//     const tallyCategories = categories.filter(cat => cat.type === "tally");
//     const data: ExpenseData[] = [];
//     const startDate = new Date(dateFrom);
//     const endDate = new Date(dateTo);

//     for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
//       const dateStr = d.toISOString().split('T')[0];
//       pettyCategories.forEach(category => {
//         data.push({
//           date: dateStr,
//           category: category.name,
//           amount: Math.floor(Math.random() * 2000) + 500,
//           type: "petty",
//           description: `${category.name} expense`
//         });
//       });
//       tallyCategories.forEach(category => {
//         data.push({
//           date: dateStr,
//           category: category.name,
//           amount: Math.floor(Math.random() * 10000) + 5000,
//           type: "tally",
//           description: `${category.name} expense`
//         });
//       });
//     }
//     return data;
//   };

//   // Category checkbox handler
//   const handleCategoryCheckboxChange = (categoryName: string) => {
//     if (categoryName === "all") {
//       if (selectedCategories.includes("all")) {
//         setSelectedCategories([]);
//       } else {
//         const allCategories = categories
//           .filter(cat => cat.type === cashType)
//           .map(cat => cat.name);
//         setSelectedCategories(["all", ...allCategories]);
//       }
//     } else {
//       if (selectedCategories.includes(categoryName)) {
//         const newSelected = selectedCategories.filter(cat => cat !== categoryName && cat !== "all");
//         setSelectedCategories(newSelected.length > 0 ? newSelected : ["all"]);
//       } else {
//         const newSelected = [...selectedCategories.filter(cat => cat !== "all"), categoryName];
//         setSelectedCategories(newSelected);
//       }
//     }
//   };

//   const handleSelectAll = () => {
//     const allCategories = categories
//       .filter(cat => cat.type === cashType)
//       .map(cat => cat.name);
//     setSelectedCategories(["all", ...allCategories]);
//   };

//   const handleClearAll = () => {
//     setSelectedCategories(["all"]);
//   };

//   const isAllSelected = () => {
//     const currentTypeCategories = categories
//       .filter(cat => cat.type === cashType)
//       .map(cat => cat.name);
//     return currentTypeCategories.every(cat => selectedCategories.includes(cat));
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (categories.length > 0) {
//       fetchExpenseData();
//     }
//   }, [categories, dateFrom, dateTo]);

//   useEffect(() => {
//     setSelectedCategories(["all"]);
//   }, [cashType]);

//   const filteredData = expenseData.filter(expense => {
//     const matchesType = expense.type === cashType;
//     const matchesDate = expense.date >= dateFrom && expense.date <= dateTo;
//     const matchesCategory = selectedCategories.includes("all") ||
//       selectedCategories.includes(expense.category);
//     return matchesType && matchesCategory && matchesDate;
//   });

//   const getWeekNumber = (dateString: string): string => {
//     const date = new Date(dateString);
//     const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
//     const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
//     return `Week ${Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)}`;
//   };

//   const getMonthFromDate = (dateString: string): string => {
//     const date = new Date(dateString);
//     return date.toLocaleString('default', { month: 'long', year: 'numeric' });
//   };

//  // Replace getPieChartData function with this:
// const getPieChartData = () => {
  
//   const categoryTotals: { [key: string]: number } = {};
  
//   filteredData.forEach(expense => {
//     if (categoryTotals[expense.category]) {
//       categoryTotals[expense.category] += expense.amount;
//     } else {
//       categoryTotals[expense.category] = expense.amount;
//     }
//   });
  
//   console.log("categoryTotals:", categoryTotals); // Debug
  
//   const labels = Object.keys(categoryTotals);
//   const values = Object.values(categoryTotals);
  
//   return {
//     labels,
//     datasets: [
//       {
//         label: "Expenses by Category",
//         data: values,
//         backgroundColor: [
//           "rgba(42, 82, 152, 0.8)",
//           "rgba(239, 68, 68, 0.8)",
//           "rgba(59, 130, 246, 0.8)",
//           "rgba(251, 191, 36, 0.8)",
//           "rgba(16, 185, 129, 0.8)",
//           "rgba(147, 51, 234, 0.8)",
//           "rgba(236, 72, 153, 0.8)",
//         ],
//         borderColor: [
//           "rgba(42, 82, 152, 1)",
//           "rgba(239, 68, 68, 1)",
//           "rgba(59, 130, 246, 1)",
//           "rgba(251, 191, 36, 1)",
//           "rgba(16, 185, 129, 1)",
//           "rgba(147, 51, 234, 1)",
//           "rgba(236, 72, 153, 1)",
//         ],
//         borderWidth: 2,
//       },
//     ],
//   };
// };

//   const getLineChartData = () => {
//     let groupedData: { [key: string]: number } = {};
//     if (viewType === "daily") {
//       filteredData.forEach(expense => {
//         if (groupedData[expense.date]) {
//           groupedData[expense.date] += expense.amount;
//         } else {
//           groupedData[expense.date] = expense.amount;
//         }
//       });
//     } else if (viewType === "weekly") {
//       filteredData.forEach(expense => {
//         const week = getWeekNumber(expense.date);
//         if (groupedData[week]) {
//           groupedData[week] += expense.amount;
//         } else {
//           groupedData[week] = expense.amount;
//         }
//       });
//     } else if (viewType === "monthly") {
//       filteredData.forEach(expense => {
//         const month = getMonthFromDate(expense.date);
//         if (groupedData[month]) {
//           groupedData[month] += expense.amount;
//         } else {
//           groupedData[month] = expense.amount;
//         }
//       });
//     }
//     const labels = Object.keys(groupedData).sort();
//     const values = labels.map(key => groupedData[key]);
//     return {
//       labels,
//       datasets: [
//         {
//           label: `Expenses (${viewType})`,
//           data: values,
//           borderColor: "rgba(42, 82, 152, 1)",
//           backgroundColor: "rgba(42, 82, 152, 0.1)",
//           tension: 0.4,
//           fill: true,
//           pointRadius: 6,
//           pointHoverRadius: 8,
//           pointBackgroundColor: "rgba(42, 82, 152, 1)",
//           pointBorderColor: "#fff",
//           pointBorderWidth: 2,
//         },
//       ],
//     };
//   };

//   // Always return sum for summary, but
//   // in rendering, show localStoragePettyCashTotal when cashType is petty
//   const getSummaryData = () => {
//     let total = 0;
//     let highest = 0;
//     if (viewType === "daily") {
//       const dailyTotals: { [key: string]: number } = {};
//       filteredData.forEach(expense => {
//         dailyTotals[expense.date] = (dailyTotals[expense.date] || 0) + expense.amount;
//       });
//       total = Object.values(dailyTotals).reduce((sum, amount) => sum + amount, 0);
//       highest = Math.max(...Object.values(dailyTotals), 0);
//     } else if (viewType === "weekly") {
//       const weeklyTotals: { [key: string]: number } = {};
//       filteredData.forEach(expense => {
//         const week = getWeekNumber(expense.date);
//         weeklyTotals[week] = (weeklyTotals[week] || 0) + expense.amount;
//       });
//       total = Object.values(weeklyTotals).reduce((sum, amount) => sum + amount, 0);
//       highest = Math.max(...Object.values(weeklyTotals), 0);
//     } else if (viewType === "monthly") {
//       const monthlyTotals: { [key: string]: number } = {};
//       filteredData.forEach(expense => {
//         const month = getMonthFromDate(expense.date);
//         monthlyTotals[month] = (monthlyTotals[month] || 0) + expense.amount;
//       });
//       total = Object.values(monthlyTotals).reduce((sum, amount) => sum + amount, 0);
//       highest = Math.max(...Object.values(monthlyTotals), 0);
//     }
//     const periods = Object.keys(getLineChartData().labels).length;
//     const avgPeriod = periods > 0 ? total / periods : 0;
//     const categoryCount = new Set(filteredData.map(expense => expense.category)).size;
//     return {
//       total,
//       avgPeriod,
//       highest,
//       categories: categoryCount,
//       periods,
//     };
//   };

//   const pieOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "bottom" as const,
//         labels: {
//           padding: 20,
//           font: {
//             size: 12,
//             family: "'Segoe UI', sans-serif",
//           },
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context: any) {
//             const label = context.label || "";
//             const value = context.parsed || 0;
//             return `${label}: ₹${value.toLocaleString("en-IN")}`;
//           },
//         },
//       },
//     },
//   };

//   const lineOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context: any) {
//             return `Expenses: ₹${context.parsed.y.toLocaleString("en-IN")}`;
//           },
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: function (value: any) {
//             return "₹" + value.toLocaleString("en-IN");
//           },
//         },
//       },
//     },
//   };

//   const handleExportPDF = () => {
//     alert(`Exporting ${cashType} cash report as PDF...`);
//   };

//   const handleExportExcel = () => {
//     alert(`Exporting ${cashType} cash report as Excel...`);
//   };

//   const pieChartData = getPieChartData();
//   const lineChartData = getLineChartData();
//   const summaryData = getSummaryData();
//   const currentTypeCategories = categories.filter(cat => cat.type === cashType);

// // ==== Added: Track total tally cash from fetched data ====
// const totalTallyCash = expenseData
//   .filter(expense => expense.type === "tally")
//   .reduce((sum, expense) => sum + expense.amount, 0);
// // ==== Added end ====


// const totalToShow =
//   cashType === "petty"
//     ? (localStoragePettyCashTotal !== null && localStoragePettyCashTotal > 0 ? localStoragePettyCashTotal : summaryData.total)
//     : cashType === "tally"
//     ? totalTallyCash
//     : summaryData.total;

// // ==== Modified end ====
// console.log("expenseData length:", expenseData.length);
// console.log("localStoragePettyCashTotal:", localStoragePettyCashTotal);
// console.log("totalTallyCash:", totalTallyCash);
// console.log("totalToShow:", totalToShow);
// console.log("cashType:", cashType);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-lg font-semibold text-gray-600">Loading data...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">Filter Options</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Cash Type
//             </label>
//             <select
//               value={cashType}
//               onChange={(e) => setCashType(e.target.value as "petty" | "tally")}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent font-semibold"
//             >
//               <option value="petty">Petty Cash</option>
//               <option value="tally">Tally Cash</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               From Date
//             </label>
//             <input
//               type="date"
//               value={dateFrom}
//               onChange={(e) => setDateFrom(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               To Date
//             </label>
//             <input
//               type="date"
//               value={dateTo}
//               onChange={(e) => setDateTo(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent"
//             />
//           </div>
//           <div className="relative">
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Category {selectedCategories.length > 1 && `(${selectedCategories.filter(cat => cat !== "all").length} selected)`}
//             </label>
//             <div className="relative">
//               <button
//                 type="button"
//                 onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent text-left bg-white flex justify-between items-center"
//               >
//                 <span>
//                   {selectedCategories.includes("all") || selectedCategories.length === 0
//                     ? "All Categories"
//                     : `${selectedCategories.length} categories selected`}
//                 </span>
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
//               {showCategoryDropdown && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
//                   <div className="p-3 border-b border-gray-200">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-sm font-semibold">Select Categories</span>
//                       <div className="flex gap-1">
//                         <button
//                           onClick={handleSelectAll}
//                           className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
//                         >
//                           <FaCheck className="inline w-3 h-3 mr-1" />
//                           All
//                         </button>
//                         <button
//                           onClick={handleClearAll}
//                           className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
//                         >
//                           <FaTimes className="inline w-3 h-3 mr-1" />
//                           Clear
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-2 space-y-1">
//                     <label className="flex items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={selectedCategories.includes("all") || isAllSelected()}
//                         onChange={() => handleCategoryCheckboxChange("all")}
//                         className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
//                       />
//                       <span className="ml-2 text-sm font-medium">All Categories</span>
//                     </label>
//                     {currentTypeCategories.map(category => (
//                       <label key={category.id} className="flex items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={selectedCategories.includes(category.name) || selectedCategories.includes("all")}
//                           onChange={() => handleCategoryCheckboxChange(category.name)}
//                           className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
//                         />
//                         <span className="ml-2 text-sm">{category.name}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               View Type
//             </label>
//             <select
//               value={viewType}
//               onChange={(e) => setViewType(e.target.value as "daily" | "weekly" | "monthly")}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent"
//             >
//               <option value="daily">Daily</option>
//               <option value="weekly">Weekly</option>
//               <option value="monthly">Monthly</option>
//             </select>
//           </div>
//         </div>
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="bg-blue-100 p-2 rounded-lg">
//               <FaChartPie className="text-[#2a5298] text-xl" />
//             </div>
//             <div>
//               <h3 className="text-lg font-bold text-gray-800">
//                 Expense by Category
//               </h3>
//               <p className="text-sm text-gray-600">
//                 {cashType === "petty" ? "Petty Cash" : "Tally Cash"} Distribution
//               </p>
//             </div>
//           </div>
//           <div className="h-[300px] md:h-[350px]">
//             {pieChartData.labels.length > 0 ? (
//               <Pie data={pieChartData} options={pieOptions} />
//             ) : (
//               <div className="flex justify-center items-center h-full text-gray-500">
//                 No data available for selected filters
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="bg-green-100 p-2 rounded-lg">
//               <FaChartLine className="text-green-600 text-xl" />
//             </div>
//             <div>
//               <h3 className="text-lg font-bold text-gray-800">
//                 Expense Trend ({viewType})
//               </h3>
//               <p className="text-sm text-gray-600">
//                 {cashType === "petty" ? "Petty Cash" : "Tally Cash"} over time
//               </p>
//             </div>
//           </div>
//           <div className="h-[300px] md:h-[350px]">
//             {lineChartData.labels.length > 0 ? (
//               <Line data={lineChartData} options={lineOptions} />
//             ) : (
//               <div className="flex justify-center items-center h-full text-gray-500">
//                 No data available for selected filters
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <div>
//             <h3 className="text-lg font-bold text-gray-800">Export Reports</h3>
//             <p className="text-sm text-gray-600 mt-1">
//               Download your {cashType === "petty" ? "Petty Cash" : "Tally Cash"} reports
//             </p>
//           </div>
//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={handleExportPDF}
//               className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
//             >
//               <FaFilePdf />
//               Export PDF
//             </button>
//             <button
//               onClick={handleExportExcel}
//               className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
//             >
//               <FaFileExcel />
//               Export Excel
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {/* ---- Only changed logic below in Total Expenses card ---- */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-bold text-gray-800 mb-4">
//           Summary Statistics - {cashType === "petty" ? "Petty Cash" : "Tally Cash"} ({viewType})
//         </h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
//   <p className="text-sm text-gray-600 mb-1">Total Expenses</p>

// <p className="text-2xl font-bold text-blue-700">
//   ₹{totalToShow.toLocaleString("en-IN")}
// </p>


// </div>
//           <div className="p-4 bg-green-50 rounded-lg border border-green-200">
//             <p className="text-sm text-gray-600 mb-1">
//               Avg. {viewType === 'daily' ? 'Daily' : viewType === 'weekly' ? 'Weekly' : 'Monthly'}
//             </p>
//             <p className="text-2xl font-bold text-green-700">
//               ₹{summaryData.avgPeriod.toLocaleString("en-IN")}
//             </p>
//           </div>
//           <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
//             <p className="text-sm text-gray-600 mb-1">
//               Highest {viewType === 'daily' ? 'Day' : viewType === 'weekly' ? 'Week' : 'Month'}
//             </p>
//             <p className="text-2xl font-bold text-yellow-700">
//               ₹{summaryData.highest.toLocaleString("en-IN")}
//             </p>
//           </div>
//           <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
//             <p className="text-sm text-gray-600 mb-1">Categories</p>
//             <p className="text-2xl font-bold text-purple-700">
//               {summaryData.categories}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import {
  FaFilePdf,
  FaFileExcel,
  FaChartPie,
  FaChartLine,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ExpenseData {
  date: string;
  category: string;
  amount: number;
  type: "petty" | "tally";
  description: string;
  sheetName?: string;
}

interface Category {
  id: string;
  name: string;
  type: "petty" | "tally";
}

export default function Reports() {
  const [dateFrom, setDateFrom] = useState("2025-11-01");
  const [dateTo, setDateTo] = useState("2025-11-04");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["all"]);
  const [cashType, setCashType] = useState<"petty" | "tally">("petty");
  const [viewType, setViewType] = useState<"daily" | "weekly" | "monthly">("daily");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [expenseData, setExpenseData] = useState<ExpenseData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // ==== Added: Track localStorage total petty cash ====
  const [localStoragePettyCashTotal, setLocalStoragePettyCashTotal] = useState<number | null>(null);
  const [loginUser, setLoginUser] = useState<{ name: string; role: string } | null>(null);
  
  // ==== Added: Tally sheet filtering ====
  const [selectedTallySheet, setSelectedTallySheet] = useState<string>("All");
  const tallySheets = [
    "All",
    "Cash Tally Counter 1", 
    "Cash Tally Counter 2",
    "Cash Tally Counter 3",
  ];

  const SHEET_URL = "https://script.google.com/macros/s/AKfycbx5dryxS1R5zp6myFfUlP1QPimufTqh5hcPcFMNcAJ-FiC-hyQL9mCkgHSbLkOiWTibeg/exec";
  const SHEET_ID = "1-NTfh3VGrhEImrxNVSbDdBmFxTESegykHslL-t3Nf8I";

  useEffect(() => {
    // On mount, fetch the total petty cash amount from localStorage just like TransactionHistory page
    try {
      const data = JSON.parse(localStorage.getItem("pettyCashTransactions") || "[]");
      const calculateTotal = (txn: any) =>
        [
          parseFloat(txn.openingQty) || 0,
          parseFloat(txn.teaNasta) || 0,
          parseFloat(txn.waterJar) || 0,
          parseFloat(txn.lightBill) || 0,
          parseFloat(txn.recharge) || 0,
          parseFloat(txn.postOffice) || 0,
          parseFloat(txn.customerDiscount) || 0,
          parseFloat(txn.repairMaintenance) || 0,
          parseFloat(txn.stationary) || 0,
          parseFloat(txn.incentive) || 0,
          parseFloat(txn.breakage) || 0,
          parseFloat(txn.petrol) || 0,
          parseFloat(txn.advance) || 0,
          parseFloat(txn.excisePolice) || 0,
          parseFloat(txn.desiBhada) || 0,
          parseFloat(txn.otherVendorPayment) || 0,
          parseFloat(txn.differenceAmount) || 0,
          parseFloat(txn.patilPetrol) || 0,
          parseFloat(txn.roomExpense) || 0,
          parseFloat(txn.officeExpense) || 0,
          parseFloat(txn.personalExpense) || 0,
          parseFloat(txn.miscExpense) || 0,
          parseFloat(txn.closing) || 0,
          parseFloat(txn.creditCardCharges) || 0,
        ].reduce((acc, val) => acc + val, 0);
      const sum = data.reduce((sum: number, txn: any) => sum + calculateTotal(txn), 0);
      setLocalStoragePettyCashTotal(sum);
    } catch {
      setLocalStoragePettyCashTotal(null);
    }
  }, []);

  // Update the useEffect to get user from localStorage like Dashboard
  useEffect(() => {
    const userName = localStorage.getItem('currentUserName');
    const userRole = localStorage.getItem('currentUserRole');

    console.log("=== Reports User Check ===");
    console.log("Username from localStorage:", userName);
    console.log("Role from localStorage:", userRole);

    if (userName && userRole) {
      setLoginUser({ name: userName, role: userRole });
    } else {
      console.error("User not found in localStorage!");
    }
  }, []);

  // Column mapping for petty cash expenses
  const columnMapping: { [key: string]: string } = {
    "Tea + Nasta": "F",
    "Petrol": "N",
    "Stationary": "M",
    "Light Bill": "H",
    "Office Supplies": "X",
  };

  // ==== UPDATED: fetchExpenseData function with proper role-based filtering ====
  const fetchExpenseData = async () => {
    setLoading(true);
    try {
      if (cashType === "petty") {
        // Fetch Petty Cash from Google Sheet
        const response = await fetch(
          `${SHEET_URL}?action=getPettyExpenses&sheetId=${SHEET_ID}&dateFrom=${dateFrom}&dateTo=${dateTo}`
        );
        const data = await response.json();
        console.log("Petty response:", data);
        
        if (data.success && data.expenses && data.expenses.length > 0) {
          let filteredExpenses = data.expenses;
          
          // ONLY filter if NOT admin - same as Dashboard
          if (loginUser && loginUser.role.toLowerCase() !== 'admin') {
            filteredExpenses = data.expenses.filter(
              (row: any) => row.AB && row.AB.toString().trim().toLowerCase() === loginUser.name.toLowerCase()
            );
          }
          // Admin ke liye NO filter - sab rows calculate hongi

          // Transform data
          const expenses: ExpenseData[] = [];
          filteredExpenses.forEach((row: any) => {
            const date = row.date || new Date().toISOString().split('T')[0];
            
            Object.entries(columnMapping).forEach(([categoryName, columnLetter]) => {
              const amount = parseFloat(row[columnLetter]) || 0;
              if (amount > 0) {
                expenses.push({
                  date,
                  category: categoryName,
                  amount,
                  type: "petty",
                  description: `${categoryName} expense`,
                });
              }
            });
          });
          
          console.log("Transformed petty expenses:", expenses);
          setExpenseData(expenses);
        } else {
          console.log("No petty data, using empty array");
          setExpenseData([]);
        }
      } else {
        // ==== UPDATED: Fetch Tally Cash with proper role-based filtering ====
        let sheetsToFetch = [];
        
        if (selectedTallySheet === "All") {
          sheetsToFetch = tallySheets.filter(sheet => sheet !== "All");
        } else {
          sheetsToFetch = [selectedTallySheet];
        }

        const allExpenses: ExpenseData[] = [];

        for (const sheet of sheetsToFetch) {
          const response = await fetch(
            `${SHEET_URL}?action=getTallyExpenses&sheetId=${SHEET_ID}&sheetName=${encodeURIComponent(sheet)}&dateFrom=${dateFrom}&dateTo=${dateTo}`
          );
          const data = await response.json();
          console.log(`Tally response for ${sheet}:`, data);
          
          if (data.success && data.expenses) {
            let filteredExpenses = data.expenses;
            
            // ONLY filter if NOT admin - same as Dashboard
            if (loginUser && loginUser.role.toLowerCase() !== 'admin') {
              filteredExpenses = data.expenses.filter(
                (row: any) => row.D && row.D.toString().trim().toLowerCase() === loginUser.name.toLowerCase()
              );
            }
            // Admin ke liye NO filter

            // Transform tally data
            filteredExpenses.forEach((row: any) => {
              const date = row.date || new Date().toISOString().split('T')[0];
              
              // Process Scan Amount (Column E)
              const scanAmount = parseFloat(row.E) || 0;
              if (scanAmount > 0) {
                allExpenses.push({
                  date,
                  category: "Scan Amount",
                  amount: scanAmount,
                  type: "tally",
                  description: `Scan Amount - ${sheet}`,
                  sheetName: sheet,
                });
              }
              
              // Process Cash Billing (Column O)
              const cashBilling = parseFloat(row.O) || 0;
              if (cashBilling > 0) {
                allExpenses.push({
                  date,
                  category: "Cash Billing", 
                  amount: cashBilling,
                  type: "tally",
                  description: `Cash Billing - ${sheet}`,
                  sheetName: sheet,
                });
              }
              
              // Process General Expense (Column Z)
              const generalExpense = parseFloat(row.Z) || 0;
              if (generalExpense > 0) {
                allExpenses.push({
                  date,
                  category: "General Expense",
                  amount: generalExpense,
                  type: "tally",
                  description: `General Expense - ${sheet}`,
                  sheetName: sheet,
                });
              }
            });
          }
        }
        
        console.log("Transformed tally expenses:", allExpenses);
        setExpenseData(allExpenses);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setExpenseData([]);
    } finally {
      setLoading(false);
    }
  };

  // Update the useEffect to include selectedTallySheet dependency and loginUser
  useEffect(() => {
    if (categories.length > 0 && loginUser) {
      fetchExpenseData();
    }
  }, [categories, dateFrom, dateTo, cashType, loginUser, selectedTallySheet]);

  // Fetch categories from Master sheet
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${SHEET_URL}?action=getCategories&sheetId=${SHEET_ID}`);
      const data = await response.json();
      if (data.success && data.categories) {
        setCategories(data.categories);
      } else {
        setCategories([
          { id: "1", name: "Tea + Nasta", type: "petty" },
          { id: "2", name: "Petrol", type: "petty" },
          { id: "3", name: "Stationary", type: "petty" },
          { id: "4", name: "Light Bill", type: "petty" },
          { id: "5", name: "Office Supplies", type: "petty" },
          { id: "6", name: "Scan Amount", type: "tally" },
          { id: "7", name: "Cash Billing", type: "tally" },
          { id: "8", name: "General Expense", type: "tally" },
        ]);
      }
    } catch (err) {
      setCategories([
        { id: "1", name: "Tea + Nasta", type: "petty" },
        { id: "2", name: "Petrol", type: "petty" },
        { id: "3", name: "Stationary", type: "petty" },
        { id: "4", name: "Light Bill", type: "petty" },
        { id: "5", name: "Office Supplies", type: "petty" },
        { id: "6", name: "Scan Amount", type: "tally" },
        { id: "7", name: "Cash Billing", type: "tally" },
        { id: "8", name: "General Expense", type: "tally" },
      ]);
    }
  };

  // Generate dummy data for fallback
  const generateDummyData = (): ExpenseData[] => {
    const pettyCategories = categories.filter(cat => cat.type === "petty");
    const tallyCategories = categories.filter(cat => cat.type === "tally");
    const data: ExpenseData[] = [];
    const startDate = new Date(dateFrom);
    const endDate = new Date(dateTo);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      pettyCategories.forEach(category => {
        data.push({
          date: dateStr,
          category: category.name,
          amount: Math.floor(Math.random() * 2000) + 500,
          type: "petty",
          description: `${category.name} expense`
        });
      });
      tallyCategories.forEach(category => {
        data.push({
          date: dateStr,
          category: category.name,
          amount: Math.floor(Math.random() * 10000) + 5000,
          type: "tally",
          description: `${category.name} expense`
        });
      });
    }
    return data;
  };

  // Category checkbox handler
  const handleCategoryCheckboxChange = (categoryName: string) => {
    if (categoryName === "all") {
      if (selectedCategories.includes("all")) {
        setSelectedCategories([]);
      } else {
        const allCategories = categories
          .filter(cat => cat.type === cashType)
          .map(cat => cat.name);
        setSelectedCategories(["all", ...allCategories]);
      }
    } else {
      if (selectedCategories.includes(categoryName)) {
        const newSelected = selectedCategories.filter(cat => cat !== categoryName && cat !== "all");
        setSelectedCategories(newSelected.length > 0 ? newSelected : ["all"]);
      } else {
        const newSelected = [...selectedCategories.filter(cat => cat !== "all"), categoryName];
        setSelectedCategories(newSelected);
      }
    }
  };

  const handleSelectAll = () => {
    const allCategories = categories
      .filter(cat => cat.type === cashType)
      .map(cat => cat.name);
    setSelectedCategories(["all", ...allCategories]);
  };

  const handleClearAll = () => {
    setSelectedCategories(["all"]);
  };

  const isAllSelected = () => {
    const currentTypeCategories = categories
      .filter(cat => cat.type === cashType)
      .map(cat => cat.name);
    return currentTypeCategories.every(cat => selectedCategories.includes(cat));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && loginUser) {
      fetchExpenseData();
    }
  }, [categories, dateFrom, dateTo]);

  useEffect(() => {
    setSelectedCategories(["all"]);
  }, [cashType]);

  const filteredData = expenseData.filter(expense => {
    const matchesType = expense.type === cashType;
    const matchesDate = expense.date >= dateFrom && expense.date <= dateTo;
    const matchesCategory = selectedCategories.includes("all") ||
      selectedCategories.includes(expense.category);
    return matchesType && matchesCategory && matchesDate;
  });

  const getWeekNumber = (dateString: string): string => {
    const date = new Date(dateString);
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return `Week ${Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)}`;
  };

  const getMonthFromDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const getPieChartData = () => {
    const categoryTotals: { [key: string]: number } = {};
    
    filteredData.forEach(expense => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
      }
    });
    
    console.log("categoryTotals:", categoryTotals); // Debug
    
    const labels = Object.keys(categoryTotals);
    const values = Object.values(categoryTotals);
    
    return {
      labels,
      datasets: [
        {
          label: "Expenses by Category",
          data: values,
          backgroundColor: [
            "rgba(42, 82, 152, 0.8)",
            "rgba(239, 68, 68, 0.8)",
            "rgba(59, 130, 246, 0.8)",
            "rgba(251, 191, 36, 0.8)",
            "rgba(16, 185, 129, 0.8)",
            "rgba(147, 51, 234, 0.8)",
            "rgba(236, 72, 153, 0.8)",
          ],
          borderColor: [
            "rgba(42, 82, 152, 1)",
            "rgba(239, 68, 68, 1)",
            "rgba(59, 130, 246, 1)",
            "rgba(251, 191, 36, 1)",
            "rgba(16, 185, 129, 1)",
            "rgba(147, 51, 234, 1)",
            "rgba(236, 72, 153, 1)",
          ],
          borderWidth: 2,
        },
      ],
    };
  };

  const getLineChartData = () => {
    let groupedData: { [key: string]: number } = {};
    if (viewType === "daily") {
      filteredData.forEach(expense => {
        if (groupedData[expense.date]) {
          groupedData[expense.date] += expense.amount;
        } else {
          groupedData[expense.date] = expense.amount;
        }
      });
    } else if (viewType === "weekly") {
      filteredData.forEach(expense => {
        const week = getWeekNumber(expense.date);
        if (groupedData[week]) {
          groupedData[week] += expense.amount;
        } else {
          groupedData[week] = expense.amount;
        }
      });
    } else if (viewType === "monthly") {
      filteredData.forEach(expense => {
        const month = getMonthFromDate(expense.date);
        if (groupedData[month]) {
          groupedData[month] += expense.amount;
        } else {
          groupedData[month] = expense.amount;
        }
      });
    }
    const labels = Object.keys(groupedData).sort();
    const values = labels.map(key => groupedData[key]);
    return {
      labels,
      datasets: [
        {
          label: `Expenses (${viewType})`,
          data: values,
          borderColor: "rgba(42, 82, 152, 1)",
          backgroundColor: "rgba(42, 82, 152, 0.1)",
          tension: 0.4,
          fill: true,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: "rgba(42, 82, 152, 1)",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
        },
      ],
    };
  };

  // Always return sum for summary, but
  // in rendering, show localStoragePettyCashTotal when cashType is petty
  const getSummaryData = () => {
    let total = 0;
    let highest = 0;
    if (viewType === "daily") {
      const dailyTotals: { [key: string]: number } = {};
      filteredData.forEach(expense => {
        dailyTotals[expense.date] = (dailyTotals[expense.date] || 0) + expense.amount;
      });
      total = Object.values(dailyTotals).reduce((sum, amount) => sum + amount, 0);
      highest = Math.max(...Object.values(dailyTotals), 0);
    } else if (viewType === "weekly") {
      const weeklyTotals: { [key: string]: number } = {};
      filteredData.forEach(expense => {
        const week = getWeekNumber(expense.date);
        weeklyTotals[week] = (weeklyTotals[week] || 0) + expense.amount;
      });
      total = Object.values(weeklyTotals).reduce((sum, amount) => sum + amount, 0);
      highest = Math.max(...Object.values(weeklyTotals), 0);
    } else if (viewType === "monthly") {
      const monthlyTotals: { [key: string]: number } = {};
      filteredData.forEach(expense => {
        const month = getMonthFromDate(expense.date);
        monthlyTotals[month] = (monthlyTotals[month] || 0) + expense.amount;
      });
      total = Object.values(monthlyTotals).reduce((sum, amount) => sum + amount, 0);
      highest = Math.max(...Object.values(monthlyTotals), 0);
    }
    const periods = Object.keys(getLineChartData().labels).length;
    const avgPeriod = periods > 0 ? total / periods : 0;
    const categoryCount = new Set(filteredData.map(expense => expense.category)).size;
    return {
      total,
      avgPeriod,
      highest,
      categories: categoryCount,
      periods,
    };
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          font: {
            size: 12,
            family: "'Segoe UI', sans-serif",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.parsed || 0;
            return `${label}: ₹${value.toLocaleString("en-IN")}`;
          },
        },
      },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `Expenses: ₹${context.parsed.y.toLocaleString("en-IN")}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return "₹" + value.toLocaleString("en-IN");
          },
        },
      },
    },
  };

  const handleExportPDF = () => {
    alert(`Exporting ${cashType} cash report as PDF...`);
  };

  const handleExportExcel = () => {
    alert(`Exporting ${cashType} cash report as Excel...`);
  };

  const pieChartData = getPieChartData();
  const lineChartData = getLineChartData();
  const summaryData = getSummaryData();
  const currentTypeCategories = categories.filter(cat => cat.type === cashType);

  // ==== Added: Track total tally cash from fetched data ====
  const totalTallyCash = expenseData
    .filter(expense => expense.type === "tally")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const totalToShow =
    cashType === "petty"
      ? (localStoragePettyCashTotal !== null && localStoragePettyCashTotal > 0 ? localStoragePettyCashTotal : summaryData.total)
      : cashType === "tally"
      ? totalTallyCash
      : summaryData.total;

  console.log("expenseData length:", expenseData.length);
  console.log("localStoragePettyCashTotal:", localStoragePettyCashTotal);
  console.log("totalTallyCash:", totalTallyCash);
  console.log("totalToShow:", totalToShow);
  console.log("cashType:", cashType);
  console.log("Current User:", loginUser);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg font-semibold text-gray-600">Loading data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
   

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Filter Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cash Type
            </label>
            <select
              value={cashType}
              onChange={(e) => setCashType(e.target.value as "petty" | "tally")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent font-semibold"
            >
              <option value="petty">Petty Cash</option>
              <option value="tally">Tally Cash</option>
            </select>
          </div>
          
          {/* Add Tally Sheet Selector - Only show when cashType is tally */}
          {cashType === "tally" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tally Sheet
              </label>
              <select
                value={selectedTallySheet}
                onChange={(e) => setSelectedTallySheet(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent"
              >
                {tallySheets.map(sheet => (
                  <option key={sheet} value={sheet}>
                    {sheet}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              From Date
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              To Date
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category {selectedCategories.length > 1 && `(${selectedCategories.filter(cat => cat !== "all").length} selected)`}
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent text-left bg-white flex justify-between items-center"
              >
                <span>
                  {selectedCategories.includes("all") || selectedCategories.length === 0
                    ? "All Categories"
                    : `${selectedCategories.length} categories selected`}
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showCategoryDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <div className="p-3 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold">Select Categories</span>
                      <div className="flex gap-1">
                        <button
                          onClick={handleSelectAll}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                        >
                          <FaCheck className="inline w-3 h-3 mr-1" />
                          All
                        </button>
                        <button
                          onClick={handleClearAll}
                          className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                        >
                          <FaTimes className="inline w-3 h-3 mr-1" />
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 space-y-1">
                    <label className="flex items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes("all") || isAllSelected()}
                        onChange={() => handleCategoryCheckboxChange("all")}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium">All Categories</span>
                    </label>
                    {currentTypeCategories.map(category => (
                      <label key={category.id} className="flex items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.name) || selectedCategories.includes("all")}
                          onChange={() => handleCategoryCheckboxChange(category.name)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              View Type
            </label>
            <select
              value={viewType}
              onChange={(e) => setViewType(e.target.value as "daily" | "weekly" | "monthly")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a5298] focus:border-transparent"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FaChartPie className="text-[#2a5298] text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Expense by Category
              </h3>
              <p className="text-sm text-gray-600">
                {cashType === "petty" ? "Petty Cash" : "Tally Cash"} Distribution
                {cashType === "tally" && selectedTallySheet !== "All" && ` - ${selectedTallySheet}`}
              </p>
            </div>
          </div>
          <div className="h-[300px] md:h-[350px]">
            {pieChartData.labels.length > 0 ? (
              <Pie data={pieChartData} options={pieOptions} />
            ) : (
              <div className="flex justify-center items-center h-full text-gray-500">
                No data available for selected filters
              </div>
            )}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-2 rounded-lg">
              <FaChartLine className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Expense Trend ({viewType})
              </h3>
              <p className="text-sm text-gray-600">
                {cashType === "petty" ? "Petty Cash" : "Tally Cash"} over time
                {cashType === "tally" && selectedTallySheet !== "All" && ` - ${selectedTallySheet}`}
              </p>
            </div>
          </div>
          <div className="h-[300px] md:h-[350px]">
            {lineChartData.labels.length > 0 ? (
              <Line data={lineChartData} options={lineOptions} />
            ) : (
              <div className="flex justify-center items-center h-full text-gray-500">
                No data available for selected filters
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Export Reports</h3>
            <p className="text-sm text-gray-600 mt-1">
              Download your {cashType === "petty" ? "Petty Cash" : "Tally Cash"} reports
              {cashType === "tally" && selectedTallySheet !== "All" && ` - ${selectedTallySheet}`}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
            >
              <FaFilePdf />
              Export PDF
            </button>
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
            >
              <FaFileExcel />
              Export Excel
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Summary Statistics - {cashType === "petty" ? "Petty Cash" : "Tally Cash"} ({viewType})
          {cashType === "tally" && selectedTallySheet !== "All" && ` - ${selectedTallySheet}`}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
            <p className="text-2xl font-bold text-blue-700">
              ₹{totalToShow.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600 mb-1">
              Avg. {viewType === 'daily' ? 'Daily' : viewType === 'weekly' ? 'Weekly' : 'Monthly'}
            </p>
            <p className="text-2xl font-bold text-green-700">
              ₹{summaryData.avgPeriod.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-gray-600 mb-1">
              Highest {viewType === 'daily' ? 'Day' : viewType === 'weekly' ? 'Week' : 'Month'}
            </p>
            <p className="text-2xl font-bold text-yellow-700">
              ₹{summaryData.highest.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-gray-600 mb-1">Categories</p>
            <p className="text-2xl font-bold text-purple-700">
              {summaryData.categories}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}