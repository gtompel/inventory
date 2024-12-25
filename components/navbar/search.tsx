"use client";
import React, { useState } from "react";
import { Task } from "@prisma/client";
import { searchTasks } from "@/service/task";
import SearchForm from "../search/searchForm"; // Импортируйте компонент SearchForm
import SearchModal from "../search/searchModal"; // Импортируйте компонент SearchModal

interface Props {
  task?: Task;
}

const Search: React.FC<Props> = () => {
  const [results, setResults] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);

  const onSubmit = async (data: { searchTerm: string }) => {
    setLoading(true);
    setResults([]);
    setIsModalOpen(false);
    setNoResults(false);

    try {
      const response = await searchTasks(data.searchTerm);
      setResults(response);
      if (response.length > 0) {
        setIsModalOpen(true);
      } else {
        setNoResults(true);
        setIsModalOpen(true);
      }
    } catch {
      alert("Ошибка при поиске");
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    setIsModalOpen(false);
    setResults([]); // Очистка результатов при закрытии
    setNoResults(false); // Сброс состояния
  };

  return (
    <div>
      <SearchForm onSubmit={onSubmit} loading={loading} />
      <SearchModal isOpen={isModalOpen} close={close} results={results} noResults={noResults} />
    </div>
  );
};

export default Search;
