import { Pagination, PaginationProps } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { ClienteContext } from '../../context/ClienteContext';

export const CustomPagination: React.FC<PaginationProps> = () => {
  const { paginacion, handleObtenerClientes } = useContext(ClienteContext);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log(currentPage);
    handleObtenerClientes(currentPage);
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage !== paginacion.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Pagination className="justify-content-end">
      <Pagination.Prev onClick={() => prevPage()} />
      <Pagination.Next onClick={() => nextPage()} />
    </Pagination>
  );
};
