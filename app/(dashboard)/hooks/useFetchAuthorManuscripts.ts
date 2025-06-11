import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getAuthorManuscripts } from "@/app/api/manuscript";
import { ManuscriptProps } from "@/app/types"; // Ensure this is the correct type

const useFetchManuscripts = () => {
  const [manuscripts, setManuscripts] = React.useState<ManuscriptProps[]>([]);

  const { data, isFetching } = useQuery({
    queryKey: ["manuscripts"],
    queryFn: getAuthorManuscripts,
    staleTime: 120000,
  });

  React.useEffect(() => {
    if (data) {
      setManuscripts(data);
    }
  }, [isFetching, data]);

  const availableManuscripts = manuscripts?.length > 0;

  return {
    manuscripts,
    isFetching,
    availableManuscripts,
  };
};

export default useFetchManuscripts;
