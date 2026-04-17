import { SYSTEM_FONT_LIGHT } from "#/tailwind/tailwind-font-vars";

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center gap-x-2 mb-5">
      <p className={`${SYSTEM_FONT_LIGHT} text-[0.85rem]`}>
        Your request is being processed. Please, wait
      </p>
      <div className="w-5 h-5 border-2 border-gray-300 border-t-system-gray rounded-full animate-spin" />
    </div>
  );
};
