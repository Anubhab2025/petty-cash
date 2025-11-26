// import { useState, useEffect } from "react";

// import {
//   FaWallet,
//   FaMoneyBillWave,
//   FaChartLine,
//   FaCalendar,
// } from "react-icons/fa";
// import TransactionTable from "../components/TransactionTable";
// import { Transaction } from "../types";

// export default function Dashboard() {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [openingBalance, setOpeningBalance] = useState(50000);
//   const [monthlyBudget, setMonthlyBudget] = useState(() => {
//     const savedBudget = localStorage.getItem('monthlyBudget');
//     return savedBudget !== null ? parseFloat(savedBudget) : 75000;
//   });
//   const [isEditingBudget, setIsEditingBudget] = useState(false);

//   const scriptUrl = "https://script.google.com/macros/s/AKfycbx5dryxS1R5zp6myFfUlP1QPimufTqh5hcPcFMNcAJ-FiC-hyQL9mCkgHSbLkOiWTibeg/exec";

//   // Fetch transactions from Google Sheets
//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = async () => {
//     try {
//       setIsLoading(true);

//       const response = await fetch(`${scriptUrl}?sheet=Patty Expence&action=fetch`);
//       const result = await response.json();

//       if (result.success && result.data) {
//         const data = result.data.slice(1); // Skip header row

//         // Map sheet data to Transaction format
//         const formattedTransactions: Transaction[] = data.map((row: any[], index: number) => ({
//           id: (index + 1).toString(),
//           rowIndex: index + 2, // Store actual sheet row index (header is row 1, data starts at row 2)
//           date: row[1] || "", // Column B - Date
//           category: getCategoryFromRow(row),
//           description: generateDescription(row),
//           amount: calculateRowTotal(row),
//           status: "Approved",
//           remarks: "",
//         })).filter((t: Transaction) => t.amount > 0); // Only show rows with expenses

//         setTransactions(formattedTransactions);
//       }
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Helper function to determine category based on which field has value
//   const getCategoryFromRow = (row: any[]) => {
//     if (parseFloat(row[4]) > 0) return "Tea & Snacks";
//     if (parseFloat(row[5]) > 0) return "Water Jar";
//     if (parseFloat(row[6]) > 0) return "Electricity Bill";
//     if (parseFloat(row[7]) > 0) return "Recharge";
//     if (parseFloat(row[8]) > 0) return "Post Office";
//     if (parseFloat(row[9]) > 0) return "Customer Discount";
//     if (parseFloat(row[10]) > 0) return "Repair & Maintenance";
//     if (parseFloat(row[11]) > 0) return "Stationary";
//     if (parseFloat(row[12]) > 0) return "Petrol";
//     if (parseFloat(row[13]) > 0) return "Patil Petrol";
//     if (parseFloat(row[14]) > 0) return "Incentive";
//     if (parseFloat(row[15]) > 0) return "Advance";
//     if (parseFloat(row[17]) > 0) return "Breakage";
//     if (parseFloat(row[19]) > 0) return "Excise/Police";
//     if (parseFloat(row[20]) > 0) return "Desi Bhada";
//     if (parseFloat(row[21]) > 0) return "Room Expense";
//     if (parseFloat(row[22]) > 0) return "Office Expense";
//     if (parseFloat(row[23]) > 0) return "Personal Expense";
//     if (parseFloat(row[24]) > 0) return "Miscellaneous";
//     if (parseFloat(row[25]) > 0) return "Credit Card Charges";
//     return "Other";
//   };

//   // Helper function to generate description
//   const generateDescription = (row: any[]) => {
//     const category = getCategoryFromRow(row);
//     const date = row[1] || "";
//     return `${category} expense for ${date}`;
//   };

//   // Helper function to calculate total expenses from a row
//   const calculateRowTotal = (row: any[]) => {
//     return [
//       parseFloat(row[4]) || 0,   // Tea & Snacks
//       parseFloat(row[5]) || 0,   // Water Jar
//       parseFloat(row[6]) || 0,   // Electricity Bill
//       parseFloat(row[7]) || 0,   // Recharge
//       parseFloat(row[8]) || 0,   // Post Office
//       parseFloat(row[9]) || 0,   // Customer Discount
//       parseFloat(row[10]) || 0,  // Repair & Maintenance
//       parseFloat(row[11]) || 0,  // Stationary
//       parseFloat(row[12]) || 0,  // Petrol
//       parseFloat(row[13]) || 0,  // Patil Petrol
//       parseFloat(row[14]) || 0,  // Incentive
//       parseFloat(row[15]) || 0,  // Advance
//       parseFloat(row[17]) || 0,  // Breakage
//       parseFloat(row[19]) || 0,  // Excise/Police
//       parseFloat(row[20]) || 0,  // Desi Bhada
//       parseFloat(row[21]) || 0,  // Room Expense
//       parseFloat(row[22]) || 0,  // Office Expense
//       parseFloat(row[23]) || 0,  // Personal Expense
//       parseFloat(row[24]) || 0,  // Miscellaneous
//       parseFloat(row[25]) || 0,  // Credit Card Charges
//     ].reduce((sum, val) => sum + val, 0);
//   };

//   const handleDeleteTransaction = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this transaction?")) {
//       return;
//     }

//     try {
//       // Find the transaction to get the actual row index
//       const transaction = transactions.find(t => t.id === id);
//       if (!transaction || !transaction.rowIndex) {
//         alert("Transaction not found");
//         return;
//       }

//       // Send delete request to Google Sheets
//       const formData = new URLSearchParams();
//       formData.append('sheetName', 'Patty Expence');
//       formData.append('action', 'delete');
//       formData.append('rowIndex', transaction.rowIndex.toString());

//       const response = await fetch(scriptUrl, {
//         method: 'POST',
//         body: formData
//       });

//       const result = await response.json();

//       if (result.success) {
//         // Remove from local state
//         setTransactions(transactions.filter((t) => t.id !== id));
//         alert("Transaction deleted successfully!");

//         // Refresh data to get updated row indices
//         fetchTransactions();
//       } else {
//         alert("Failed to delete transaction: " + result.error);
//       }
//     } catch (error) {
//       console.error('Error deleting transaction:', error);
//       alert("Error deleting transaction. Please try again.");
//     }
//   };

//   // Handler for budget editing
//   const handleBudgetSave = () => {
//     setIsEditingBudget(false);
//     localStorage.setItem('monthlyBudget', monthlyBudget.toString());
//   };

//   const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseFloat(e.target.value) || 0;
//     setMonthlyBudget(value);
//   };

//   const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
//   const closingBalance = openingBalance - totalExpenses;
//   const totalTransactions = transactions.length;
// const approvedTransactions = transactions.filter(
//   (t) => t.status === "Approved"
// ).length;
// const pendingTransactions = transactions.filter(
//   (t) => t.status === "Pending"
// ).length;
// const averageExpense =
//   totalTransactions > 0 ? totalExpenses / totalTransactions : 0;

//   const stats = [
//     {
//       title: "Opening Balance",
//       value: openingBalance,
//       icon: FaWallet,
//       color: "bg-blue-500",
//       textColor: "text-blue-600",
//       bgLight: "bg-blue-50",
//     },
//     {
//       title: "Total Expenses",
//       value: totalExpenses,
//       icon: FaMoneyBillWave,
//       color: "bg-red-500",
//       textColor: "text-red-600",
//       bgLight: "bg-red-50",
//     },
//     {
//       title: "Closing Balance",
//       value: closingBalance,
//       icon: FaChartLine,
//       color: "bg-green-500",
//       textColor: "text-green-600",
//       bgLight: "bg-green-50",
//     },
//     {
//       title: "Monthly Budget",
//       value: monthlyBudget,
//       icon: FaCalendar,
//       color: "bg-purple-500",
//       textColor: "text-purple-600",
//       bgLight: "bg-purple-50",
//     },
//     {
//       title: "Total Transactions",
//       value: totalTransactions,
//       icon: FaMoneyBillWave,
//       color: "bg-indigo-500",
//       textColor: "text-indigo-600",
//       bgLight: "bg-indigo-50",
//     },
//     {
//       title: "Approved Transactions",
//       value: approvedTransactions,
//       icon: FaChartLine,
//       color: "bg-green-500",
//       textColor: "text-green-600",
//       bgLight: "bg-green-50",
//     },
//     {
//       title: "Pending Transactions",
//       value: pendingTransactions,
//       icon: FaWallet,
//       color: "bg-yellow-500",
//       textColor: "text-yellow-600",
//       bgLight: "bg-yellow-50",
//     },
//     {
//       title: "Avg Expense",
//       value: Math.round(averageExpense),
//       icon: FaCalendar,
//       color: "bg-pink-500",
//       textColor: "text-pink-600",
//       bgLight: "bg-pink-50",
//     },
//   ];

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <svg className="animate-spin h-10 w-10 text-[#2a5298] mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//           <p className="text-gray-600">Loading transactions...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;

//           // Special handling for Monthly Budget card (index 3)
//           if (index === 3) {
//             return (
//               <div
//                 key={index}
//                 className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
//               >
//                 <div className="flex items-center justify-between mb-2">
//                   <div className={`${stat.bgLight} p-2 rounded-lg`}>
//                     <Icon className={`${stat.textColor} text-xl`} />
//                   </div>
//                 </div>
//                 <p className="text-xs font-medium text-gray-600 mb-1">{stat.title}</p>

//                 {isEditingBudget ? (
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="number"
//                       value={monthlyBudget}
//                       onChange={handleBudgetChange}
//                       className="text-lg md:text-xl font-bold text-gray-800 border border-blue-500 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       autoFocus
//                       onKeyDown={(e) => {
//                         if (e.key === 'Enter') handleBudgetSave();
//                         if (e.key === 'Escape') setIsEditingBudget(false);
//                       }}
//                     />
//                     <button
//                       onClick={handleBudgetSave}
//                       className="text-green-600 hover:text-green-700"
//                       title="Save"
//                     >
//                       ✓
//                     </button>
//                     <button
//                       onClick={() => setIsEditingBudget(false)}
//                       className="text-red-600 hover:text-red-700"
//                       title="Cancel"
//                     >
//                       ✗
//                     </button>
//                   </div>
//                 ) : (
//                   <div 
//                     className="flex items-center justify-between cursor-pointer group"
//                     onClick={() => setIsEditingBudget(true)}
//                   >
//                     <p className="text-lg md:text-xl font-bold text-gray-800">
//                       {formatCurrency(stat.value)}
//                     </p>
//                     <span className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
//                       ✏️
//                     </span>
//                   </div>
//                 )}
//               </div>
//             );
//           }

//           // Original card rendering for other stats
//           return (
//             <div
//               key={index}
//               className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <div className={`${stat.bgLight} p-2 rounded-lg`}>
//                   <Icon className={`${stat.textColor} text-xl`} />
//                 </div>
//               </div>
//               <p className="text-xs font-medium text-gray-600 mb-1">{stat.title}</p>
//               <p className="text-lg md:text-xl font-bold text-gray-800">
//                 {formatCurrency(stat.value)}
//               </p>
//             </div>
//           );
//         })}
//       </div>

//       <TransactionTable
//         transactions={transactions}
//         onDelete={handleDeleteTransaction}
//       />
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import {
  FaWallet,
  FaMoneyBillWave,
  FaChartLine,
  FaCalendar,
} from "react-icons/fa";
import TransactionTable from "../components/TransactionTable";
import { Transaction } from "../types";

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Stats from sheet row 1 (top red text row)
  const [openingBalance, setOpeningBalance] = useState(0);
  const [closingBalance, setClosingBalance] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const [monthlyBudget, setMonthlyBudget] = useState(() => {
    const savedBudget = localStorage.getItem("monthlyBudget");
    return savedBudget !== null ? parseFloat(savedBudget) : 75000;
  });
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
  const [tempStatus, setTempStatus] = useState<string>("");

  const [activeTab, setActiveTab] = useState<"patty" | "tally">("patty");

  const tallySheets = [
    "All",
    "Cash Tally Counter 1",
    "Cash Tally Counter 2",
    "Cash Tally Counter 3",
  ];

  const [selectedTallySheet, setSelectedTallySheet] = useState<string>("All");
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string } | null>(null);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(`${scriptUrl}?action=getCurrentUser`);
        const result = await response.json();
        if (result.success) {
          setCurrentUser({ name: result.name, role: result.role });
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchCurrentUser();
  }, []);

  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbx5dryxS1R5zp6myFfUlP1QPimufTqh5hcPcFMNcAJ-FiC-hyQL9mCkgHSbLkOiWTibeg/exec";

  const fetchStatsAndExpenses = async (sheetName: string, userName: string | null = null, userRole: string | null = null) => {
    try {
      const dataRes = await fetch(
        `${scriptUrl}?sheet=${encodeURIComponent(sheetName)}&action=fetch`
      );
      const dataJson = await dataRes.json();

      if (dataJson.success && dataJson.data) {
        let openingBal = 0;
        let expensesSum = 0;
        let filteredRows = dataJson.data;

        // ONLY filter if NOT admin
        if (userRole && userRole.toLowerCase() !== 'admin' && userName) {
          const userNameLower = userName.trim().toLowerCase();

          if (sheetName === 'Patty Expence') {
            filteredRows = dataJson.data.filter(row =>
              row[27] && row[27].toString().trim().toLowerCase() === userNameLower
            );
          } else {
            filteredRows = dataJson.data.filter(row =>
              row[3] && row[3].toString().trim().toLowerCase() === userNameLower
            );
          }
        }
        // Admin ke liye NO filter - sab rows calculate hongi

        // Calculate stats
        for (const row of filteredRows) {
          openingBal += parseFloat(row[3]) || 0;
          for (let i = 5; i <= 25; i++) {
            expensesSum += parseFloat(row[i]) || 0;
          }
        }

        setOpeningBalance(openingBal);
        setTotalExpenses(expensesSum);
        setClosingBalance(openingBal - expensesSum);
      } else {
        setOpeningBalance(0);
        setTotalExpenses(0);
        setClosingBalance(0);
      }
    } catch (error) {
      console.error("Error:", error);
      setOpeningBalance(0);
      setTotalExpenses(0);
      setClosingBalance(0);
    }
  };


  useEffect(() => {
    const userName = localStorage.getItem('currentUserName');
    const userRole = localStorage.getItem('currentUserRole');

    // console.log("=== Dashboard User Check ===");
    console.log("Username from localStorage:", userName);
    console.log("Role from localStorage:", userRole);

    if (userName && userRole) {
      setCurrentUser({ name: userName, role: userRole });
    } else {
      // console.error("User not found in localStorage!");
    }
  }, []);

  const fetchMultipleTallyStats = async (sheets: string[], userName: string | null, userRole: string | null) => {
    let totalOpeningBal = 0;
    let totalExpensesSum = 0;

    try {
      const userNameLower = userName ? userName.trim().toLowerCase() : '';

      for (const sheet of sheets) {
        const dataRes = await fetch(
          `${scriptUrl}?sheet=${encodeURIComponent(sheet)}&action=fetch`
        );
        const dataJson = await dataRes.json();

        if (dataJson.success && dataJson.data) {
          let filteredRows = dataJson.data;

          // ONLY filter if NOT admin
          if (userRole && userRole.toLowerCase() !== 'admin' && userName) {
            filteredRows = dataJson.data.filter(row =>
              row[3] && row[3].toString().trim().toLowerCase() === userNameLower
            );
          }
          // Admin ke liye NO filter

          for (const row of filteredRows) {
            totalOpeningBal += parseFloat(row[3]) || 0;
            for (let i = 5; i <= 25; i++) {
              totalExpensesSum += parseFloat(row[i]) || 0;
            }
          }
        }
      }

      setOpeningBalance(totalOpeningBal);
      setTotalExpenses(totalExpensesSum);
      setClosingBalance(totalOpeningBal - totalExpensesSum);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  useEffect(() => {
    if (!currentUser) return;

    let sheetName;
    if (activeTab === "patty") {
      sheetName = "Patty Expence";
      fetchTransactions(sheetName);
      fetchStatsAndExpenses(sheetName, currentUser.name, currentUser.role);
    } else {
      if (selectedTallySheet === "All") {
        const sheetsToFetch = tallySheets.filter(s => s !== "All");
        fetchTransactions(sheetsToFetch);
        fetchMultipleTallyStats(sheetsToFetch, currentUser.name, currentUser.role);
      } else {
        sheetName = selectedTallySheet;
        fetchTransactions(sheetName);
        fetchStatsAndExpenses(sheetName, currentUser.name, currentUser.role);
      }
    }
  }, [activeTab, selectedTallySheet, currentUser]);
  const fetchTransactions = async (sheetNames: string | string[]) => {
    setIsLoading(true);

    try {
      const sheets = Array.isArray(sheetNames) ? sheetNames : [sheetNames];
      const allData: Transaction[] = [];

      for (const sheetName of sheets) {
        const response = await fetch(
          `${scriptUrl}?sheet=${encodeURIComponent(sheetName)}&action=fetch`
        );
        const result = await response.json();

        if (result.success && result.data) {
          let data = result.data;

          // ONLY filter if NOT admin
          if (currentUser && currentUser.role.toLowerCase() !== 'admin') {
            const userName = currentUser.name.trim().toLowerCase();

            if (sheetName === 'Patty Expence') {
              data = data.filter(row =>
                row[27] && row[27].toString().trim().toLowerCase() === userName
              );
            } else {
              data = data.filter(row =>
                row[3] && row[3].toString().trim().toLowerCase() === userName
              );
            }
          }
          // Admin ke liye NO filter - sab data show hoga

          const formatted: Transaction[] = data.map((row: any[], index: number) => ({
            id: row[1] ? row[1].toString() : (allData.length + index + 1).toString(),
            rowIndex: index + 2,
            date: row[2] || "",
            name: sheetName === 'Patty Expence' ? (row[27] || "") : (row[3] || ""), // Correct name field
            openingQty: row[3] || "",
            closing: row[4] || "",
            teaNasta: row[5] || "",
            waterJar: row[6] || "",
            lightBill: row[7] || "",
            recharge: row[8] || "",
            postOffice: row[9] || "",
            customerDiscount: row[10] || "",
            repairMaintenance: row[11] || "",
            stationary: row[12] || "",
            petrol: row[13] || "",
            patilPetrol: row[14] || "",
            incentive: row[15] || "",
            advance: row[16] || "",
            breakage: row[18] || "",
            excisePolice: row[20] || "",
            desiBhada: row[20] || "",
            roomExpense: row[21] || "",
            officeExpense: row[22] || "",
            personalExpense: row[23] || "",
            miscExpense: row[24] || "",
            creditCardCharges: row[25] || "",
            transactionStatus: row[28] || "Pending",
            category: getCategoryFromRow(row),
            description: generateDescription(row),
            amount: row.slice(5, 26).reduce((a, v) => a + (parseFloat(v) || 0), 0),
            status: row[26] || "Pending",
            remarks: "",
            otherPurchaseVoucherNo: "",
            otherVendorPayment: "",
            differenceAmount: "",
            sheetName: sheetName,
          }));

          allData.push(...formatted);
        }
      }

      setTransactions(allData);
    } catch (error) {
      console.error("Error:", error);
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };


  const getCategoryFromRow = (row: any[]) => {
    if (parseFloat(row[5]) > 0) return "Tea & Snacks";
    if (parseFloat(row[6]) > 0) return "Water Jar";
    if (parseFloat(row[7]) > 0) return "Electricity Bill";
    if (parseFloat(row[8]) > 0) return "Recharge";
    if (parseFloat(row[9]) > 0) return "Post Office";
    if (parseFloat(row[10]) > 0) return "Customer Discount";
    if (parseFloat(row[11]) > 0) return "Repair & Maintenance";
    if (parseFloat(row[12]) > 0) return "Stationary";
    if (parseFloat(row[13]) > 0) return "Petrol";
    if (parseFloat(row[14]) > 0) return "Patil Petrol";
    if (parseFloat(row[15]) > 0) return "Incentive";
    if (parseFloat(row[16]) > 0) return "Advance";
    if (parseFloat(row[18]) > 0) return "Breakage";
    if (parseFloat(row[20]) > 0) return "Excise/Police";
    if (parseFloat(row[21]) > 0) return "Desi Bhada";
    if (parseFloat(row[22]) > 0) return "Room Expense";
    if (parseFloat(row[22]) > 0) return "Office Expense";
    if (parseFloat(row[24]) > 0) return "Personal Expense";
    if (parseFloat(row[25]) > 0) return "Miscellaneous";
    if (parseFloat(row[26]) > 0) return "Credit Card Charges";
    return "Other";
  };

  const generateDescription = (row: any[]) => {
    const category = getCategoryFromRow(row);
    const date = row[1] || "";
    return `${category} expense for ${date}`;
  };

  useEffect(() => {
    let sheetName;
    if (activeTab === "patty") {
      sheetName = "Patty Expence";
      fetchTransactions(sheetName);
      fetchStatsAndExpenses(sheetName); // <--- Ab yahi aggregate ka logic hai!
    } else {
      if (selectedTallySheet === "All") {
        const sheetsToFetch = tallySheets.filter(s => s !== "All");
        fetchTransactions(sheetsToFetch);
        fetchStatsAndExpenses(sheetsToFetch[0]);
      } else {
        sheetName = selectedTallySheet;
        fetchTransactions(sheetName);
        fetchStatsAndExpenses(sheetName);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, selectedTallySheet]);

  const filteredTransactions = activeTab === "tally" && selectedTallySheet !== "All"
    ? transactions.filter(t => t.sheetName === selectedTallySheet)
    : transactions;

  const totalTransactions = filteredTransactions.length;
  const averageExpense =
    totalTransactions > 0
      ? filteredTransactions.reduce((sum, t) => sum + t.amount, 0) / totalTransactions
      : 0;

  const stats = [
    {
      title: "Opening Balance",
      value: openingBalance,
      icon: FaWallet,
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgLight: "bg-blue-50",
    },
    {
      title: "Total Expenses",
      value: totalExpenses,
      icon: FaMoneyBillWave,
      color: "bg-red-500",
      textColor: "text-red-600",
      bgLight: "bg-red-50",
    },
    {
      title: "Closing Balance",
      value: closingBalance,
      icon: FaChartLine,
      color: "bg-green-500",
      textColor: "text-green-600",
      bgLight: "bg-green-50",
    },
    {
      title: "Monthly Budget",
      value: monthlyBudget,
      icon: FaCalendar,
      color: "bg-purple-500",
      textColor: "text-purple-600",
      bgLight: "bg-purple-50",
    },
    {
      title: "Total Transactions",
      value: totalTransactions,
      icon: FaMoneyBillWave,
      color: "bg-indigo-500",
      textColor: "text-indigo-600",
      bgLight: "bg-indigo-50",
    },
    {
      title: "Avg Expense",
      value: Math.round(averageExpense),
      icon: FaCalendar,
      color: "bg-pink-500",
      textColor: "text-pink-600",
      bgLight: "bg-pink-50",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-[#2a5298] mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-gray-600">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          if (index === 3) {
            // Monthly Budget Card - Only Admin can edit
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`${stat.bgLight} p-2 rounded-lg`}>
                    <Icon className={`${stat.textColor} text-xl`} />
                  </div>
                </div>
                <p className="text-xs font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>

                {/* Check if user is admin */}
                {currentUser?.role?.toLowerCase() === 'admin' ? (
                  // Admin - Can edit budget
                  isEditingBudget ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={monthlyBudget}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) || 0;
                          setMonthlyBudget(value);
                        }}
                        className="text-lg md:text-xl font-bold text-gray-800 border border-blue-500 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setIsEditingBudget(false);
                            localStorage.setItem(
                              "monthlyBudget",
                              monthlyBudget.toString()
                            );
                          }
                          if (e.key === "Escape") setIsEditingBudget(false);
                        }}
                      />
                      <button
                        onClick={() => {
                          setIsEditingBudget(false);
                          localStorage.setItem(
                            "monthlyBudget",
                            monthlyBudget.toString()
                          );
                        }}
                        className="text-green-600 hover:text-green-700"
                        title="Save"
                      >✓</button>
                      <button
                        onClick={() => setIsEditingBudget(false)}
                        className="text-red-600 hover:text-red-700"
                        title="Cancel"
                      >✗</button>
                    </div>
                  ) : (
                    <div
                      className="flex items-center justify-between cursor-pointer group"
                      onClick={() => setIsEditingBudget(true)}
                    >
                      <p className="text-lg md:text-xl font-bold text-gray-800">
                        {formatCurrency(stat.value)}
                      </p>
                      <span className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        ✏️
                      </span>
                    </div>
                  )
                ) : (
                  // Regular User - Read-only, no edit
                  <div className="flex items-center justify-between">
                    <p className="text-lg md:text-xl font-bold text-gray-800">
                      {formatCurrency(stat.value)}
                    </p>
                  </div>
                )}
              </div>
            );
          }

          // Other cards remain same
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`${stat.bgLight} p-2 rounded-lg`}>
                  <Icon className={`${stat.textColor} text-xl`} />
                </div>
              </div>
              <p className="text-xs font-medium text-gray-600 mb-1">
                {stat.title}
              </p>
              <p className="text-lg md:text-xl font-bold text-gray-800">
                {formatCurrency(stat.value)}
              </p>
            </div>
          );
        })}
      </div>
      {/* TABLE */}
      <TransactionTable
        transactions={filteredTransactions}
        editingStatusId={editingStatusId}
        tempStatus={tempStatus}
        onEditStatus={setEditingStatusId ? (id, status) => {
          setEditingStatusId(id);
          setTempStatus(status);
        } : undefined}
        onStatusChange={setTempStatus}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedTallyOption={activeTab === "tally" ? selectedTallySheet : ""}
        onTallyOptionChange={setSelectedTallySheet}
        isLoading={isLoading}
      />
    </div>
  );
}
