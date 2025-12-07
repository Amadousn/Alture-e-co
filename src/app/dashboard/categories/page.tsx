'use client';

import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

export default function CategoriesPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState({ value: '', label: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/pagedata');
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error('Failed to load page data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = () => {
    if (!newCategory.value || !newCategory.label) return;

    const updatedCategories = [
      ...(data.searchOptions.category || []),
      newCategory
    ];

    updateData(updatedCategories);
    setNewCategory({ value: '', label: '' });
  };

  const handleDeleteCategory = (value: string) => {
    const updatedCategories = data.searchOptions.category.filter((c: any) => c.value !== value);
    updateData(updatedCategories);
  };

  const updateData = async (categories: any[]) => {
    const newData = {
      ...data,
      searchOptions: {
        ...data.searchOptions,
        category: categories
      }
    };

    try {
      const res = await fetch('/api/pagedata', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });

      if (res.ok) {
        setData(newData);
      } else {
        alert('Failed to update categories');
      }
    } catch (error) {
      console.error('Error updating categories', error);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Categories Management</h2>
      
      <div className="bg-white dark:bg-semidark p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 max-w-2xl">
        <h3 className="text-xl font-semibold mb-4">Property Categories</h3>
        
        <div className="space-y-4 mb-8">
          {data?.searchOptions?.category?.map((cat: any, index: number) => (
             cat.value !== '' && (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">{cat.label}</span>
                  <span className="text-sm text-gray-500 ml-2">({cat.value})</span>
                </div>
                <button 
                  onClick={() => handleDeleteCategory(cat.value)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Icon icon="mdi:trash" width="20" />
                </button>
              </div>
            )
          ))}
        </div>

        <div className="flex gap-4 items-end border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Value (slug)</label>
            <input
              type="text"
              placeholder="e.g. pent-house"
              value={newCategory.value}
              onChange={(e) => setNewCategory({ ...newCategory, value: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-darkmode"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Label</label>
            <input
              type="text"
              placeholder="e.g. Penthouse"
              value={newCategory.label}
              onChange={(e) => setNewCategory({ ...newCategory, label: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-darkmode"
            />
          </div>
          <button
            onClick={handleAddCategory}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 font-bold"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
