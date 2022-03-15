import validator from "validator"
import DOMPurify from "isomorphic-dompurify"

const { escape: escapeChars, stripLow } = validator

const sanitizeAndFormat = (value: string) =>
  escapeChars(stripLow(DOMPurify.sanitize(value).trim(), true))

export { sanitizeAndFormat }
