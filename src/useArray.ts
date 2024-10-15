import { useCallback, useState } from 'react'

export function useArray<T>(defaultArr: T[]) {
  const [arr, setArr] = useState<T[]>(defaultArr)

  const handleAdd = useCallback((value: T) => {
    const newArr = [...arr, value]
    setArr(newArr)
  }, [arr, setArr])

  const handleDel = useCallback((value: T) => {
    const newArr = [...arr.filter(item => item !== value)]
    setArr(newArr)
  }, [arr, setArr])

  const handleToggle = useCallback((value: T) => {
    const includes = arr.includes(value)
    if (includes) {
      handleDel(value)
    } else {
      handleAdd(value)
    }
  }, [arr, handleAdd, handleDel])

  return {
    value: arr,
    setValue: setArr,
    add: handleAdd,
    del: handleDel,
    toggle: handleToggle,
  }
}
