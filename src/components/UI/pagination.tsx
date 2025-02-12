import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  isDisabled?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<typeof Link>;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <PaginationItem>
    <Link
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  </PaginationItem>
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  isDisabled,
  ...props
}: React.ComponentProps<typeof PaginationLink>) =>
  isDisabled ? (
    <span
      aria-label="Go to previous page"
      size="default"
      className={cn(
        buttonVariants({
          variant: isDisabled ? "ghost" : "outline",
          className:
            "gap-1 pl-2.5 hover:select-none hover:bg-inherit hover:text-[rgba(125,125,125,1)]",
        }),
        className
      )}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>قبلی</span>
    </span>
  ) : (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 pl-2.5", className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>قبلی</span>
    </PaginationLink>
  );
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  isDisabled,
  ...props
}: React.ComponentProps<typeof PaginationLink>) =>
  isDisabled ? (
    <span
      aria-label="Go to next page"
      size="default"
      className={cn(
        buttonVariants({
          variant: isDisabled ? "ghost" : "outline",
          className:
            "gap-1 pl-2.5 bg-inherit text-[rgba(125,125,125,1)] hover:select-none hover:bg-inherit hover:text-[rgba(125,125,125,1)]",
        }),
        className
      )}
      {...props}
    >
      <span>بعدی</span>
      <ChevronRight className="h-4 w-4" />
    </span>
  ) : (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 pr-2.5", className)}
      {...props}
    >
      <span>بعدی</span>
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">صفحات بیشتر</span>
  </span>
);

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
