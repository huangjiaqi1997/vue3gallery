export const second2Time = (seconds) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor(seconds / 60 - h * 60)
  const s = seconds - h * 3600 - m * 60
  const add0 = (num) => {
    if (num === 0) return '00'
    if (num < 10) return '0' + num
    return num
  }
  return `${add0(h)}:${add0(m)}:${add0(s)}`
}
