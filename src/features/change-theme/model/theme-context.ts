import {createContext} from 'react'
import type {Context} from './types'

export const ThemeContext = createContext<Context>({} as Context)
