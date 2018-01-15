exports.data = {
  'details/participation': 'a'
}

exports.fillData = (input, key) => {
  data.data[key] = input
  console.log(data.data[key])
}
/*
exports.readData = (key) => {
  return data[key]
}*/