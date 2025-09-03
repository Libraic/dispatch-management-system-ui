import * as React from "react";
import { Button } from "./Button.tsx";

export const ConfirmationModal: React.FC<{
  showModal: boolean;
  positiveAction: () => void;
  intermediaryAction: () => void;
  negativeAction: () => void;
}> = ({ showModal, positiveAction, intermediaryAction, negativeAction }) => {
  return (
    showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="flex flex-col justify-center items-center bg-white rounded-xl shadow-lg p-6 w-80">
          <h2 className="text-xl font-lato font-bold mb-2">Quit</h2>
          <p className="text-gray-600 mb-4 font-lato">
            Do you want to save the changes before leaving?
          </p>
          <div className="flex flex-row gap-x-4">
            <Button label="Yes" action={positiveAction} />
            <Button label="Discard" action={intermediaryAction} />
            <Button label="No" action={negativeAction} />
          </div>
        </div>
      </div>
    )
  );
};
