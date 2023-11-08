import { forwardRef, useImperativeHandle, useState } from 'react'
import { FlatList } from 'react-native'
import EmptyView from './empty'

const StackHorizontalScrollView = forwardRef(({ renderItem }, ref) => {
  const [data, setData] = useState([])

  const push = (element) => {
    setData((prevData) => {
      return [...prevData, element]
    })
  }

  const pop = () => {
    setData((prevData) => {
      return [...prevData.slice(0, -1)]
    })
  }

  const reset = () => {
    setData(() => {
      return []
    })
  }

  useImperativeHandle(ref, () => {
    return {
      push,
      pop,
      reset,
    }
  })

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      horizontal
      ListEmptyComponent={EmptyView}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => {
        return `Stack${item.key}${index}`
      }}
    />
  )
})
StackHorizontalScrollView.displayName = 'StackHorizontalScrollView'

export default StackHorizontalScrollView
