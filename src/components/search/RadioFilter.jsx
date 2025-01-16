import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useNavigate, useParams } from 'react-router-dom';

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme }) => ({
    variants: [
      {
        props: { checked: true },
        style: {
          '.MuiFormControlLabel-label': {
            color: '#013A93',
          },
        },
      },
    ],
  })
);

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {
  value: PropTypes.any,
};

export default function RadioFilter() {
  const navigate = useNavigate();
  const { filter } = useParams();
  const defaultFilter = filter || "subject";

  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    navigate(`/search/${selectedValue}`);
  };

  return (
    <RadioGroup
      name="use-radio-group"
      value={defaultFilter}
      onChange={handleRadioChange}
    >
      <MyFormControlLabel value="subject" label="Disciplinas" control={<Radio />} />
      <MyFormControlLabel value="books" label="Livros" control={<Radio />} />
    </RadioGroup>
  );
}
