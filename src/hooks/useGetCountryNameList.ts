import { useEffect, useState } from "react";
import { Country } from "../types/country";

const useGetCountryNameList = () => {
  const [countryNameList, setCountryNameList] = useState<string[]>([]);

  useEffect(() => {
    const countriesURL: string = `${process.env.REACT_APP_API_BASE_URL}/all?fields=name`;

    (async () => {
      try {
        const response = await fetch(countriesURL);
        const data: Country[] = await response.json();
        const countryNameList: string[] = data?.map(({ name }) => name);
        setCountryNameList(countryNameList);
      } catch (e: any) {
        setCountryNameList([]);
      }
    })();
  }, []);

  return { countryNameList };
};

export { useGetCountryNameList };
