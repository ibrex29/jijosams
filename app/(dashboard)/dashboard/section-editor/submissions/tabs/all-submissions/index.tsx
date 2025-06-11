"use client";

import useFetchSEManuscripts from "@/app/(dashboard)/hooks/useFetchSEManuscripts";

import ManuscriptsDisplay from "../../components/card";

const SEManuscriptTab: React.FC = () => {
  const { manuscripts, isFetching, availableManuscripts, refetch } =
    useFetchSEManuscripts();

  return (
    <ManuscriptsDisplay
      manuscripts={manuscripts}
      isFetching={isFetching}
      availableManuscripts={availableManuscripts}
      refetch={refetch}
    />
  );
};

export default SEManuscriptTab;
