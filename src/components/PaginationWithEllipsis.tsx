import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

interface PaginationWithEllipsisProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

type PaginationItemRepresentation = number | "pre_ellipsis" | "post_ellipsis";

export default function PaginationWithEllipsis({ currentPage, setCurrentPage, totalPages }: PaginationWithEllipsisProps) {
  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem key="prev">
            <PaginationPrevious href="#" onClick={() => setCurrentPage(currentPage - 1)} />
          </PaginationItem>
        )}

        {
          makePaginationItemRepresentations({ currentPage, totalPages })
            .map(paginationItem => renderPaginationWithEllipsisRepr({ currentPage, setCurrentPage, paginationItem }))
        }

        {currentPage < totalPages && (
          <PaginationItem key="next">
            <PaginationNext href="#" onClick={() => setCurrentPage(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

function renderPaginationWithEllipsisRepr({ currentPage, setCurrentPage, paginationItem }: { currentPage: number; setCurrentPage: (page: number) => void; paginationItem: PaginationItemRepresentation }) {
  if (paginationItem === "pre_ellipsis" ||
      paginationItem === "post_ellipsis") {
    return <PaginationItem key={paginationItem}>
      <PaginationEllipsis />
    </PaginationItem>;
  }
  if (paginationItem === currentPage) {
    return <PaginationItem key={paginationItem}>
      <PaginationLink href="#" isActive>{paginationItem}</PaginationLink>
    </PaginationItem>;
  }
  return <PaginationItem key={paginationItem}>
    <PaginationLink href="#" onClick={() => setCurrentPage(paginationItem)}>{paginationItem}</PaginationLink>
  </PaginationItem>;
}

function makePaginationItemRepresentations({ currentPage, totalPages }: Pick<PaginationWithEllipsisProps, "currentPage" | "totalPages">): PaginationItemRepresentation[] {
  const result: PaginationItemRepresentation[] = []

  if (currentPage > 1) {
    result.push(1)
  }
  if (currentPage >= 4) {
    result.push(currentPage === 4 ? 2 : "pre_ellipsis")
  }
  if (currentPage > 2) {
    result.push(currentPage - 1)
  }

  result.push(currentPage)

  if (currentPage < totalPages - 1) {
    result.push(currentPage + 1)
  }
  if (currentPage <= totalPages - 3) {
    result.push(currentPage === totalPages - 3 ? totalPages - 1 : "post_ellipsis")
  }
  if (currentPage < totalPages) {
    result.push(totalPages)
  }

  return result
}