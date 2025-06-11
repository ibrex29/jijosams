import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getREManuscript } from "@/app/api/manuscript";
import { ManuscriptProps } from "@/app/types"; // Ensure this is the correct type

const useFetchManuscripts = () => {
  const [manuscripts, setManuscripts] = React.useState<ManuscriptProps[]>([]);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["manuscripts"],
    queryFn: getREManuscript,
    staleTime: 120000,
  });

  React.useEffect(() => {
    if (data) {
      setManuscripts(data.Manuscript);
      console.log("Fetched manuscripts:", data.Manuscript);
    }
  }, [isFetching, data]);

  const availableManuscripts = manuscripts?.length > 0;

  return {
    manuscripts,
    isFetching,
    availableManuscripts,
    refetch,
  };
};

export default useFetchManuscripts;
