import { ActiveLanguages } from '@renderer/app/config/ActiveLanguages';
import { StaticConfig } from '@renderer/app/config/config';
import { LanguageContext } from '@renderer/app/contexts/LanguageContext';
import { useContext } from 'react';
import { FormSelect } from '../layout/form/FormComponents';

const LanguageSelect = () => {
    const {language} = useContext(LanguageContext)

    const handleChange = (event) => {
        const selectedKey = event.target.value;
        localStorage.setItem(StaticConfig.languageKeyString,selectedKey)
        window.location.reload()
    };

    return (
        <FormSelect onChange={handleChange}>
            {Object.entries(ActiveLanguages).map(([key, Language]) =>
                Language.name === language.name && (
                    <option key={key} value={key} selected>
                        {Language.name}
                    </option>
                ) ||
                Language && (
                    <option key={key} value={key}>
                        {Language.name}
                    </option>
                )
            )}
        </FormSelect>
    );
};

export default LanguageSelect;
