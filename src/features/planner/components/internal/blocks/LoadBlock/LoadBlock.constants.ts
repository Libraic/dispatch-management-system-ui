import type { LoadStatus } from "#/types/internal/planner/planner-types";

export const LOAD_STATUS_COLORS: Record<
  LoadStatus,
  { textColor: string; backgroundColor: string }
> = {
  Booked: {
    textColor: "text-[#2F5FA8]",
    backgroundColor: "bg-[#E6F0FF]",
  },
  Dispatched: {
    textColor: "text-[#6B4FD3]",
    backgroundColor: "bg-[#EDE9FE]",
  },
  Transit: {
    textColor: "text-[#B7791F]",
    backgroundColor: "bg-[#FFF4D6]",
  },
  Delivered: {
    textColor: "text-[#2F855A]",
    backgroundColor: "bg-[#E6F7EF]",
  },
  "Docs Sent": {
    textColor: "text-[#7E22CE]",
    backgroundColor: "bg-[#F3E8FF]",
  },
  Invoiced: {
    textColor: "text-[#C53030]",
    backgroundColor: "bg-[#FFE9EC]",
  },
  Paid: {
    textColor: "text-[#0F766E]",
    backgroundColor: "bg-[#E6FBF4]",
  },
};
