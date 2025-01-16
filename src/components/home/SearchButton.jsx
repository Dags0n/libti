import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Stack,
  styled
} from '@mui/material';
import axios from 'axios';
import debounce from 'lodash.debounce';
import SelectionToggleButton from './SelectionSearch';

const StyledContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledSearchField = styled('input')(() => ({
  padding: '14px',
  borderRadius: '15px 0 0 15px',
  border: '1px solid #013A93',
  color: '#013A93',
  outline: 'none',
  '&.placeholder': {
    color: '#013A93',
  },
}));

const StyledButton = styled('button')(() => ({
  padding: '15px',
  borderRadius: '0 15px 15px 0',
  border: 'none',
  backgroundColor: '#013A93',
  color: 'white',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#507AC2',
  },
}));

export default function SearchButton() {
  const [inputValue, setInputValue] = useState("");
  const [toggleValue, setToggleValue] = useState("subject");
  const [results, setResults] = useState([]);

  const filteredOptions =
    inputValue.length >= 3
      ? results.map((option) => option.title ?? option.name)
      : [];

  const fetchBooks = async (toggleValue, input) => {
    try {
      const response = await axios.get(`http://localhost:3000/${toggleValue}/search/${input}`);
      setResults(response.data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  const debouncedFetchBooks = debounce(fetchBooks, 500);

  useEffect(() => {
    if (inputValue.length >= 3) {
      debouncedFetchBooks(toggleValue, inputValue);
    }
  }, [inputValue, debouncedFetchBooks, toggleValue]);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (inputValue.length < 3) return;

    window.location.href = `/search/${toggleValue}?${inputValue}`;
  };

  return (
    <Stack
      spacing={2}
      sx={{
        width: { xs: "80%", sm: "70%", md: "60%" },
        alignSelf: "center",
        justifySelf: "center",
        marginX: "auto",
        paddingTop: { xs: "20%", sm: "10%", md: "5%" },
      }}
    >
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={filteredOptions}
        onInputChange={(event, value) => setInputValue(value)}
        renderInput={(params) => (
          <form method="GET" onSubmit={handleSearch}>
            <SelectionToggleButton
              value={toggleValue}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  setToggleValue(newValue);
                }
              }}
            />
            <StyledContainer ref={params.InputProps.ref}>
              <StyledSearchField
                type="search"
                {...params.inputProps}
                placeholder="Pesquise no LIBTI"
              />
              <StyledButton type="submit">
                Buscar
              </StyledButton>
            </StyledContainer>
          </form>
        )}
      />
    </Stack>
  );
}
