import { StyledAutocompleteNative } from "./AutocompleteNative.styled";

interface Props {
  items: string[];
  label?: string;
  placeholder?: string;
}

const AutocompleteNative = ({ items, label, placeholder }: Props) => {
  return (
    <StyledAutocompleteNative>
      {label && <label htmlFor="autocomplete-native-input">{label}</label>}
      <input
        list="autocomplete-native-list"
        name="autocomplete-native-input"
        id="autocomplete-native-input"
        placeholder={placeholder}
      />
      <datalist id="autocomplete-native-list">
        {items?.length > 0 &&
          items.map((word) => <option key={word} value={word} />)}
      </datalist>
    </StyledAutocompleteNative>
  );
};

export { AutocompleteNative };
