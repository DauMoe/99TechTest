interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

type WalletBalancePropsType = {}; // Put anything you want

const WalletPage: React.FC<WalletBalancePropsType> = (props: WalletBalancePropsType) => {
  const { rowWrapperProps } = props;
  
  const balances = useWalletBalances();
  const prices = usePrices();

	const getPriority = (blockchain: string): number => {
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
	      return -1
	  }
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

  return (
    <div {...rowWrapperProps}>
      {
        rows.length === 0 
          ? <p>No balance is available for now!</p>
          : rows
      }
    </div>
  )
}