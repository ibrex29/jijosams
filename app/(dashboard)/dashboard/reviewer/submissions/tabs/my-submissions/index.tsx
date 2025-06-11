"use client";

import useFetchREManuscripts from "@/app/(dashboard)/hooks/useFetchREManuscripts";

import ManuscriptsDisplay from "../../components/card";

const REManuscriptTab: React.FC = () => {
  const { manuscripts, isFetching, availableManuscripts } =
    useFetchREManuscripts();

  return (
    <ManuscriptsDisplay
      manuscripts={manuscripts}
      isFetching={isFetching}
      availableManuscripts={availableManuscripts}
    />
  );
};

export default REManuscriptTab;
