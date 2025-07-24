# Answer for Messy React

## Table of content
- [Answer for Messy React](#answer-for-messy-react)
  - [Table of content](#table-of-content)
  - [Quick start](#quick-start)
  - [1. Props type definition](#1-props-type-definition)
      - [Original](#original)
      - [Refactor](#refactor)
  - [2. Magic number \& `any` ?](#2-magic-number--any-)
      - [Original](#original-1)
      - [Refactor](#refactor-1)
  - [3. `sortedBalances` logical issue](#3-sortedbalances-logical-issue)
      - [Original](#original-2)
      - [Refactor](#refactor-2)
  - [4. Extend the WalletBalance interface](#4-extend-the-walletbalance-interface)
      - [Original](#original-3)
      - [Refactor](#refactor-3)
  - [5. In-correct type \& Memoize the components](#5-in-correct-type--memoize-the-components)
      - [Original](#original-4)
      - [Refactor](#refactor-4)
  - [6. Add fallback and use a meaningful prop name](#6-add-fallback-and-use-a-meaningful-prop-name)
      - [Original](#original-5)
      - [Refactor](#refactor-5)

## Quick start
You can found the question [here]('./QUESTION.md)  
Fully complete answer component can be found in [<NoMessyAnymore.tsx />](./NoMessyAnymore.tsx)

## 1. Props type definition

#### Original
```tsx
/*
  - Props? A poor meaning name
  - Since props structure should be static. It will prevent a lot side effects if you keep changing props structure. Refer `type`
*/
interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props; // "children" never be used -> Remove it
  /*
  .....
  */
}
```

#### Refactor
```tsx
type WalletPagePropsType = {};

const WalletPage: React.FC<WalletPagePropsType> = (props: WalletPagePropsType) => {
  const { <some_props_are_used> } = props;
  //...
}
```

## 2. Magic number & `any` ?

#### Original
```tsx
// "any" type? Why do you use Typescript? Go back to the primitive age pls
const getPriority = (blockchain: any): number => {
  switch (blockchain) {
    case 'Osmosis':
      return 100
    case 'Ethereum':
      return 50
    case 'Arbitrum':
      return 30
    case 'Zilliqa':
      return 20
    case 'Neo':
      return 20
    default:
      return -99 // Some magic number and I have no idea about it
  }
}
```

#### Refactor
```tsx
const getPriority = (blockchain: string): number => {
  case 'Osmosis':
  /*
  ...
  */
 default:
  return -1; // A common "error" number. Your priority can be worse but it is never negative
}
```

## 3. `sortedBalances` logical issue

#### Original
```tsx
const sortedBalances = useMemo(() => {
  return balances.filter((balance: WalletBalance) => {
    /*
      - "balancePriority" is defined but never be used
      - "WalletBalance" type doesn't contain "blockchain" property
    */
    const balancePriority = getPriority(balance.blockchain);
    if (lhsPriority > -99) { // where does "lhsPriority" come from ?
        if (balance.amount <= 0) { // Why do you wanna show negative balance? Don't let PO know about this
          return true;
        }
    }
    return false
  }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
    const leftPriority = getPriority(lhs.blockchain);
    const rightPriority = getPriority(rhs.blockchain);

    // Shorthand "return rightPriority - leftPriority" is enough
    if (leftPriority > rightPriority) {
      return -1;
    } else if (rightPriority > leftPriority) {
      return 1;
    }
  });
}, [balances, prices]); // prices is never used but function keeping re-calculate if prices are changed
```

#### Refactor
```tsx
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

const sortedBalances = useMemo(() => {
  return balances
    .filter((balance: WalletBalance) => {
      const { blockchain, amount } = balance;
      const priority = getPriority(blockchain);
      
      return priority >= 0 && amount >= 0; // balance amount AND priority are available
    })
    .sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const lhsPriory = getPriority(lhs.blockchain);
      const rhsPriory = getPriority(rhs.blockchain);

      return rhsPriory - lhsPriory;
    });
}, [balances]);
```

## 4. Extend the WalletBalance interface

#### Original
```tsx
interface WalletBalance {
  currency: string;
  amount: number;
}

interface FormattedWalletBalance { // It can extend WalletBalance
  currency: string;
  amount: number;
  formatted: string;
}
```

#### Refactor
```tsx
interface WalletBalance {
  currency: string;
  amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}
```

## 5. In-correct type & Memoize the components

#### Original

```tsx
/*
 - sortedBalances's type never be "FormattedWalletBalance" -> use formattedBalances instead sortedBalances
 - Re-render <WalletRow /> can be high cost. We should memoize it
 - We can memoize formattedBalances by using 'useCallback' too
*/

const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  return {
    ...balance,
    formatted: balance.amount.toFixed()
  }
})

const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
  const usdValue = prices[balance.currency] * balance.amount; // prices can be null or undefined if `usePrices` doesn't handle good enough
  return (
    <WalletRow 
      className={classes.row}
      key={index}
      amount={balance.amount}
      usdValue={usdValue}
      formattedAmount={balance.formatted}
    />
  )
})
```

#### Refactor
```tsx
const formattedBalances = useCallback(() => {
  sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })
}, [sortedBalances]);

const rows = useMemo(() => {
  return formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices ? prices?.[balance.currency] * balance.amount :  0; // Use as fallback
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })
}, [formattedBalances, prices]);
```

## 6. Add fallback and use a meaningful prop name

#### Original

```tsx
/*
  - formattedBalances can be an empty array => rows is an empty array as well -> No fallback on UI
  - Instead of using {...rest}. We can add more specific one like `className`, `style` or `rowWrapperProp`
*/
return (
  <div {...rest}>
    {rows}
  </div>
)
```


#### Refactor
```tsx
const { rowWrapperProps } = props;

return (
  <div {...rowWrapperProps}>
    {
      rows.length === 0 
        ? <p>No balance is available for now!</p>
        : rows
    }
  </div>
)
```