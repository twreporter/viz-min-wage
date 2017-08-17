export const getColor = (name) => {
  let color = 'black'
  switch (name) {
    case 'testdata':
      color = 'orange'
      break
    case 'testdata1':
      color = 'blue'
      break
    case 'testdata2':
      color = 'red'
      break
    case 'marker':
      color = 'red'
      break
    default:
     color = 'black'
  }
  return color
}
