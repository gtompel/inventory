
import React from "react";
import Modal from "../ui/modal";
import { Table, TableRow, TableCell, TableBody } from "../ui/table";
import StatusBullet from "../StatusBullet";
import { Task } from "@prisma/client";
import { getDate } from "@/utils/getDate";
import { TaskStatus } from "../task-form/schema";

interface SearchModalProps {
  isOpen: boolean;
  close: () => void;
  results: Task[];
  noResults: boolean;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, close, results, noResults }) => {
  return (
    <Modal close={close} title="Результаты поиска" isOpen={isOpen}>
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
  );
};

export default SearchModal;
