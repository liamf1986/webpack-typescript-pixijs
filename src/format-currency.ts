import * as accounting from 'accounting';

export interface ICurrencySettings extends accounting.CurrencySettings<string> {
    unitDivider: number;
    roundOnWholeUnits?: boolean;
    subunit?: {
        symbol: string;
        format: string;
    };
    // precision: number;
}

export interface IDefaultCurrencies {
    [index: string]: ICurrencySettings;
    GBP: ICurrencySettings;
}

export const CURRENCY_DEFAULTS: IDefaultCurrencies = {
    GBP: {
        symbol: '£',
        format: '%s%v',
        decimal: '.',
        thousand: ',',
        precision: 2,
        unitDivider: 100,
        subunit: {
            symbol: 'p',
            format: '%v%s',
        },
        roundOnWholeUnits: true,
    },
};

export function formatCurrency(subunits: number, currencySettings: ICurrencySettings, returnSubUnits: boolean = true): string {
    const settings = Object.assign({}, currencySettings);
    const subunitSettings = currencySettings.subunit;

    if (returnSubUnits) {
        if (!subunitSettings) {
            throw new Error('Currency Settings Missing Subunit');
        }

        if (subunits < settings.unitDivider) {
            return `${subunitSettings.format}`.replace('%s', subunitSettings.symbol).replace('%v', `${subunits}`);
        }
    }

    if (settings.roundOnWholeUnits && !(subunits % settings.unitDivider)) {
        settings.precision = 0;
    }

    return `${accounting.formatMoney((subunits / settings.unitDivider), settings)}`;
}