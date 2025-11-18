import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">ERP Panel</h2>

        <nav>
          <ul className="space-y-4 text-gray-700">
            <li className="hover:text-blue-600 cursor-pointer">Dashboard</li>
            <li className="hover:text-blue-600 cursor-pointer">Sales</li>
            <li className="hover:text-blue-600 cursor-pointer">Inventory</li>
            <li className="hover:text-blue-600 cursor-pointer">Reports</li>
          </ul>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
