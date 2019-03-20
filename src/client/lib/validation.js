const _ = require('lodash')

// TODO: turn this into snippet for github

// could even make as react component (ES6 at least)
let settings = {
  rules: {
    required: (value) => {
      return value && value !== '' && value !== false && !!value.trim().length
    },
    email: (value) => {
      return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        .test(value)
    },
    phone: (value) => {
      return /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/
        .test(value)
    },
    postcode: (value) => {
      return /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/
        .test(value)
    },
    max: (value, limit) => {
      return (value.length <= limit)
    },
    min: (value, limit) => {
      return (value.length >= limit)
    },
    bool: (value) => {
      return value === true || value === false
    },
    matches: (value, term) => {
      return value.includes(term)
    }
  },
  messages: {
    required: "This field is required",
    email: "Please enter a valid email address",
    phone: "Please enter a valid UK phone number starting with the digit 0",
    postcode: "Please enter a valid UK postcode",
    notExist: "The field does not exist in the input spec",
    max: "This field currently exceeds the required amount of characters",
    min: "This field currently has less than the required amount of characters"
  }
}

const TEMPLATE = () => {
  return {
    success: true,
    error: false,
    messages: {}
  }
}

const applyError = (results, field, type) => {
  results.success = false
  results.error = true
  results.messages[field] = settings.messages[type]

  return results
}

const updateConfig = (config) => {
  // check config passed in
  if (config) {
    //update if required
    _.each(config, (setting, name) => {
      if (settings[name]) {
        _.each(setting, (line, key) => {
          settings[name][key] = line
        })
      }
    })
  }
}

module.exports = function validate (fields, field, value, config) {
  updateConfig(config)
  let results = TEMPLATE()

  // see if field exitst
  if (Object.keys(fields).indexOf(field) > -1) {
    // only act if there are rules
    if (fields[field]) {
      // get field string
      let fieldRules = fields[field]
      // strip field string by pipe
      fieldRules = fieldRules.split('|')
      // for each section
      _.each(fieldRules, rule => {
        // strip by = and use [1] as second paramete
        const params = rule.split('=')

        if (!settings.rules[params[0]](value, params[1] || null)) {
          results = applyError(results, field, params[0])
        }
      })
    }
  } else {
    results = applyError(results, field, 'notExist')
  }

  return results
}
