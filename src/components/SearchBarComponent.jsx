"use client";
import { Input } from "@heroui/react";
import React from "react";

export default function SearchBarComponent({
  value = "",
  onChange,
}) {
  return (
    <Input
      value={value}
      onValueChange={onChange}
      placeholder="Search by Product Name"
      className="w-auto focus:outline-none"
    />
  );
}
