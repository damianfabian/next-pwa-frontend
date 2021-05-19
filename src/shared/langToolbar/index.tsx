import { MenuItem, Select } from '@material-ui/core';
import { languages } from 'config';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface ILangToolbarProps {
}

const LangToolbar: React.FunctionComponent<ILangToolbarProps> = () => {

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) : void => {
        i18n.changeLanguage(event.target.value as string);
    }
    const { t, i18n } = useTranslation();

    return <Toolbar>
        {t('Language')} <Select
          id="lang-select"
          value={i18n.language?.toLocaleUpperCase()}
          onChange={handleChange}
        >
        {
            languages.map(lng => {
                return <MenuItem key={lng.code} value={lng.code}>{lng.display}</MenuItem>
            })
        }
        </Select>
    </Toolbar>;
};

const Toolbar = styled.div`
display: inline-flex;
align-items: center;
justify-content: space-evenly;
`;

export default LangToolbar;
