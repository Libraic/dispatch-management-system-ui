import { ToastProvider } from "#/ui/Toast/ToastProvider";
import { AppRoutes } from "#/ui/AppRoutes";

export const App = () => {
  return (
    <ToastProvider>
      <AppRoutes />
    </ToastProvider>
  );
};
