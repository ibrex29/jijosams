"use client";

import useFetchAuthorManuscripts from "@/app/(dashboard)/hooks/useFetchAuthorManuscripts";

import ManuscriptsDisplay from "../../components/card";

const MyManuscriptTab: React.FC = () => {
  const { manuscripts, isFetching, availableManuscripts } =
    useFetchAuthorManuscripts();

  return (
    <ManuscriptsDisplay
      manuscripts={manuscripts}
      isFetching={isFetching}
      availableManuscripts={availableManuscripts}
    />
  );
};

export default MyManuscriptTab;
