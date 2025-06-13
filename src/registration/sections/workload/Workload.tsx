import { RegistrationSectionHeader } from "../../RegistrationSectionHeader.tsx";
import { AddWorkload } from "./AddWorkload.tsx";
import * as React from "react";
import { useEffect, useState } from "react";
import type { RegistrationData } from "../../../types/authentication.ts";
import { fetchCompanies } from "../../../service/companyService.ts";
import type { CompanyData } from "../../../types/api-types.ts";
import { FETCH_COMPANIES_IN_BATCHES } from "../../../utils/api-paths.ts";
import { PAGE_NEXT_ELEMENT } from "../../../utils/global-constants.ts";
import { usePagination } from "../../../hooks/usePagination.ts";

export const Workload: React.FC<{
  registrationData: RegistrationData;
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>;
}> = ({ registrationData, setRegistrationData }) => {
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const pagination = usePagination(FETCH_COMPANIES_IN_BATCHES);

  const loadCompanies = (append: boolean) => {
    if (!pagination.getNextUrl()) return;

    fetchCompanies(pagination.getNextUrl() as string)
      .then((data) => {
        const next = data.links.find((link) => link.rel === PAGE_NEXT_ELEMENT);
        pagination.setNextUrl(next?.href || null);
        setCompanies((prev) =>
          append ? [...prev, ...data.content] : data.content,
        );
      })
      .catch(console.error)
      .finally(() => pagination.setLoadNext(false));
  };

  // When the component is mounted, we only want to fetch a page of the default size.
  // We use that page to set the necessary data, in case the user wants to
  // see more companies (but that is not guaranteed; maybe he will find his desired
  // companies in the initial ones that were fetched). Therefore, we do not need
  // any dependency here because this will be run only once, on mounting.
  useEffect(() => {
    loadCompanies(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If the user decides to see the next elements, this useEffect() hook will be
  // invoked and will be tied to loadNext state only, because nextUrl is just
  // an intermediary state variable to hold the URL of the next API call, so
  // we do all the necessary computation in one go. But it should not affect
  // the re-render. The re-render is only affected by loadNext state variable,
  // which tells React that the user requested another batch of elements.
  useEffect(() => {
    if (pagination.shouldLoadNext()) loadCompanies(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.shouldLoadNext()]);

  return (
    <div>
      <RegistrationSectionHeader
        header="Workload"
        subheader="The working area of the employee"
      />
      <AddWorkload
        registrationData={registrationData}
        setRegistrationData={setRegistrationData}
        companies={companies}
        pagination={pagination}
      />
    </div>
  );
};
