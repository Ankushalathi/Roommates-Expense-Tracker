import React, { useState } from "react";
import { FaArrowRight, FaUserCircle } from "react-icons/fa";

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
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Roommates Expense Tracker</h1>

      {/* Add Contribution Form */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Contribution</h2>
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
            className="bg-indigo-600 text-white py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-200"
          >
            Add Contribution
          </button>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-indigo-100 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-indigo-600">Total Expense</h3>
            <p className="text-3xl text-gray-800">${totalExpense.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-green-600">Per Person</h3>
            <p className="text-3xl text-gray-800">${perPersonExpense.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-yellow-600">Total Roommates</h3>
            <p className="text-3xl text-gray-800">{totalPeople}</p>
          </div>
        </div>
      </div>

      {/* Per Person Total Contributions */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Per Person Total Contributions</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 border-b text-left">#</th>
              <th className="py-3 px-4 border-b text-left">Name</th>
              <th className="py-3 px-4 border-b text-left">Total Contributions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedContributions).map(([name, { total }], index) => (
              <tr key={name} className="text-center">
                <td className="py-3 px-4 border-b">{index + 1}</td>
                <td className="py-3 px-4 border-b">{name}</td>
                <td className="py-3 px-4 border-b">${total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    {/* Balances Section */}
<div className="bg-white p-6 rounded-xl shadow-md mb-6">
  <h2 className="text-xl font-semibold mb-4">Balances</h2>
  {balances.length === 0 ? (
    <p className="text-gray-500">No balances to display.</p>
  ) : (
    <table className="min-w-full table-auto border-collapse">
      <thead className="bg-gray-200">
        <tr>
          <th className="py-3 px-4 border-b text-left">#</th>
          <th className="py-3 px-4 border-b text-left">Name</th>
          <th className="py-3 px-4 border-b text-left">Total Contributions</th>
          <th className="py-3 px-4 border-b text-left">Balance</th>
        </tr>
      </thead>
      <tbody>
        {balances.map((item, index) => (
          <tr key={item.name} className="text-center">
            <td className="py-3 px-4 border-b">{index + 1}</td>
            <td className="py-3 px-4 border-b">{item.name}</td>
            <td className="py-3 px-4 border-b">${item.total.toFixed(2)}</td>
            <td
              className={`py-3 px-4 border-b ${item.balance < 0 ? "text-red-600" : "text-green-600"}`}
            >
              ${item.balance.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

{/* Transactions Section */}
<div className="bg-white p-6 rounded-xl shadow-md">
  <h2 className="text-xl font-semibold mb-4">Transactions</h2>
  {transactions.length === 0 ? (
    <p className="text-gray-500">No transactions to display.</p>
  ) : (
    <ul className="space-y-4">
      {transactions.map((txn, index) => (
        <li
          key={index}
          className="flex items-center justify-between space-x-4 text-lg border-b py-3"
        >
          <div className="flex items-center space-x-2">
            <FaUserCircle className="text-gray-600 w-6 h-6" />
            <span className="font-semibold text-gray-800">{txn.from}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaArrowRight className="text-gray-500" />
            <span className="font-semibold text-gray-800">{txn.to}</span>
          </div>
          <span className="text-gray-600">paid ${txn.amount}</span>
        </li>
      ))}
    </ul>
  )}
</div>

    </div>
  );
};

export default RoommatesExpense;
