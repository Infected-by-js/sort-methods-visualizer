export default {
  getItem: <T>(key: string): T | null => {
    try {
      const value = localStorage.getItem(key)

      return value ? JSON.parse(value) : null
    } catch {
      return null
    }
  },

  setItem: (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.log('Error saving data in Storage', error)
    }
  },

  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.log('Error removing data from Storage', error)
    }
  }
}
