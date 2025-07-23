import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

interface PaginationWithEllipsisProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export default function PaginationWithEllipsis({ currentPage, setCurrentPage, totalPages }: PaginationWithEllipsisProps) {
  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={() => setCurrentPage(currentPage - 1)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => setCurrentPage(1)}>1</PaginationLink>
            </PaginationItem>
          </>
        )}

        {currentPage === 4 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => setCurrentPage(2)}>2</PaginationLink>
          </PaginationItem>
        )}

        {currentPage > 4 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href="#" isActive>{currentPage}</PaginationLink>
        </PaginationItem>

        {currentPage < totalPages - 1 &&  (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</PaginationLink>
          </PaginationItem>
        )}

        {currentPage === totalPages - 3 && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => setCurrentPage(totalPages - 1)}>{totalPages - 1}</PaginationLink>
          </PaginationItem>
        )}

        {currentPage < totalPages - 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage < totalPages && (
          <>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" onClick={() => setCurrentPage(currentPage + 1)} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}