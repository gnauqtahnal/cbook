import { CARD_MARGIN, CARD_WIDTH } from 'constants'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { FlatList } from 'react-native'

const CatagoryVerticalScrollView = forwardRef(({ renderItem }, ref) => {
  const [numColumns, setNumColumns] = useState(1)
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

  const remove = (index) => {
    setData((prevData) => {
      return [...prevData.splice(index, 1)]
    })
  }

  const update = (index, element) => {
    setData((prevData) => {
      return [...prevData.splice(index, 1, element)]
    })
  }

  useImperativeHandle(ref, () => {
    return {
      data,
      push,
      pop,
      remove,
      update,
    }
  })

  const onLayout = (event) => {
    const {
      nativeEvent: {
        layout: { width },
      },
    } = event

    setNumColumns(Math.floor(width / (CARD_WIDTH + CARD_MARGIN)))
  }

  return (
    <FlatList
      onLayout={onLayout}
      data={data}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      key={`CatagoryVerticalScrollView${numColumns}`}
      numColumns={numColumns}
      keyExtractor={(_, index) => `CatagoryVerticalScrollView${index}`}
    />
  )
})
CatagoryVerticalScrollView.displayName = 'CatagoryVerticalScrollView'

export default CatagoryVerticalScrollView
