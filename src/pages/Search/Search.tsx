import { Autocomplete } from "../../components/Autocomplete/Autocomplete";
import { AutocompleteNative } from "../../components/AutocompleteNative/AutocompleteNative";
import { useGetCountryNameList } from "../../hooks/useGetCountryNameList";
import { StyledSearch } from "./Search.styled";

const Search = () => {
  const { countryNameList } = useGetCountryNameList();

  return (
    <StyledSearch>
      <h1>Countries around the World!</h1>
      <Autocomplete
        items={countryNameList}
        label="Select a country:"
        placeholder="Country name..."
      />

      <h3>
        Do you know there is a <strong>NATIVE</strong> Autocomplete? 🤯
      </h3>
      <AutocompleteNative
        items={countryNameList}
        label="Select a country:"
        placeholder="Country name..."
      />
    </StyledSearch>
  );
};

export { Search };
