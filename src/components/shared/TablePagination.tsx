import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function TablePagination({
  currentPage,
  perPage,
  searchParams,
  total,
  route,
}: {
  total: number;
  perPage: number;
  route: string;
  currentPage: number;
  searchParams: {
    [key: string]: string;
  };
}) {
  const totalPages = Math.ceil(total / perPage);

  const oldParams = new URLSearchParams(searchParams)
    .toString()
    .split("&")
    .filter((item) => item.includes("="))
    .map((item) => {
      return item.split("=");
    })
    .filter((item) => item[0] !== "page");
  const params = new URLSearchParams(oldParams).toString();
  return (
    <Pagination dir="ltr">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${currentPage === 1 && "text-[rgba(125,125,125,1)]"}`}
            isDisabled={currentPage > 1 ? false : true}
            href={`${route}?${params}&page=${
              currentPage > 1 ? currentPage - 1 : currentPage
            }`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={`${route}?${params}&page=${currentPage}`}
            isActive
          >
            {currentPage.toLocaleString("fa-IR")}
          </PaginationLink>
        </PaginationItem>
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem>
          <PaginationNext
            isDisabled={
              currentPage === totalPages || totalPages === 0 ? true : false
            }
            className={`${
              currentPage === totalPages && "text-[rgba(125,125,125,1)]"
            }`}
            href={`${route}?${params}&page=${
              currentPage < totalPages ? currentPage + 1 : currentPage
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
