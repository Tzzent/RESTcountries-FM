import ICountryCard from "./ICountryCard";

export default interface ICountryDetails extends ICountryCard {
  nativeName: string,
  subregion: string,
  topLevelDomain: string[],
  currencies: object[],
  languages: object[],
  borders: Array<string>,
};
