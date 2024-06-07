import { ActiveThemes } from '@renderer/app/config/ActiveThemes';
import { StaticConfig } from '@renderer/app/config/config';
import { ThemeStyleContext } from '@renderer/app/contexts/ThemeStyleContext';
import { useContext } from 'react';

const ThemeSelect = () => {
    const {themeString} = useContext(ThemeStyleContext)

    const handleChange = (event) => {
        const selectedKey = event.target.value;
        localStorage.setItem(StaticConfig.themeKeyString,selectedKey)
        window.location.reload()
    };

    return (
        <select onChange={handleChange}>
            {Object.entries(ActiveThemes).map(([key, Theme]) =>
                Theme.name === themeString.name && (
                    <option key={key} value={key} selected>
                        {Theme.name}
                    </option>
                ) ||
                Theme && (
                    <option key={key} value={key}>
                        {Theme.name}
                    </option>
                )
            )}
        </select>
    );
};

export default ThemeSelect;
