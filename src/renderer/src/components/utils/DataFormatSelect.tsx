import { StaticConfig } from '@renderer/app/config/config';
import { useContext } from 'react';
import { FormSelect } from '../layout/form/FormComponents';
import { LanguageContext } from '@renderer/app/contexts/LanguageContext';
import { DataFormat } from '@renderer/app/enum/DataFormat';

const DataFormatSelect = () => {
    const {dataFormat} = useContext(LanguageContext)

    const handleChange = (event) => {
        const selectedKey = event.target.value;
        localStorage.setItem(StaticConfig.DataFormatString,selectedKey)
        window.location.reload()
    };

    return (
        <FormSelect onChange={handleChange}>
            {Object.entries(DataFormat).map(([key, format]) =>
                format === dataFormat.toString() && (
                    <option key={key} value={key} selected>
                        {format}
                    </option>
                ) ||
                format && (
                    <option key={key} value={key}>
                        {format}
                    </option>
                )
            )}
        </FormSelect>
    );
};

export default DataFormatSelect;
