import { CARD_MARGIN, CARD_WIDTH } from 'constants'
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { FlatList } from 'react-native'

export const CatagoryVerticalScrollContext = createContext(null)

export const useCatagoryVerticalScroll = () => {
  return useContext(CatagoryVerticalScrollContext)
}

export const CatagoryVerticalScrollProvider = ({ children }) => {
  const ref = useRef(null)

  const value = useMemo(() => {
    return { ref }
  }, [ref])

  return (
    <CatagoryVerticalScrollContext.Provider value={value}>
      {children}
    </CatagoryVerticalScrollContext.Provider>
  )
}

export const CatagoryVerticalScrollView = forwardRef(({ renderItem }, ref) => {
  const [numColumns, setNumColumns] = useState(1)
  const [data, setData] = useState([])
  const [extraData, setExtraData] = useState(data)

  useEffect(() => {
    setExtraData([...data, {}])
  }, [data])

  const init = (array) => {
    setData(array)
  }

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
      return prevData.filter((v, i) => {
        return i != index
      })
    })
  }

  const update = (index, element) => {
    setData((prevData) => {
      const newData = [...prevData]
      newData[index] = element
      return newData
    })
  }

  useImperativeHandle(ref, () => {
    return {
      data,
      init,
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
      data={extraData}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      key={`CatagoryVerticalScrollView${numColumns}`}
      numColumns={numColumns}
      keyExtractor={(item, index) => {
        return `Catagory${item.key}${index}`
      }}
    />
  )
})
CatagoryVerticalScrollView.displayName = 'CatagoryVerticalScrollView'
