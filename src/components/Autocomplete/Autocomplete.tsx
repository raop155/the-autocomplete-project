import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import {
  StyledAutocomplete,
  StyledAutocompleteContent,
} from "./Autocomplete.styled";
import { Suggestion } from "./Autocomplete.types";
import { useDebounce } from "../../hooks/useDebounce";

interface Props {
  items: string[];
  label?: string;
  placeholder?: string;
}

const Autocomplete = ({ items, label, placeholder }: Props) => {
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string>(inputValue, 500);
  const [isSuggestionsVisible, setIsSuggestionsVisible] =
    useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<Suggestion[]>([]);

  useEffect(() => {
    const inputValueTrimmed: string = debouncedSearchTerm.trim();
    const valueLength: number = inputValueTrimmed.length;

    if (!inputValueTrimmed) return setFilteredItems([]);

    const getMatchWordList = (
      items: string[],
      inputValue: string
    ): string[] => {
      return items?.filter((item: string) => {
        const itemLowerCase: string = item.toLowerCase();
        const valueLowerCase: string = inputValue.toLowerCase();
        return item !== inputValue && itemLowerCase.includes(valueLowerCase);
      });
    };

    const highlightSearchWord = (
      items: string[],
      inputValue: string
    ): Suggestion[] => {
      return items?.map((word: string) => {
        const index: number = word
          .toLowerCase()
          .indexOf(inputValue.toLowerCase());

        const originalSubString: string = word.slice(
          index,
          index + valueLength
        );
        const wordArray: string[] = word.split("");
        wordArray.splice(
          index,
          valueLength,
          `<strong>${originalSubString}</strong>`
        );
        const wordHighlighted: string = wordArray.join("");

        return { word: wordHighlighted, originalWord: word };
      });
    };

    const matchList: string[] = getMatchWordList(items, inputValueTrimmed);
    const highlightedList: Suggestion[] = highlightSearchWord(
      matchList,
      inputValueTrimmed
    );

    setFilteredItems(highlightedList);
  }, [items, debouncedSearchTerm]);

  const handleSelectedWord = (word: string) => {
    setInputValue(word);
    setIsSuggestionsVisible(false);
  };

  return (
    <StyledAutocomplete>
      {label && <label htmlFor="autocomplete-input">{label}</label>}

      <StyledAutocompleteContent
        onBlur={(event: FocusEvent<HTMLDivElement>) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsSuggestionsVisible(false);
          }
        }}
      >
        <input
          id="autocomplete-input"
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onFocus={() => setIsSuggestionsVisible(true)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
          }}
        />
        {/* 
        dangerouslySetInnerHTML 
          Taking into consideration this is a bad practice.
          I am using this for sake of velocity, assuming that will not break any security gap
          and the content renderer inside this <li> is controlled by us.
      */}
        <ul>
          {isSuggestionsVisible && filteredItems?.length > 0 && (
            <>
              {filteredItems.map(({ originalWord, word }: Suggestion) => (
                <li
                  className="suggestion"
                  key={originalWord}
                  tabIndex={0}
                  dangerouslySetInnerHTML={{ __html: word }}
                  onClick={() => handleSelectedWord(originalWord)}
                  onKeyPress={(e: KeyboardEvent<HTMLLIElement>) => {
                    if (e.key === "Enter") {
                      handleSelectedWord(originalWord);
                    }
                  }}
                ></li>
              ))}
            </>
          )}
        </ul>
      </StyledAutocompleteContent>
    </StyledAutocomplete>
  );
};

export { Autocomplete };
