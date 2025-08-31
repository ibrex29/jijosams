import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getREManuscript } from "@/app/api/manuscript";
import { ManuscriptProps } from "@/types"; 

const useFetchManuscripts = () => {
  const [manuscripts, setManuscripts] = React.useState<ManuscriptProps[]>([]);

  const { data, isFetching, refetch } = useQuery<ManuscriptProps[]>({
    queryKey: ["manuscripts"],
    queryFn: getREManuscript,
    staleTime: 120000,
  });

  React.useEffect(() => {
    if (data) {
      setManuscripts(data);
      console.log("Fetched manuscripts:", data);
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
