import './styles.scss';
import CookieConsent from '@kraftvaerk/cookieconsent';

(function () {
    const cookieConsent = new CookieConsent({
        cookieName: 'cookieConsent',
        btn: {
            accept: 'js-cookie-accept',
            close: 'js-cookie-close',
        },
        toggleClass: 'is-shown',
    });

    cookieConsent.init('#cookie-consent');
}());
