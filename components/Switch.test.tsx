import { render } from '@testing-library/react'
import Switch from './Switch'

describe('Switch component', () => {
  describe('separate variants only', () => {
    it('should present selected case compnent', () => {
      const x = render(
        <span>
          <Switch value={1}>
            <Switch.Case variant={1}>
              <h1 data-testid='xyz'>Ok</h1>
            </Switch.Case>
            <Switch.Case variant={2}>
              <h1 data-testid='xyz'>Err</h1>
            </Switch.Case>
          </Switch>
        </span>,
      )

      expect(x.getAllByTestId('xyz')).toHaveLength(1)
      expect(x.getByTestId('xyz')).toHaveTextContent('Ok')

      x.rerender(
        <span>
          <Switch value={2}>
            <Switch.Case variant={1}>
              <h1 data-testid='xyz'>Ok</h1>
            </Switch.Case>
            <Switch.Case variant={2}>
              <h1 data-testid='xyz'>Err</h1>
            </Switch.Case>
          </Switch>
        </span>,
      )

      expect(x.getAllByTestId('xyz')).toHaveLength(1)
      expect(x.getByTestId('xyz')).toHaveTextContent('Err')
    })
  })

  describe('compound variants included', () => {
    it('should present selected case compnent', () => {
      const switchWithValue = (value: number) => (
        <span>
          <Switch value={value}>
            <Switch.Case variant={1}>
              <h1 data-testid='xyz'>None</h1>
            </Switch.Case>
            <Switch.Case variant={[2, 4]}>
              <h1 data-testid='xyz'>Ok</h1>
            </Switch.Case>
            <Switch.Case variant={[3]}>
              <h1 data-testid='xyz'>Err</h1>
            </Switch.Case>
          </Switch>
        </span>
      )

      const x = render(switchWithValue(1))

      expect(x.getAllByTestId('xyz')).toHaveLength(1)
      expect(x.getByTestId('xyz')).toHaveTextContent('None')

      x.rerender(switchWithValue(2))

      expect(x.getAllByTestId('xyz')).toHaveLength(1)
      expect(x.getByTestId('xyz')).toHaveTextContent('Ok')

      x.rerender(switchWithValue(3))

      expect(x.getAllByTestId('xyz')).toHaveLength(1)
      expect(x.getByTestId('xyz')).toHaveTextContent('Err')

      x.rerender(switchWithValue(4))

      expect(x.getAllByTestId('xyz')).toHaveLength(1)
      expect(x.getByTestId('xyz')).toHaveTextContent('Ok')

      x.rerender(switchWithValue(5))

      expect(x.queryAllByTestId('xyz')).toHaveLength(0)
    })
  })

  describe('overlapping variants', () => {
    it('should present selected case compnent', () => {
      const switchWithValue = (value: string) => (
        <span>
          <Switch value={value}>
            <Switch.Case variant={['beginner', 'regular']}>
              <h1 data-testid='xyz'>Intro</h1>
            </Switch.Case>
            <Switch.Case variant={['regular', 'advanced']}>
              <h1 data-testid='xyz'>Advanced topics</h1>
            </Switch.Case>
          </Switch>
        </span>
      )

      const x = render(switchWithValue('beginner'))

      expect(x.getAllByTestId('xyz')).toHaveLength(1)
      expect(x.getByTestId('xyz')).toHaveTextContent('Intro')

      x.rerender(switchWithValue('regular'))

      expect(x.getAllByTestId('xyz')).toHaveLength(2)
      expect(x.getAllByTestId('xyz')[0]).toHaveTextContent('Intro')
      expect(x.getAllByTestId('xyz')[1]).toHaveTextContent('Advanced topics')

      x.rerender(switchWithValue('advanced'))

      expect(x.getAllByTestId('xyz')).toHaveLength(1)
      expect(x.getByTestId('xyz')).toHaveTextContent('Advanced topics')
    })
  })
})
