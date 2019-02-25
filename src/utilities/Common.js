export function splitOnUppercase (string) {
  if (typeof string === 'string') {
    return string.match(/[A-Z][a-z]+|[0-9]+/g).join(' ')
  } else {
    return string
  }
}

export function extractName (string) {
  if (typeof string === 'string') {
    return string.replace('#/definitions/', '')
  } else {
    return string
  }
}

export function removeFilenameExtension (filename) {
  if (typeof filename === 'string' && filename.includes('.')) {
    return filename.substring(0, filename.lastIndexOf('.'))
  } else {
    return filename
  }
}

export function extractObjectNameFromFilename (filename) {
  let domain = removeFilenameExtension(filename)

  if (typeof domain === 'string') {
    if (domain.includes('Example')) {
      domain = domain.substring(0, domain.lastIndexOf('Example'))
    }

    if (domain.includes('_')) {
      let count = (domain.match(/_/g) || []).length

      for (let i = 0, l = count; i < l; i++) {
        domain = domain.substring(0, domain.lastIndexOf('_'))
      }
    }

    return domain
  } else {
    return domain
  }
}

export function handleRoute (route) {
  if (typeof route === 'string' && route.endsWith('/')) {
    return route.substring(0, route.length - 1)
  } else {
    return route
  }
}
