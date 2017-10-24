export default {
  data: () => ({
    style: null
  }),

  watch: {
    '$vuetify.theme': {
      deep: true,
      handler () {
        this.applyTheme()
      }
    }
  },

  mounted () {
    this.genStyle()
    this.applyTheme()
  },

  methods: {
    applyTheme () {
      this.updateTheme(this.genTheme())
    },
    genTheme () {
      const { dark, light } = this.$vuetify.theme

      return this.genColors(light, 'light')
        .concat(this.genColors(dark, 'dark'))
    },
    genColors (theme, color) {
      return Object.keys(theme).map(key => {
        const value = theme[key]

        return (
          this.genBackgroundColor(key, value, color) +
          this.genTextColor(key, value, color)
        )
      }).join('')
    },
    genBackgroundColor (key, value, color) {
      return `.${key}--${color}{background-color:${value};border-color:${value}}`
    },
    genTextColor (key, value, color) {
      return `.${key}--${color}--text{color:${value}}`
    },
    genStyle () {
      const style = document.createElement('style')
      style.type = 'text/css'
      document.head.appendChild(style)
      this.style = style
    },
    updateTheme (classes) {
      this.style.innerHTML = classes
    }
  }
}
