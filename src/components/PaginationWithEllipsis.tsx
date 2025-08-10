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
        <PaginationItem key="prev">
          <PaginationPrevious disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
        </PaginationItem>

        {
          makePaginationItemRepresentations({ currentPage, totalPages })
            .map(paginationItem => renderPaginationWithEllipsisRepr({ currentPage, setCurrentPage, paginationItem }))
        }

        <PaginationItem key="next">
          <PaginationNext disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function renderPaginationWithEllipsisRepr({
  currentPage,
  setCurrentPage,
  paginationItem
}: Pick<PaginationWithEllipsisProps, "currentPage" | "setCurrentPage"> & {
  paginationItem: PaginationItemRepresentation
}) {
  if (paginationItem === "pre_ellipsis" ||
      paginationItem === "post_ellipsis") {
    return <PaginationItem key={paginationItem}>
      <PaginationEllipsis />
    </PaginationItem>;
  }
  if (paginationItem === currentPage) {
    return <PaginationItem key={'active'}>
      <PaginationLink isActive>{paginationItem}</PaginationLink>
    </PaginationItem>;
  }
  return <PaginationItem key={paginationItem}>
    <PaginationLink onClick={() => setCurrentPage(paginationItem)}>{paginationItem}</PaginationLink>
  </PaginationItem>;
}

function makePaginationItemRepresentations({ currentPage, totalPages }: Pick<PaginationWithEllipsisProps, "currentPage" | "totalPages">): PaginationItemRepresentation[] {
  if (totalPages <= 7) {
    return [1, 2, 3, 4, 5, 6, 7];
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "post_ellipsis", totalPages];
  } else if (currentPage >= totalPages - 3) {
    return [1, "pre_ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  } else {
    return [1, "pre_ellipsis", currentPage - 1, currentPage, currentPage + 1, "post_ellipsis", totalPages];
  }
}
