export const TicketStatus = {
  New: 0,
  UserReply: 1,
  InProgress: 2,
  AdminReply: 3,
  Closed: 4,
  All: null,
};

export const TicketSortBy = {
  Id: 0,
  CreatedAt: 1,
  LastActivity: 2,
};

export type TicketsHeaderType = "All" | "AdminReply" | "New";
