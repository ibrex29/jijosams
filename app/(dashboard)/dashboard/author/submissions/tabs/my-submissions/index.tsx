"use client";

import useFetchAuthorManuscripts from "@/app/(dashboard)/hooks/useFetchAuthorManuscripts";

import ManuscriptsDisplay from "../../components/manuscript-display";

const MyManuscriptTab: React.FC = () => {
  const { manuscripts, isFetching, availableManuscripts } =
    useFetchAuthorManuscripts();
  console.log("MyManuscriptTab", manuscripts, isFetching, availableManuscripts);

  return (
    <ManuscriptsDisplay
      manuscripts={manuscripts}
      isFetching={isFetching}
      availableManuscripts={availableManuscripts}
    />
  );
};

export default MyManuscriptTab;
