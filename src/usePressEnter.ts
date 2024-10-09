import { useCallback } from 'react'

/**
 * Отслеживание нажатия клавиши Enter.
 *
 * Example:
 * const handlePress = usePressEnter(() => console.log('Enter was pressed'))
 * <input onKeyPress={handlePress}/>
 */
export function usePressEnter<T = HTMLInputElement>(callback: (event: React.KeyboardEvent<T>) => void) {
  const handler = useCallback((event: React.KeyboardEvent<T>) => {
    if (event.key === 'Enter') {
      callback(event);
    }
  }, [callback])

  return handler;
}
