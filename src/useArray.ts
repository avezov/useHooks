import { useCallback, useEffect, useState } from 'react'

export function useArray<T>(defaultArr: T[], watchValue = false) {
  const [arr, setArr] = useState<T[]>(defaultArr)

  const handleAdd = useCallback((value: T) => {
    setArr(arr => ([...arr, value]))
  }, [arr, setArr])

  const handleAddMany = useCallback((values: T | T[]) => {
    (Array.isArray(values) ? values : [values]).forEach(value => {
      handleAdd(value)
    })
  }, [handleAdd])

  const handleDel = useCallback((value: T) => {
    setArr(arr => ([...arr.filter(item => item !== value)]))
  }, [arr, setArr])

  const handleDelMany = useCallback((values: T | T[]) => {
    (Array.isArray(values) ? values : [values]).forEach(value => {
      handleDel(value)
    })
  }, [handleDel])

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

  const inArrayMany = useCallback((values: T | T[]) => {
    return (Array.isArray(values) ? values : [values]).every(value => arr.includes(value))
  }, [arr])

  useEffect(() => {
    if (watchValue) {
      setArr(() => defaultArr)
    }
  }, [defaultArr, watchValue])

  return {
    value: arr,
    setValue: setArr,
    add: handleAdd,
    addMany: handleAddMany,
    del: handleDel,
    delMany: handleDelMany,
    toggle: handleToggle,
    toggleMany: handleToggleMany,
    inArrayMany,
  }
}
