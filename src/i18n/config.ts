import i18n from "i18next";
import vi from "./vi";
import {initReactI18next} from "react-i18next";

export const resources = {
    vi: {
        translation: vi
    }
} as const;

i18n.use(initReactI18next).init({
    lng: 'vi',
    resources
});