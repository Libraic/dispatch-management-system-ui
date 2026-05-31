import { type FC, Fragment, useContext, useState } from "react";
import {
  HOVER_BACKGROUND_NORMAL_COLOR,
  HOVER_BORDER_B_NORMAL_COLOR,
  ODD_BACKGROUND_LIGHT_GRAY,
} from "#/shared/constants/tailwind/tailwindColors.constants";
import type { Load } from "#/features/loads/components/View/view.types";
import { LoadsTableContext } from "#/features/loads/context/LoadsTableContext";
import { TableCell } from "#/ui/Table/public/TableCell";
import { STYLES } from "#/features/loads/components/View/ui/LoadsRow/LoadsRow.constants";
import { BLANK_STRING } from "#/constants/common/global-constants";
import { Checkbox } from "#/ui/Checkbox/Checkbox";

type LoadsRowProps = {
  load: Load;
};

export const LoadsRow: FC<LoadsRowProps> = ({ load }) => {
  const context = useContext(LoadsTableContext)!!;
  const [checked, setChecked] = useState(false);
  return (
    <Fragment>
      <div
        className={`
          grid items-center h-[2.75rem] px-[2rem]
          ${ODD_BACKGROUND_LIGHT_GRAY} ${HOVER_BACKGROUND_NORMAL_COLOR} ${HOVER_BORDER_B_NORMAL_COLOR}
          font-normal text-[0.85rem] hover:text-white w-fit`}
        style={{
          gridTemplateColumns: context.layout,
        }}
      >
        <Checkbox checked={checked} onChange={setChecked} />
        {context.columns
          .filter((x) => x.label !== BLANK_STRING)
          .map((col) => (
            <TableCell
              key={col.key}
              data={load[col.key as keyof Load]}
              styles={STYLES[col.key]?.(load[col.key as keyof Load])}
            />
          ))}
      </div>
    </Fragment>
  );
};
