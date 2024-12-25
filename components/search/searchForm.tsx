import React from 'react';
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface FormData {
  searchTerm: string;
}

interface SearchFormProps {
  onSubmit: (data: FormData) => void;
  loading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit, loading }) => {
  const { register, handleSubmit } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center space-x-2">
      <Input
        type="search"
        placeholder="Поиск..."
        className="hmd:w-[100px] lg:w-[300px]"
        {...register("searchTerm", { required: true })}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Поиск..." : "Поиск"}
      </Button>
    </form>
  );
};

export default SearchForm;
