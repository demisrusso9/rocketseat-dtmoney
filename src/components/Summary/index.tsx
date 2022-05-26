import { useTransactions } from '../../hooks/useTransactions'
import { formatPrice } from '../../utils/format'
import { Container } from './styles'

import incomeIcon from '../../assets/income.svg'
import outcomeIcon from '../../assets/outcome.svg'
import totalIcon from '../../assets/total.svg'

export function Summary() {
  const { transactions } = useTransactions()

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'deposit') {
        acc.deposits += transaction.amount
        acc.total += transaction.amount
      } else {
        acc.withdraws += transaction.amount
        acc.total -= transaction.amount
      }

      return acc
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0
    }
  )

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeIcon} alt='Entradas' />
        </header>

        <strong>{formatPrice(summary.deposits)}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeIcon} alt='Saídas' />
        </header>

        <strong>{formatPrice(summary.withdraws)}</strong>
      </div>

      <div className='highlight-background'>
        <header>
          <p>Total</p>
          <img src={totalIcon} alt='Total' />
        </header>

        <strong>{formatPrice(summary.total)}</strong>
      </div>
    </Container>
  )
}
