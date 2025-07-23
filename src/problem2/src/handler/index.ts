import tokens from '../__mocks__/tokens.json';
import prices from '../__mocks__/prices.json';
import { removeExt } from '@utils';

const fetchTokenPrices = async () => prices;
const fetchTokens = async () => tokens;

export const filterAvailableTokens = async (): Promise<(PriceSchema & TokenSchema)[]> => {
  let tokenList: (PriceSchema & TokenSchema)[] = [];

  try {
    const tokensPrice = await fetchTokenPrices() as PriceSchema[];
    const tokensData = await fetchTokens() as TokenSchema[];

    for (let i = 0; i <= tokensPrice.length; i++) {
      const token = tokensPrice[i];

      if (!!token.price) {
        const tokenData = tokensData.find(t => {
          const label = removeExt(t.name);
          return label === token.currency;
        });
        if (!!tokenData) {
          tokenList.push({ ...tokenData, ...token });
        }
      }
    }
  } catch(e) {
    // console.error(e);
  }

  // Remove duplicates by token.currency
  const uniqueTokens = Array.from(
    new Map(tokenList.map(item => [item.currency, item])).values()
  );
  return uniqueTokens;
}