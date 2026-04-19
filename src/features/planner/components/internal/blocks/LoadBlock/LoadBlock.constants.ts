import type { LoadBlockStyleRecord } from "#/features/planner/components/internal/blocks/LoadBlock/LoadBlock.types";

export const LOAD_STATUS_COLORS: LoadBlockStyleRecord = {
  Booked: {
    textColor: "text-[#2F5FA8]",
    backgroundColor: "bg-[#E6F0FF]",
    borderColor: "border-[#2F5FA8]",
  },
  Dispatched: {
    textColor: "text-[#6B4FD3]",
    backgroundColor: "bg-[#EDE9FE]",
    borderColor: "border-[#6B4FD3]",
  },
  Transit: {
    textColor: "text-[#B7791F]",
    backgroundColor: "bg-[#FFF4D6]",
    borderColor: "border-[#B7791F]",
  },
  Delivered: {
    textColor: "text-[#2F855A]",
    backgroundColor: "bg-[#E6F7EF]",
    borderColor: "border-[#2F855A]",
  },
  "Docs Sent": {
    textColor: "text-[#7E22CE]",
    backgroundColor: "bg-[#F3E8FF]",
    borderColor: "border-[#7E22CE]",
  },
  Invoiced: {
    textColor: "text-[#C53030]",
    backgroundColor: "bg-[#FFE9EC]",
    borderColor: "border-[#C53030]",
  },
  Paid: {
    textColor: "text-[#0F766E]",
    backgroundColor: "bg-[#E6FBF4]",
    borderColor: "border-[#0F766E]",
  },
};
