"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Task } from "@prisma/client";
import Modal from "../ui/modal";
import StatusBullet from "../StatusBullet";
import { Table, TableRow, TableCell, TableBody } from "../ui/table";
import { getDate } from "@/utils/getDate";
import { searchTasks } from "@/service/task";
import { TaskStatus } from "../task-form/schema";

interface Props {
  task?: Task;
}

interface FormData {
  searchTerm: string;
}

const Search: React.FC<Props> = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [results, setResults] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
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
    reset();
  };

  return (
    <div >
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

      {isModalOpen && (
        <Modal close={close} title="Результаты поиска" isOpen={isModalOpen} >
          {noResults ? (
            <p className="text-center">Не найдено результатов.</p>
          ) : (
            <Table className='w-full h-full'>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>{result.title}</TableCell>
                    <TableCell>{result.description}</TableCell>
                    <TableCell>
                      {result.status ? (
                        <StatusBullet status={result.status as TaskStatus} />
                      ) : (
                        <span>No Status</span>
                      )}
                    </TableCell>
                    <TableCell>{getDate(result.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Search;