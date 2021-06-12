import {useTranslation} from "react-i18next";

const useLocale = function () {
    const {t: trans} = useTranslation();

    return {trans};
}

export default useLocale;