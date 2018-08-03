import path from 'path'

export const defaultExtensions = [
  'JPEG', 'JPG', 'PNG', 'GIF', 'WEBP', 'BMP'
]

export default {
  namespaced: true,
  state: {
    darkTheme: false,
    fullScreen: false,
    recursive: false,
    imageStretched: false,
    extensions: [...defaultExtensions]
  },
  getters: {
    isAvailableFile (state) {
      return ({ filepath }) => {
        const ext = path.extname(filepath).toUpperCase()
        if (!ext) {
          return false
        }
        return state.extensions.includes(ext.slice(1))
      }
    }
  },
  mutations: {
    setDarkTheme (state, { darkTheme }) {
      state.darkTheme = darkTheme
    },
    setFullScreen (state, { fullScreen }) {
      state.fullScreen = fullScreen
    },
    setRecursive (state, { recursive }) {
      state.recursive = recursive
    },
    setImageStretched (state, { imageStretched }) {
      state.imageStretched = imageStretched
    },
    setExtensions (state, { extensions }) {
      state.extensions = extensions
    }
  }
}
