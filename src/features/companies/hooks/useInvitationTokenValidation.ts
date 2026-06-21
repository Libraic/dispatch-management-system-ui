import { useEffect, useState } from "react";
import { validateToken } from "#/features/companies/api/companies.api";

export const useInvitationTokenValidation = (
  invitationToken: string | null,
  showToast: (message: string) => void,
) => {
  const [isInvitationTokenValid, setIsInvitationTokenValid] = useState(false);

  useEffect(() => {
    let shouldUpdate = true;

    const validate = async () => {
      const response = await validateToken(invitationToken);
      if (!shouldUpdate) {
        return;
      }

      if (!response.ok) {
        showToast(response.error.message);
        setIsInvitationTokenValid(false);
        return;
      }

      setIsInvitationTokenValid(true);
    };

    validate().then(() => {});

    return () => {
      shouldUpdate = false;
    };
  }, [invitationToken, showToast]);

  return isInvitationTokenValid;
};
