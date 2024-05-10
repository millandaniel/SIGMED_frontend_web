import React from 'react';
import Select from 'react-select';

const MultiSelectCheckboxDropdown = ({ options, selectedOptions, onChange }) => {
    return (
        <Select
            options={options}
            isMulti
            value={selectedOptions}
            onChange={onChange}
            placeholder="Seleccione opciones..."
            isSearchable
            className="multi-select-checkbox-dropdown" // Agregar clase CSS
        />
    );
};

export default MultiSelectCheckboxDropdown;