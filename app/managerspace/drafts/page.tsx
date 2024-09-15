"use client";

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/themes';
import { CheckIcon } from '@heroicons/react/20/solid';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

export default function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  async function handleCreateGoal(data) {
    console.log("🚀 ~ handleCreateGoal ~ data:", data);
  }

  const handleSelectChange = (value) => {
    setValue('topNews', Number(value));
  };

  const handleSelectChangeCategory = (value) => {
    setValue('category', Number(value));
  };

  return (
    <form onSubmit={handleSubmit(handleCreateGoal)} className="space-y-6 max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Name Post:</label>
        <input {...register("namePost", { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md" />
        {errors.namePost && <span className="text-sm text-red-600 mt-1">This field is required</span>}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Title:</label>
        <input {...register("title", { required: true })} className="mt-1 p-2 border border-gray-300 rounded-md" />
        {errors.title && <span className="text-sm text-red-600 mt-1">This field is required</span>}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Category:</label>
        <Select.Root onValueChange={handleSelectChangeCategory}>
          <Select.Trigger className="mt-1 flex items-center justify-between p-2 border border-gray-300 rounded-md bg-white">
            <Select.Value placeholder="Select option" />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>

          <Select.Content className="bg-white border border-gray-300 rounded-md shadow-lg">
            <Select.ScrollUpButton className="flex justify-center py-2">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-2">
              <Select.Item value="0" className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <Select.ItemText>No</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon className="w-5 h-5 text-green-500" />
                </Select.ItemIndicator>
              </Select.Item>
            </Select.Viewport>
            <Select.ScrollDownButton className="flex justify-center py-2">
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Root>
        {errors.category && <span className="text-sm text-red-600 mt-1">This field is required</span>}
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Content:</label>
        <textarea {...register("content")} className="mt-1 p-2 border border-gray-300 rounded-md" />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Resume:</label>
        <input {...register("resume")} className="mt-1 p-2 border border-gray-300 rounded-md" />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Tag Post:</label>
        <input {...register("tagPost")} className="mt-1 p-2 border border-gray-300 rounded-md" />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Cover URL:</label>
        <input {...register("coverURL")} className="mt-1 p-2 border border-gray-300 rounded-md" />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Top News:</label>
        <Select.Root onValueChange={handleSelectChange}>
          <Select.Trigger className="mt-1 flex items-center justify-between p-2 border border-gray-300 rounded-md bg-white">
            <Select.Value placeholder="Select option" />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>

          <Select.Content className="bg-white border border-gray-300 rounded-md shadow-lg">
            <Select.ScrollUpButton className="flex justify-center py-2">
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-2">
              {["No", "Top", "SubPrimeiro"].map((option, index) => (
                <Select.Item key={index} value={String(index)} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  <Select.ItemText>{option}</Select.ItemText>
                  <Select.ItemIndicator>
                    <CheckIcon className="w-5 h-5 text-green-500" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton className="flex justify-center py-2">
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Root>
        {errors.topNews && <span className="text-sm text-red-600 mt-1">This field is required</span>}
      </div>

      <div className="flex items-center">
        <input type="checkbox" {...register("published")} className="mr-2" />
        <label className="text-sm font-medium text-gray-700">Published</label>
      </div>

      <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Post</button>
    </form>
  );
}
