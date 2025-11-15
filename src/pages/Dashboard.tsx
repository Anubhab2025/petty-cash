import { useState, useEffect } from "react";

import {
  FaWallet,
  FaMoneyBillWave,
  FaChartLine,
  FaCalendar,
} from "react-icons/fa";
import TransactionTable from "../components/TransactionTable";
import { Transaction } from "../types";

// const dummyTransactions: Transaction[] = [
//   {
//     id: "1",
//     date: "2025-11-02",
//     category: "Tea + Nasta",
//     description: "Morning tea and snacks for office staff",
//     amount: 350,
//     status: "Approved",
//     remarks: "Monthly expense",
//   },
//   {
//     id: "2",
//     date: "2025-11-03",
//     category: "Petrol",
//     description: "Vehicle fuel for delivery",
//     amount: 2000,
//     status: "Pending",
//     remarks: "",
//   },
//   {
//     id: "3",
//     date: "2025-11-03",
//     category: "Stationary",
//     description: "Office supplies and printer paper",
//     amount: 850,
//     status: "Approved",
//     remarks: "Urgent purchase",
//   },
// ];

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openingBalance, setOpeningBalance] = useState(50000);
  const [monthlyBudget, setMonthlyBudget] = useState(75000);

  // Fetch transactions from Google Sheets
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const scriptUrl = "https://script.google.com/macros/s/AKfycbx5dryxS1R5zp6myFfUlP1QPimufTqh5hcPcFMNcAJ-FiC-hyQL9mCkgHSbLkOiWTibeg/exec";
      
      const response = await fetch(`${scriptUrl}?sheet=Patty Expence&action=fetch`);
      const result = await response.json();
      
      if (result.success && result.data) {
        const data = result.data.slice(1); // Skip header row
        
        // Map sheet data to Transaction format
        const formattedTransactions: Transaction[] = data.map((row: any[], index: number) => ({
          id: (index + 1).toString(),
          date: row[1] || "", // Column B - Date
          category: getCategoryFromRow(row),
          description: generateDescription(row),
          amount: calculateRowTotal(row),
          status: "Approved",
          remarks: "",
        })).filter((t: Transaction) => t.amount > 0); // Only show rows with expenses
        
        setTransactions(formattedTransactions);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to determine category based on which field has value
  const getCategoryFromRow = (row: any[]) => {
    if (parseFloat(row[4]) > 0) return "Tea & Snacks";
    if (parseFloat(row[5]) > 0) return "Water Jar";
    if (parseFloat(row[6]) > 0) return "Electricity Bill";
    if (parseFloat(row[7]) > 0) return "Recharge";
    if (parseFloat(row[8]) > 0) return "Post Office";
    if (parseFloat(row[9]) > 0) return "Customer Discount";
    if (parseFloat(row[10]) > 0) return "Repair & Maintenance";
    if (parseFloat(row[11]) > 0) return "Stationary";
    if (parseFloat(row[12]) > 0) return "Petrol";
    if (parseFloat(row[13]) > 0) return "Patil Petrol";
    if (parseFloat(row[14]) > 0) return "Incentive";
    if (parseFloat(row[15]) > 0) return "Advance";
    if (parseFloat(row[17]) > 0) return "Breakage";
    if (parseFloat(row[19]) > 0) return "Excise/Police";
    if (parseFloat(row[20]) > 0) return "Desi Bhada";
    if (parseFloat(row[21]) > 0) return "Room Expense";
    if (parseFloat(row[22]) > 0) return "Office Expense";
    if (parseFloat(row[23]) > 0) return "Personal Expense";
    if (parseFloat(row[24]) > 0) return "Miscellaneous";
    if (parseFloat(row[25]) > 0) return "Credit Card Charges";
    return "Other";
  };

  // Helper function to generate description
  const generateDescription = (row: any[]) => {
    const category = getCategoryFromRow(row);
    const date = row[1] || "";
    return `${category} expense for ${date}`;
  };

  // Helper function to calculate total expenses from a row
  const calculateRowTotal = (row: any[]) => {
    return [
      parseFloat(row[4]) || 0,   // Tea & Snacks
      parseFloat(row[5]) || 0,   // Water Jar
      parseFloat(row[6]) || 0,   // Electricity Bill
      parseFloat(row[7]) || 0,   // Recharge
      parseFloat(row[8]) || 0,   // Post Office
      parseFloat(row[9]) || 0,   // Customer Discount
      parseFloat(row[10]) || 0,  // Repair & Maintenance
      parseFloat(row[11]) || 0,  // Stationary
      parseFloat(row[12]) || 0,  // Petrol
      parseFloat(row[13]) || 0,  // Patil Petrol
      parseFloat(row[14]) || 0,  // Incentive
      parseFloat(row[15]) || 0,  // Advance
      parseFloat(row[17]) || 0,  // Breakage
      parseFloat(row[19]) || 0,  // Excise/Police
      parseFloat(row[20]) || 0,  // Desi Bhada
      parseFloat(row[21]) || 0,  // Room Expense
      parseFloat(row[22]) || 0,  // Office Expense
      parseFloat(row[23]) || 0,  // Personal Expense
      parseFloat(row[24]) || 0,  // Miscellaneous
      parseFloat(row[25]) || 0,  // Credit Card Charges
    ].reduce((sum, val) => sum + val, 0);
  };

  const handleDeleteTransaction = (id: string) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      setTransactions(transactions.filter((t) => t.id !== id));
    }
  };

  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  const closingBalance = openingBalance - totalExpenses;
  const totalTransactions = transactions.length;
  const approvedTransactions = transactions.filter(
    (t) => t.status === "Approved"
  ).length;
  const pendingTransactions = transactions.filter(
    (t) => t.status === "Pending"
  ).length;
  const averageExpense =
    totalTransactions > 0 ? totalExpenses / totalTransactions : 0;

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
      title: "Approved Transactions",
      value: approvedTransactions,
      icon: FaChartLine,
      color: "bg-green-500",
      textColor: "text-green-600",
      bgLight: "bg-green-50",
    },
    {
      title: "Pending Transactions",
      value: pendingTransactions,
      icon: FaWallet,
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
      bgLight: "bg-yellow-50",
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
          <svg className="animate-spin h-10 w-10 text-[#2a5298] mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
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
              <p className="text-xs font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-lg md:text-xl font-bold text-gray-800">
                {formatCurrency(stat.value)}
              </p>
            </div>
          );
        })}
      </div>

      <TransactionTable
        transactions={transactions}
        onDelete={handleDeleteTransaction}
      />
    </div>
  );
}

