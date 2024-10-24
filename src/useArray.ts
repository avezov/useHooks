import { useCallback, useEffect, useState } from 'react'

export function useArray<T>(defaultArr: T[], watchValue = false) {
  const [arr, setArr] = useState<T[]>(defaultArr)

  const handleAdd = useCallback((value: T) => {
    setArr(arr => ([...arr, value]))
  }, [arr, setArr])

  const handleDel = useCallback((value: T) => {
    setArr(arr => ([...arr.filter(item => item !== value)]))
  }, [arr, setArr])

  const handleToggle = useCallback((value: T) => {
    const includes = arr.includes(value)
    if (includes) {
      handleDel(value)
    } else {
      handleAdd(value)
    }
  }, [arr, handleAdd, handleDel])

  const handleToggleMany = useCallback((values: T[]) => {
    if (Array.isArray(values)) {
      values.forEach(value => {
        handleToggle(value)
      })
    }
  }, [handleToggle])

  useEffect(() => {
    if (watchValue) {
      setArr(() => defaultArr)
    }
  }, [defaultArr, watchValue])

  return {
    value: arr,
    setValue: setArr,
    add: handleAdd,
    del: handleDel,
    toggle: handleToggle,
    toggleMany: handleToggleMany,
  }
}
