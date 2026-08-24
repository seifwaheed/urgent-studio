import {agent} from './agent'
import {category} from './category'
import {localizedImage} from './localizedImage'
import {localizedString} from './localizedString'
import {localizedText} from './localizedText'
import {product} from './product'
import {siteSettings} from './siteSettings'
import {specification} from './specification'

export const schemaTypes = [
  localizedString,
  localizedText,
  localizedImage,
  specification,
  agent,
  category,
  product,
  siteSettings,
]
