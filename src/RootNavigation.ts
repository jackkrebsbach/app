import { createNavigationContainerRef } from '@react-navigation/native'
import { RootStackParamList } from './App'

export const navigationRef = createNavigationContainerRef<RootStackParamList>()
//Only use if navigation is not available
export function navigate(name: any, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}
