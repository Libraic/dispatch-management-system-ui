import { ToastProvider } from "#/ui/Toast/ToastProvider";
import { AppRoutes } from "#/ui/Routes/AppRoutes";

export const App = () => {
  return (
    <ToastProvider>
      <AppRoutes />
    </ToastProvider>
  );
};
