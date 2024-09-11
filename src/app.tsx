import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'
import data from '../data.json'

export function App() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [filter, setFilter] = useState('')

  function getFilteredData() {
    if (!filter) {
      return data
    }

    return data.filter(
      (pokemon) =>
        pokemon.related.filter((r) =>
          r.toLowerCase().includes(filter.toLowerCase()),
        ).length > 0,
    )
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'f') {
        if (!inputRef.current) return

        event.preventDefault()
        inputRef.current.focus()
        inputRef.current.value = ''
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className='flex h-svh flex-col p-4'>
      <div className='h-full overflow-auto'>
        <table className='w-full'>
          <thead>
            <tr>
              <th align='left'>Name</th>
              <th align='left'>Max CP</th>
              <th align='left'>GL</th>
              <th align='left'>UL</th>
              <th align='left'>ML</th>
              <th align='left'>Tier</th>
              <th align='left'>Missing</th>
              <th align='left'>IV</th>
            </tr>
          </thead>

          <tbody className='h-full'>
            {getFilteredData().map((pokemon, i) => (
              <tr
                key={pokemon.name}
                className={clsx(
                  'h-16 px-2 hover:bg-neutral-200',
                  i % 2 === 0 && 'bg-neutral-100',
                )}
              >
                <td align='left'>{pokemon.name}</td>
                <td align='left'>{pokemon.maxCP}</td>
                <td align='left'>{pokemon.gl || '-'}</td>
                <td align='left'>{pokemon.ul || '-'}</td>
                <td align='left'>{pokemon.ml || '-'}</td>
                <td align='left'>{pokemon.tier || '-'}</td>
                <td align='left'>{pokemon.missing?.toString() || '-'}</td>
                <td align='left'>{pokemon.iv || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <input
          ref={inputRef}
          type='text'
          className='w-full rounded-full border px-4 py-2'
          placeholder={`Search a pokemon (${data.length} entries)`}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
    </div>
  )
}
