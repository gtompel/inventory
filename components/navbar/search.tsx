'use client';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { searchTasks } from '@/service/task';
import { Button } from '../ui/button';
import Modal from '../ui/modal';

interface Task {
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  status: string;
  ownerId: string;
}

interface SearchProps {
  initialData?: Task[];
}

const Search: React.FC<SearchProps> = ({ initialData }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<Task[]>(initialData || []);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Состояние для открытия модального окна

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await searchTasks(searchTerm); // Выполняем запрос к API
      setResults(data);
      if (data.length > 0) {
          setIsModalOpen(true);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Ошибка при поиске');
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    setIsModalOpen(false); // Закрываем модальное окно
  };

  return (
    <>
      <Input
        type="search"
        placeholder="Поиск..."
        className="hmd:w-[100px] lg:w-[300px]"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Button
        onClick={handleSearchSubmit}
        disabled={loading}
      >
        {loading ? 'Поиск...' : 'Поиск'}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      
      {/* Ображения результатов */}
      <Modal isOpen={isModalOpen} close={close} title="Результаты поиска">
  <div className="p-2">
    {results.length > 0 ? (
      <ul className="list-disc pl-5">
        {results.map((item) => (
          <li key={item.id} className="mb-5">
            <span className="font-semibold">{item.title}</span> - <span>{item.description}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">К сожалению, никаких результатов не найдено.</p>
    )}
    <Button
      onClick={close}
    >
      Закрыть
    </Button>
  </div>
</Modal>
    </>
  );
};

export default Search;
