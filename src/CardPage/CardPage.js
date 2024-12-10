import React, { useState } from "react";
import { FaArrowRight, FaUserCircle, FaTrash } from "react-icons/fa";

const RoommatesExpense = () => {
  const [contributions, setContributions] = useState([]);
  const [newContribution, setNewContribution] = useState({
    name: "",
    amount: "",
    description: "",
  });

  // Add Contribution
  const handleAddContribution = () => {
    if (!newContribution.name || !newContribution.amount || !newContribution.description) return;

    setContributions([
      ...contributions,
      {
        id: contributions.length + 1,
        ...newContribution,
        amount: parseFloat(newContribution.amount),
        date: new Date().toLocaleDateString(),
      },
    ]);

    setNewContribution({ name: "", amount: "", description: "" });
  };

  // Delete Contribution
  const handleDeleteContribution = (id) => {
    setContributions(contributions.filter((item) => item.id !== id));
  };

  // Calculate Total Expense
  const totalExpense = contributions.reduce((sum, item) => sum + item.amount, 0);

  // Group Contributions by Name
  const groupedContributions = contributions.reduce((acc, curr) => {
    if (!acc[curr.name]) {
      acc[curr.name] = { total: 0, details: [] };
    }
    acc[curr.name].total += curr.amount;
    acc[curr.name].details.push(curr);
    return acc;
  }, {});

  const totalPeople = Object.keys(groupedContributions).length;
  const perPersonExpense = totalPeople ? totalExpense / totalPeople : 0;

  // Calculate Balances
  const balances = Object.entries(groupedContributions).map(([name, { total }]) => ({
    name,
    total,
    balance: total - perPersonExpense,
  }));

  // Generate Transactions
  const transactions = [];
  const creditors = balances.filter((b) => b.balance > 0);
  const debtors = balances.filter((b) => b.balance < 0).map((d) => ({
    ...d,
    balance: Math.abs(d.balance),
  }));

  creditors.forEach((creditor) => {
    debtors.forEach((debtor) => {
      if (debtor.balance > 0 && creditor.balance > 0) {
        const payment = Math.min(creditor.balance, debtor.balance);
        transactions.push({
          from: debtor.name,
          to: creditor.name,
          amount: payment.toFixed(2),
        });
        debtor.balance -= payment;
        creditor.balance -= payment;
      }
    });
  });

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
        Roommates Expense Tracker
      </h1>
      {/* Add Contribution Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Contribution</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={newContribution.name}
            onChange={(e) =>
              setNewContribution({ ...newContribution, name: e.target.value })
            }
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="number"
            placeholder="Amount"
            value={newContribution.amount}
            onChange={(e) =>
              setNewContribution({ ...newContribution, amount: e.target.value })
            }
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={newContribution.description}
            onChange={(e) =>
              setNewContribution({ ...newContribution, description: e.target.value })
            }
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAddContribution}
            className="bg-indigo-600 text-white py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
          >
            Add Contribution
          </button>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-indigo-100 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-indigo-600">Total Expense</h3>
            <p className="text-3xl font-bold text-gray-800">₹{totalExpense.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-green-600">Per Person</h3>
            <p className="text-3xl font-bold text-gray-800">₹{perPersonExpense.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-yellow-600">Total Roommates</h3>
            <p className="text-3xl font-bold text-gray-800">{totalPeople}</p>
          </div>
        </div>
      </div>

      {/* Total Contributions Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">Total Contributions</h2>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((contribution, index) => (
              <tr key={contribution.id} className="odd:bg-white even:bg-gray-50">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{contribution.name}</td>
                <td className="py-3 px-4">{contribution.description}</td>
                <td className="py-3 px-4">₹{contribution.amount.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDeleteContribution(contribution.id)}
                    className="bg-red-400 text-white py-2 px-3 rounded-lg shadow-md hover:bg-red-500 transition duration-200 flex items-center justify-center"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Balances Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">Balances</h2>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Total Contributions</th>
              <th className="py-3 px-4 text-left">Balance</th>
            </tr>
          </thead>
          <tbody>
            {balances.map((item, index) => (
              <tr key={item.name} className="odd:bg-white even:bg-gray-50">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4">₹{item.total.toFixed(2)}</td>
                <td
                  className={`py-3 px-4 font-semibold ₹{
                    item.balance < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  ₹{item.balance.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transactions Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions to display.</p>
        ) : (
          <ul className="space-y-4">
            {transactions.map((txn, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-lg border-b py-3"
              >
                <div className="flex items-center space-x-2">
                  <FaUserCircle className="text-gray-600 w-6 h-6" />
                  <span className="font-semibold text-gray-800">{txn.from}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaArrowRight className="text-gray-500" />
                  <span className="font-semibold text-gray-800">{txn.to}</span>
                </div>
                <span className="text-indigo-600 font-bold">₹{txn.amount}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RoommatesExpense;
