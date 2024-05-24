import { ActiveLanguages } from '@renderer/app/config/ActiveLanguages';
import { LanguageContext } from '@renderer/app/contexts/LanguageContext';
import { useContext } from 'react';

const LanguageSelect = () => {
    const { changeLanguage } = useContext(LanguageContext);
    
    const handleChange = (event) => {
        const selectedKey = event.target.value;
        if (ActiveLanguages[selectedKey]) {
            console.log(ActiveLanguages[selectedKey].name);
            changeLanguage(ActiveLanguages[selectedKey]); // Corrigido para chamar setLanguage corretamente
        }
    };

    return (
        <select onChange={handleChange}>
            {Object.entries(ActiveLanguages).map(([key, language]) =>
                language && (
                    <option key={key} value={key}>
                        {language.name}
                    </option>
                )
            )}
        </select>
    );
};

export default LanguageSelect;
